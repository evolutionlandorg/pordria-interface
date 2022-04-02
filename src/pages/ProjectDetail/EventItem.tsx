import { IEventItem } from '@/hooks/useFetchEventList'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import networkMap from '@/config/network'
import { BigNumber, Contract, providers } from 'ethers'
import claimsABI from '@/config/network/claims.abi.json'
import toast from 'react-hot-toast'
import Button from '@/components/Button'
import { baseColor, computeSize, size, weight } from '@/styles/variables'
import useAuth from '@/hooks/useAuth'

export const ItemContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: ${computeSize(128)} ${computeSize(96)} 1fr ${computeSize(
      104
    )};
  align-items: center;
  margin-bottom: 1rem;
  font-size: ${size.sm};
  font-weight: ${weight.semiBold};
  color: ${baseColor.onPrimary};
  word-break: break-all;
  white-space: pre-wrap;

  @media screen and (max-width: 414px) {
    span {
      display: none;
      :last-child,
      :first-child {
        display: block;
      }
    }

    grid-template-columns: 1fr ${computeSize(104)};
  }
`

const Opts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

interface IEventItemProps {
  item: IEventItem
  user: string
  claimable?: boolean
}

const MAX_TIME = 2 ** 32 - 1

const EventItem = ({ item, user, claimable = false }: IEventItemProps) => {
  const { name, detail, proofURI, chainId, address, claims, root } = item
  const { rpcUrls } = networkMap[chainId]
  const { account } = useAuth()

  const [endTimestamp, setEndTimestamp] = useState<number | null>()

  useEffect(() => {
    async function getEndTime() {
      const provider = new providers.JsonRpcBatchProvider(rpcUrls[0])
      const contract = new Contract(address, claimsABI, provider)
      const res: BigNumber = await contract.getExpiryTime(root)
      let time: number | null = null
      try {
        const timeStamp = res.toNumber()
        if (timeStamp > MAX_TIME) {
          throw new Error('overflow')
        }
        time = timeStamp
      } catch (e) {
        time = null
      }

      setEndTimestamp(time)
    }

    if (root) {
      getEndTime()
    }
  }, [root, address, rpcUrls])

  const formateDate = () => {
    if (endTimestamp === null) {
      return 'never expire'
    }

    if (!endTimestamp) {
      return '-'
    }

    const date = new Date(endTimestamp)
    return `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }

  const openProof = () => {
    window.open(proofURI)
  }

  const claim = async () => {
    try {
      if (!account) {
        throw new Error('Please connect wallet first')
      }

      if (!root || !claims) {
        throw new Error('Data loading...')
      }

      if (endTimestamp && Date.now() > endTimestamp) {
        throw new Error('Airdrop expired')
      }

      const provider = new providers.JsonRpcBatchProvider(rpcUrls[0])
      const contract = new Contract(address, claimsABI, provider)

      try {
        const [isClaimed] = await contract.getClaimedStatus(user, [root])

        if (isClaimed) {
          throw new Error()
        }
      } catch (error) {
        throw new Error('Airdrop was claimed')
      }

      const { ethereum } = window
      if (!ethereum) {
        throw new Error('No wallet connected')
      }

      const ethereumProvider = new providers.Web3Provider(
        ethereum as providers.ExternalProvider
      )

      const signer = ethereumProvider.getSigner()

      const contractWithSigner = new Contract(address, claimsABI, signer)

      let userClaim: IClaim | undefined
      for (const c of claims) {
        const { to } = c
        if (to.toLowerCase() === user.toLowerCase()) {
          userClaim = c
        }
      }

      if (!userClaim) {
        throw new Error('No proof')
      }

      await contractWithSigner.claimMultipleTokens(
        root,
        userClaim,
        userClaim.proof
      )
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <ItemContainer>
      <span>{name}</span>
      <span>{formateDate()}</span>
      <span>{detail}</span>
      <Opts>
        <Button onClick={claim} width="100%" disabled={!claimable}>
          Claim
        </Button>
        <Button onClick={openProof} width="100%">
          List
        </Button>
      </Opts>
    </ItemContainer>
  )
}

EventItem.defaultProps = {
  claimable: false
}

export default EventItem

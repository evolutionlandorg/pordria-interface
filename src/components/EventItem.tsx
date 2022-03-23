import { IEventItem } from '@/hooks/useFetchEventList'
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import blockChainConfig from '@/config/block-chain'
import { BigNumber, Contract, providers } from 'ethers'
import claimsABI from '@/config/block-chain/claims.abi.json'

const StyledItem = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 128px 96px 96px 1fr 96px;
  align-items: center;
  margin-bottom: 1rem;
`

const Opts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const StyledButton = styled.button`
  font-size: 0.9rem;
  height: fit-content;
  text-align: center;
  padding: 0;
  border: 0.5px solid #838383;
  padding: 4px;
  border-radius: 8px;
  :not(:last-of-type) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right-color: transparent;
  }

  :not(:first-of-type) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  :hover {
    border-color: #333;
    background-color: rgba(51, 51, 51, 0.1);
  }
`

interface IEventItemProps {
  item: IEventItem
  user: string
}

const MAX_TIME = 2 ** 32 - 1

const EventItem: FC<IEventItemProps> = ({ item, user }) => {
  const { name, detail, proofURI, chainId, address, claims, root } = item
  const { rpcUrls } = blockChainConfig[chainId]

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
    if (!root || !claims) {
      throw new Error('data loading...')
    }

    if (endTimestamp && Date.now() > endTimestamp) {
      throw new Error('event expired')
    }

    const provider = new providers.JsonRpcBatchProvider(rpcUrls[0])
    const contract = new Contract(address, claimsABI, provider)

    const isClaimed = await contract.getClaimedStatus(user, [root])

    if (!isClaimed) {
      throw new Error('event was claimed')
    }

    if (!window.ethereum) {
      throw new Error('no wallet connected')
    }

    const ethereumProvider = new providers.Web3Provider(window.ethereum)

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
      throw new Error('no proof')
    }

    await contractWithSigner.claimMultipleTokens(
      root,
      userClaim,
      userClaim.proof
    )
  }

  return (
    <StyledItem>
      <span>{name}</span>
      <span>-</span>
      <span>{formateDate()}</span>
      <span>{detail}</span>
      <Opts>
        <StyledButton type="button" onClick={claim}>
          Claim
        </StyledButton>
        <StyledButton type="button" onClick={openProof}>
          List
        </StyledButton>
      </Opts>
    </StyledItem>
  )
}

export default EventItem

import React, { useEffect, useMemo, useState } from 'react'
import networkMap from '@/config/network'
import { BigNumber, Contract, providers } from 'ethers'
import claimsABI from '@/config/network/claims.abi.json'
import useAuth from '@/hooks/useAuth'
import {
  Text,
  Button,
  ButtonGroup,
  chakra,
  Show,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBoolean,
  Input,
  Link
} from '@chakra-ui/react'
import { formateDate, isHTTP } from '@/utils/misc'
import { ConnectorTypeEnum } from '@/utils/web3-react'
import useToast from '@/hooks/useToast'

const OperationButton = chakra(Button, {
  baseStyle: {
    fontWeight: 'bold'
  }
})

interface EventItemProps {
  item: EventItem
}

const MAX_TIME = 2 ** 32 - 1

const EventItem = ({ item }: EventItemProps) => {
  const { name, detail, proofURI, chainId, address, claims, root } = item
  const { rpcUrls } = networkMap[chainId]
  const { account, connectWallet, setChainID } = useAuth()
  const [user, setUser] = useState('')
  const [isOpen, setIsOpen] = useBoolean(false)
  const [isLoading, setIsLoading] = useBoolean(false)
  const [isClaimed, setIsClaimed] = useState<boolean | null>(null)
  const toast = useToast()
  const provider = useMemo(() => {
    if (rpcUrls && rpcUrls.length > 0) {
      return new providers.JsonRpcBatchProvider(rpcUrls[0])
    }

    return null
  }, [rpcUrls])
  const contract = useMemo(() => {
    if (provider) {
      return new Contract(address, claimsABI, provider)
    }

    return null
  }, [provider, address])
  const userClaim = useMemo(() => {
    let claim: IClaim | undefined
    for (const c of claims) {
      const { to } = c
      if (to.toLowerCase() === user.toLowerCase()) {
        claim = c
      }
    }

    return claim
  }, [claims, user])
  useEffect(() => {
    if (chainId) {
      setChainID(chainId)
    }
  }, [chainId, setChainID])

  useEffect(() => {
    async function checkClaimStatus() {
      if (!contract || !root || !user) {
        return
      }

      try {
        setIsClaimed(null)
        await contract.getClaimedStatus(user, [root])
        setIsClaimed(true)
        return
      } catch (error) {
        // do nothing
      }

      setIsClaimed(false)
    }

    checkClaimStatus()
  }, [contract, user, root])

  const [endTimestamp, setEndTimestamp] = useState<number | null>()
  useEffect(() => {
    async function getEndTime() {
      if (!contract) {
        return
      }
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

    if (contract && root) {
      getEndTime()
    }
  }, [root, address, rpcUrls, contract])

  const openProof = () => {
    window.open(proofURI)
  }

  const open = () => setIsOpen.on()
  const close = () => setIsOpen.off()

  const claim = async () => {
    setIsLoading.on()
    try {
      if (!account) {
        throw new Error('Please connect wallet first')
      }

      if (!userClaim || !contract) {
        throw new Error('Data loading...')
      }

      if (!user) {
        throw new Error('Please enter an address')
      }

      if (endTimestamp && Date.now() > endTimestamp) {
        throw new Error('Airdrop expired')
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
      await contractWithSigner.claimMultipleTokens(
        root,
        userClaim,
        userClaim.proof
      )
    } catch (error) {
      if (error instanceof Error) {
        toast({
          status: 'error',
          title: error.message
        })
      }
    }

    setIsLoading.off()
  }

  const renderPrimaryButton = () => {
    if (!account) {
      return (
        <Button
          w="8.75rem"
          onClick={() => connectWallet(ConnectorTypeEnum.INJECTED)}
        >
          Connect Wallet
        </Button>
      )
    }

    if (isClaimed) {
      return (
        <Button
          disabled
          w="8.75rem"
          variant="solid"
          color="gray.900"
          bgColor="gray.200"
          _hover={{
            bgColor: 'gray.200'
          }}
        >
          Claimed
        </Button>
      )
    }

    return (
      <Button
        isLoading={isLoading}
        disabled={!userClaim || isClaimed === null}
        w="8.75rem"
        onClick={claim}
      >
        Claim
      </Button>
    )
  }

  return (
    <>
      <Text>{name}</Text>
      <Show above="lg">
        <Text>{formateDate(endTimestamp)}</Text>
      </Show>
      <Show above="sm">
        {isHTTP(detail) ? (
          <Link href={detail} target="_blank">
            {detail}
          </Link>
        ) : (
          <Text>{detail}</Text>
        )}
      </Show>
      <ButtonGroup justifySelf="end">
        <OperationButton onClick={open} size="2xs">
          Claim
        </OperationButton>
        <OperationButton onClick={openProof} size="2xs" variant="outline">
          List
        </OperationButton>
      </ButtonGroup>

      <Modal isOpen={isOpen} onClose={close} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Claim rewards</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Enter an address to find available airdrops and claim for this
              address.
            </Text>
            <Input
              size="sm"
              mt="5"
              onChange={e => setUser(e.target.value)}
              value={user}
            />
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              {renderPrimaryButton()}
              <Button w="8.75rem" variant="primary-outline" onClick={close}>
                Cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EventItem

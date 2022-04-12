import React, { FC, useEffect, useRef } from 'react'
import useAuth from '@/hooks/useAuth'
import { ConnectorTypeEnum } from '@/utils/web3-react'
import {
  Button as BaseButton,
  ButtonGroup,
  chakra,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Spacer,
  useClipboard,
  useOutsideClick,
  useToast
} from '@chakra-ui/react'
import { CopyIcon } from '@/components/Icon'
import { ArrowForwardIcon, ChevronDownIcon } from '@chakra-ui/icons'
import Toast from '@/components/Toast'

const WIDTH = '15.625rem'

const Button = chakra(BaseButton, {
  baseStyle: {
    w: WIDTH
  }
})

interface IWalletProps {
  chainID?: number
}

const Wallet: FC<IWalletProps> = ({ chainID }) => {
  const { connectWallet, disconnectWallet, account, setChainID } = useAuth()
  const [isOpen, setIsOpen] = React.useState(false)
  const { hasCopied, onCopy } = useClipboard(account ?? '')
  const toast = useToast()
  const popoverRef = useRef<HTMLDivElement>(null)

  useOutsideClick({
    ref: popoverRef,
    handler() {
      setIsOpen(false)
    }
  })

  useEffect(() => {
    setChainID(chainID)
  }, [chainID, setChainID])

  useEffect(() => {
    const toastID = 'clipboard'
    if (!hasCopied || toast.isActive(toastID)) {
      return
    }

    toast({
      id: toastID,
      position: 'bottom-right',
      render: ({ id }) => (
        <Toast title="Copied to clipboard!" id={id} status="success" />
      )
    })
  }, [hasCopied, toast])

  if (!account) {
    return (
      <Button onClick={() => connectWallet(ConnectorTypeEnum.INJECTED)}>
        Connect Wallet
      </Button>
    )
  }

  const accountEllipsis = `${account.substring(0, 6)}...${account.substring(
    account.length - 4
  )}`

  return (
    <Popover placement="bottom-start" isOpen={isOpen} offset={[0, 4]}>
      <PopoverTrigger>
        <ButtonGroup
          w={WIDTH}
          isAttached
          bgGradient="linear(270deg, gradient.buttonStart, gradient.buttonEnd)"
          borderRadius="button"
        >
          <BaseButton
            onClick={onCopy}
            rightIcon={<CopyIcon color="white" />}
            w="full"
            variant="text"
          >
            {accountEllipsis}
            <Spacer />
          </BaseButton>
          <IconButton
            onClick={() => setIsOpen(isOpened => !isOpened)}
            aria-label="dropdown"
            icon={<ChevronDownIcon color="white" boxSize="4" />}
            variant="text"
          />
        </ButtonGroup>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          _focus={{ boxShadow: 'none' }}
          w="fit-content"
          bg="none"
          border="none"
          ref={popoverRef}
        >
          <Button
            onClick={disconnectWallet}
            bgGradient="none"
            bgColor="white"
            color="inherit"
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
            rightIcon={<ArrowForwardIcon />}
          >
            logout
          </Button>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

Wallet.defaultProps = {
  chainID: undefined
}

export default Wallet

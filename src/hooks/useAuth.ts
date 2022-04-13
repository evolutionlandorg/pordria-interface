import { ChainIDEnum } from '@/config/network'
import { LocalKeyEnum } from '@/config/db'
import { wait } from '@/utils/misc'
import {
  ConnectorTypeEnum,
  getConnector,
  setupNetwork
} from '@/utils/web3-react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector
} from '@web3-react/walletconnect-connector'
import { useCallback, useEffect, useState } from 'react'
import { useBoolean } from '@chakra-ui/react'
import useToast from '@/hooks/useToast'

const useAuth = () => {
  const { activate, deactivate, account } = useWeb3React()
  const [chainID, setChainID] = useState<ChainIDEnum>()
  const [isError, setIsError] = useBoolean()
  const toast = useToast()

  const disconnectWallet = useCallback(() => {
    deactivate()
    window.localStorage.removeItem(LocalKeyEnum.CURRENT_CONNECTOR)
  }, [deactivate])

  const connectedHandler = useCallback(() => {
    const { ethereum } = window
    if (ethereum && ethereum.on) {
      ethereum.on('accountsChanged', accounts => {
        if (accounts.length === 0) {
          disconnectWallet()
        }
      })
    }
  }, [disconnectWallet])

  const connectWallet = useCallback(
    async (connectorType: ConnectorTypeEnum) => {
      if (!chainID) {
        return
      }
      const connector = getConnector(chainID, connectorType)
      localStorage.setItem(LocalKeyEnum.CURRENT_CONNECTOR, connectorType)
      try {
        await activate(connector, undefined, true)
        setIsError.off()
        connectedHandler()
      } catch (error) {
        try {
          if (error instanceof UnsupportedChainIdError) {
            const msg = 'Unsupported network, trying to connect to another'
            toast({
              id: msg,
              status: 'error',
              title: msg
            })
            await wait(1000)
            const hasSetup = await setupNetwork(chainID)
            if (hasSetup) {
              await activate(connector)
              setIsError.off()
              return
            }
            throw new Error('Unsupported network')
          }

          if (error instanceof NoEthereumProviderError) {
            throw new Error('Provider Error, No provider was found')
          }

          if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              const walletConnector = connector as WalletConnectConnector
              walletConnector.walletConnectProvider = undefined
            }

            throw new Error(
              'Authorization Error Please authorize to access your account'
            )
          }

          throw error
        } catch (err) {
          setIsError.on()
          window.localStorage.removeItem(LocalKeyEnum.CURRENT_CONNECTOR)
          if (err instanceof Error) {
            toast({
              id: err.message,
              status: 'error',
              title: err.message
            })
          }
        }
      }
    },
    [activate, connectedHandler, chainID, setIsError, toast]
  )

  useEffect(() => {
    const connector = localStorage.getItem(LocalKeyEnum.CURRENT_CONNECTOR)
    if (!connector) {
      return
    }

    connectWallet(connector as ConnectorTypeEnum)
  }, [connectWallet])

  return { connectWallet, disconnectWallet, account, setChainID, isError }
}

export default useAuth

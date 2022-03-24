import { ChainEnum } from '@/config/block-chain/common'
import { ethers } from 'ethers'
import blockChainConfig from '@/config/block-chain'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { wait } from './misc'

type Provider = ConstructorParameters<typeof ethers.providers.Web3Provider>[0]

export function getLibrary(provider: Provider) {
  const library = new ethers.providers.Web3Provider(provider)

  library.pollingInterval = 8000
  return library
}

export function getConfig(chainName: ChainEnum) {
  const { chainId, rpcUrls } = blockChainConfig[chainName]

  const chainIdNum = Number.parseInt(chainId, 16)

  const injected = new InjectedConnector({
    supportedChainIds: [chainIdNum]
  })

  const walletConnector = new WalletConnectConnector({
    rpc: { [chainIdNum]: rpcUrls[Math.floor(Math.random() * rpcUrls.length)] },
    qrcode: true
  })

  return {
    injected,
    walletConnector
  }
}

export const changeChain = async (chainName: ChainEnum) => {
  const { ethereum } = window
  const chainConfig = blockChainConfig[chainName]
  if (ethereum && ethereum.isMetaMask && chainConfig) {
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          ...chainConfig
        }
      ]
    })
    await wait(500)
  }
}

export const useConnectWallet = (onChange?: Function) => {
  const { activate, deactivate, account } = useWeb3React()
  const [address, setAddress] = useState('')

  const connectWallet = useCallback(
    async (connector: AbstractConnector) => {
      try {
        await activate(connector, undefined, true)
        const { ethereum } = window
        if (ethereum && ethereum.on) {
          ethereum.on('accountsChanged', accounts => {
            if (accounts.length === 0) {
              deactivate()
            }
          })

          ethereum.on('disconnect', deactivate)
        }
      } catch (error) {
        switch (true) {
          case error instanceof UnsupportedChainIdError:
            if (onChange) {
              onChange()
            }
            break
          default:
            break
        }
      }
    },
    [activate, deactivate, onChange]
  )

  useEffect(() => {
    const getWalletStatus = async () => {
      const { ethereum } = window
      let selectedAddress = account
      if (ethereum && !selectedAddress) {
        ;[selectedAddress] = await ethereum.request({
          method: 'eth_accounts'
        })
      }

      setAddress(selectedAddress || '')
    }

    getWalletStatus()
  }, [account])

  return {
    connectWallet,
    deactivate,
    account: address
  }
}

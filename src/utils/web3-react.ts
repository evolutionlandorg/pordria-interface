import { ethers } from 'ethers'
import networkMap, { ChainIDEnum } from '@/config/network'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'

type Provider = ConstructorParameters<typeof ethers.providers.Web3Provider>[0]

interface IEthereumError {
  code: EthereumErrorCodeEnum
  message: string
  stack: string
}

export enum ConnectorTypeEnum {
  INJECTED = 'injected',
  WALLET_CONNECT = 'walletConnect'
}

enum EthereumErrorCodeEnum {
  // This error code indicates that the chain has not been added to MetaMask.
  UNRECOGNIZED_CHAIN_ID = 4902
}

export function getLibrary(provider: Provider) {
  const library = new ethers.providers.Web3Provider(provider)

  library.pollingInterval = 8000
  return library
}

export function getConnector(
  chainID: ChainIDEnum,
  connectorType: ConnectorTypeEnum
) {
  const { rpcUrls } = networkMap[chainID]

  const connectors: { [key: string]: AbstractConnector } = {
    [ConnectorTypeEnum.WALLET_CONNECT]: new WalletConnectConnector({
      rpc: { [chainID]: rpcUrls[Math.floor(Math.random() * rpcUrls.length)] },
      qrcode: true
    }),
    [ConnectorTypeEnum.INJECTED]: new InjectedConnector({
      supportedChainIds: [chainID]
    })
  }

  return connectors[connectorType]
}

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (chainID: ChainIDEnum): Promise<boolean> => {
  const { ethereum } = window
  const config = networkMap[chainID]
  let result = false
  if (ethereum && config) {
    const { chainId } = config
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }]
      })
      result = true
    } catch (error) {
      const { code } = error as IEthereumError
      if (code === EthereumErrorCodeEnum.UNRECOGNIZED_CHAIN_ID) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [config]
          })
          result = true
        } catch (e) {
          console.error('Failed to setup the network in Metamask:', e)
        }
      }
      console.error('Failed to setup the network in Metamask:', error)
    }
  } else {
    console.error(
      "Can't setup the network on metamask because window.ethereum is undefined"
    )
  }

  return result
}

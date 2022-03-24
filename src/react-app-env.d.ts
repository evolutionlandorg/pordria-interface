/// <reference types="react-scripts" />
type EthereumEventMap = {
  accountsChanged: [accounts: string[]]
  disconnect: []
}

type EthereumRequestContentMap<T, U> = {
  params: T
  result: Promise<U>
}

type EthereumRequestMap = {
  wallet_addEthereumChain: EthereumRequestContentMap<unknown[], void>
  eth_accounts: EthereumRequestContentMap<void, string[]>
}

interface Window {
  ethereum?: {
    on?: <K extends keyof EthereumEventMap>(
      event: K,
      fn: (...args: EthereumEventMap[K]) => void
    ) => void
    isMetaMask?: boolean
    request: <K extends keyof EthereumRequestMap>(arg: {
      method: K
      params?: EthereumRequestMap[K]['params']
    }) => EthereumRequestMap[K]['result']
  }
}

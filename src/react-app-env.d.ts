/// <reference types="react-scripts" />

type EthereumEventMap = {
  accountsChanged: [accounts: string[]]
  disconnect: []
}

interface Window {
  ethereum?: {
    on?: <K extends keyof EthereumEventMap>(
      event: K,
      fn: (...args: EthereumEventMap[K]) => void
    ) => void
    isMetaMask?: true
    request: (...args: any[]) => Promise<void>
  }
}

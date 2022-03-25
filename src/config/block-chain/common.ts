export enum ChainIDEnum {
  MUMBAI = 80001,
  CRAB = 44
}

export interface IChain {
  chainId: string
  blockExplorerUrls: string[]
  chainName: string
  iconUrls: string[]
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
}

export interface IChains {
  [key: string]: IChain
}

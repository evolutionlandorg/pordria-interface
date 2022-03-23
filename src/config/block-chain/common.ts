export enum ChainEnum {
  MUMBAI = 80001
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

export interface IBlockChain {
  [key: string]: IChain
}

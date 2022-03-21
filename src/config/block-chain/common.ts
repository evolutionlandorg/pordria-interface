import { ContractInterface } from 'ethers'

export enum ChainEnum {
  MUMBAI = 'Mumbai Testnet'
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

type IChainMap = {
  [key: string]: IChain
}

interface IContract {
  address: string
  chain: ChainEnum
  ABI: ContractInterface
}

export interface IBlockChain {
  contracts: IContract[]
  chainMap: IChainMap
}

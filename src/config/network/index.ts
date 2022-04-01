export enum ChainIDEnum {
  MUMBAI = 80001,
  CRAB = 44
}

export interface INetwork {
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

export interface INetworkMap {
  [key: string]: INetwork
}

const networkMap: INetworkMap = {
  [ChainIDEnum.MUMBAI]: {
    chainId: '0x13881',
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
    chainName: 'Mumbai Testnet',
    iconUrls: [
      'https://alphaevolution.l2me.com/assets/chain/polygon/matic.png'
    ],
    nativeCurrency: {
      name: 'test Matic',
      symbol: 'Matic',
      decimals: 18
    },
    rpcUrls: ['https://matic-mumbai.chainstacklabs.com']
  },
  [ChainIDEnum.CRAB]: {
    chainId: '0x2C',
    blockExplorerUrls: ['https://crab.subview.xyz/'],
    chainName: 'Crab Network Chain',
    iconUrls: [''],
    nativeCurrency: {
      name: 'Crab Network Native Token',
      symbol: 'CRAB',
      decimals: 18
    },
    rpcUrls: ['https://crab-rpc.darwinia.network']
  }
}

export default networkMap

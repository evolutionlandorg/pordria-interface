export enum ChainIDEnum {
  MUMBAI = 80001,
  CRAB = 44,
  POLYGON = 137,
  ETHEREUM = 1,
  HECO = 128,
  HECO_TEST = 256
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
  [ChainIDEnum.ETHEREUM]: {
    chainId: '0x1',
    blockExplorerUrls: ['https://etherscan.io/'],
    chainName: 'Ethereum Network',
    iconUrls: [''],
    nativeCurrency: {
      name: 'Ethereum Network Token',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://ropsten.infura.io/v3/616e88b770be403a8be78c4b545a5298']
  },
  [ChainIDEnum.POLYGON]: {
    chainId: '0x89',
    blockExplorerUrls: ['https://polygonscan.com/'],
    chainName: 'Polygon Chain',
    iconUrls: ['https://portal.evolution.land/images/token/matic.svg'],
    nativeCurrency: {
      name: 'Polygon Chain Token',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://polygon-rpc.com']
  },
  [ChainIDEnum.MUMBAI]: {
    chainId: '0x13881',
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
    chainName: 'Mumbai Testnet',
    iconUrls: ['https://portal.evolution.land/images/token/matic.svg'],
    nativeCurrency: {
      name: 'test Matic',
      symbol: 'Matic',
      decimals: 18
    },
    rpcUrls: ['https://matic-mumbai.chainstacklabs.com']
  },
  [ChainIDEnum.HECO]: {
    chainId: '0x80',
    blockExplorerUrls: ['https://hecoinfo.com/'],
    chainName: 'Heco Chain',
    iconUrls: ['https://portal.evolution.land/images/token/ht.svg'],
    nativeCurrency: {
      name: 'Huobi ECO Chain Token',
      symbol: 'HT',
      decimals: 18
    },
    rpcUrls: ['https://http-mainnet.hecochain.com']
  },
  [ChainIDEnum.HECO_TEST]: {
    chainId: '0x100',
    blockExplorerUrls: ['https://testnet.hecoinfo.com/'],
    chainName: 'Heco Testnet',
    iconUrls: ['https://portal.evolution.land/images/token/ht.svg'],
    nativeCurrency: {
      name: 'Huobi ECO Chain Token',
      symbol: 'HT',
      decimals: 18
    },
    rpcUrls: ['https://http-testnet.hecochain.com']
  },
  [ChainIDEnum.CRAB]: {
    chainId: '0x2C',
    blockExplorerUrls: ['https://crab.subview.xyz/'],
    chainName: 'Crab Smart Chain',
    iconUrls: ['https://portal.evolution.land/images/token/crab.svg'],
    nativeCurrency: {
      name: 'Crab Network Native Token',
      symbol: 'CRAB',
      decimals: 18
    },
    rpcUrls: ['https://crab-rpc.darwinia.network']
  }
}

export default networkMap

import { ChainIDEnum, IChains } from '@/config/block-chain/common'

const config: IChains = {
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

export default config

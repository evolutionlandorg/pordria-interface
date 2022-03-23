import { ChainEnum, IBlockChain } from '@/config/block-chain/common'

const config: IBlockChain = {
  [ChainEnum.MUMBAI]: {
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
  }
}

export default config

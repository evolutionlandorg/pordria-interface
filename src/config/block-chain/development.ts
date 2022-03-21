import { ChainEnum, IBlockChain } from '@/config/block-chain/common'

const config: IBlockChain = {
  contracts: [
    {
      address: '0xD27FC0d303387e73c1a21a3c7C64524E6555e136',
      chain: ChainEnum.MUMBAI,
      ABI: [
        { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'claims',
              type: 'address'
            }
          ],
          name: 'Create',
          type: 'event'
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'bytes32',
              name: 'org',
              type: 'bytes32'
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'claims',
              type: 'address'
            }
          ],
          name: 'Register',
          type: 'event'
        },
        {
          inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          name: 'allOrgs',
          outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'org', type: 'bytes32' },
            { internalType: 'address', name: 'admin', type: 'address' }
          ],
          name: 'create',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
          name: 'orgOf',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'org', type: 'bytes32' },
            { internalType: 'address', name: 'claims', type: 'address' }
          ],
          name: 'register',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [
            { internalType: 'address', name: '_setter', type: 'address' }
          ],
          name: 'setSetter',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [],
          name: 'setter',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function'
        }
      ]
    }
  ],
  chainMap: {
    [ChainEnum.MUMBAI]: {
      chainId: '0x13881',
      blockExplorerUrls: ['https://mumbai.polygonscan.com'],
      chainName: ChainEnum.MUMBAI,
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
}

export default config

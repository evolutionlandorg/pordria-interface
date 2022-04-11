interface IERC721 {
  ids: Array<number>
  contractAddress: string
}

interface IERC1155 extends IERC721 {
  values: Array<number>
}

interface IClaim {
  to: string
  erc1155: Array<IERC1155>
  erc721: Array<IERC721>
  erc20: {
    amounts: Array<number>
    contractAddresses: Array<string>
  }
  salt?: string
  proof: string[]
}

interface EventItem {
  chainId: number
  address: string
  name: string
  detail: string
  logoURI: string
  proofURI: string
  claims: IClaim[]
  root: string
}

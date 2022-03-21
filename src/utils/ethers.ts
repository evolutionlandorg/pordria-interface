import { providers, Contract } from 'ethers'
import blockChainConfig from '@/config/block-chain'

export default async function main() {
  const { contracts, chainMap } = blockChainConfig

  const [{ chain, address, ABI }] = contracts
  const { rpcUrls } = chainMap[chain]

  const provider = new providers.JsonRpcBatchProvider(rpcUrls[0])

  const contract = new Contract(address, ABI, provider)

  console.warn(await contract.allOrgs(1))
}

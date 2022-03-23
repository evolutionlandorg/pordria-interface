import developmentConfig from '@/config/block-chain/development'
import productionConfig from '@/config/block-chain/production'

const blockChainConfig =
  process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig

export default blockChainConfig

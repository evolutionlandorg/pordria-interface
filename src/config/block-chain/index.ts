import developmentConfig from '@/config/block-chain/development'
import productionConfig from '@/config/block-chain/production'

const chainConfig =
  process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig

export default chainConfig

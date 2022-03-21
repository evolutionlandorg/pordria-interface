import developmentConfig from '@/config/block-chain/development'
import productionConfig from '@/config/block-chain/production'

export default process.env.NODE_ENV === 'production'
  ? productionConfig
  : developmentConfig

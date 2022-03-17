const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

async function cracoConfig() {
  return {
    webpack: {
      configure: {
        resolve: {
          plugins: [new TsconfigPathsPlugin({})]
        }
      }
    }
  }
}

module.exports = cracoConfig

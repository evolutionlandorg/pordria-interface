import { Web3ReactProvider } from '@web3-react/core'
import React, { FC } from 'react'
import { getLibrary } from '@/utils/web3-react'

const Provider: FC<{}> = ({ children }) => (
  <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
)

export default Provider

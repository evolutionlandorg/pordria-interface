import { Web3ReactProvider } from '@web3-react/core'
import React, { FC } from 'react'
import { getLibrary } from '@/utils/web3-react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/theme'

const Provider: FC<{}> = ({ children }) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </Web3ReactProvider>
)

export default Provider

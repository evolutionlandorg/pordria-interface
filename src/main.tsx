import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'

function Layout() {
  return (
    <Flex direction="column" align="center" minHeight="100vh">
      <Header />
      <Outlet />
    </Flex>
  )
}

export default Layout

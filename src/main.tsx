import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Notifications from '@/components/Notifications'
import { Flex } from '@chakra-ui/react'

function Layout() {
  return (
    <Flex
      direction="column"
      align="center"
      bgGradient="linear(285.42deg, gradient.main-start, gradient.main-end)"
      minHeight="100vh"
    >
      <Header />
      <Outlet />
      <Notifications />
    </Flex>
  )
}

export default Layout

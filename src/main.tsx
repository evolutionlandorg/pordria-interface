import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Notifications from '@/components/Notifications'
import { gradient } from './styles/variables'

const App = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-image: ${gradient.background};
`

function Layout() {
  return (
    <App>
      <Header />
      <Outlet />
      <Notifications />
    </App>
  )
}

export default Layout

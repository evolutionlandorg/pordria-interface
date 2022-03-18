import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const App = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function Layout() {
  return (
    <App>
      <Header />
      <Outlet />
    </App>
  )
}

export default Layout

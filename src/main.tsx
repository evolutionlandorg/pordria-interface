import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const App = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(
    285.42deg,
    rgba(133, 156, 234, 0.05) 1.17%,
    rgba(173, 255, 255, 0.1) 100.94%
  );
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

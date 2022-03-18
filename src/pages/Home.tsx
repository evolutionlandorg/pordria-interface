import CardList from '@/components/CardList'
import Intro from '@/components/Intro'
import React from 'react'
import styled from 'styled-components'

const Main = styled.main`
  display: grid;
  grid-template-columns: 28.749rem 1fr;
  grid-gap: 3rem;
  box-sizing: border-box;
  position: relative;

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    width: 100%;
  }
`

function Home() {
  return (
    <Main>
      <Intro />
      <CardList />
    </Main>
  )
}

export default Home

import theme from '@/theme'
import { SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import CardList from './CardList'
import Intro from './Intro'

function Home() {
  return (
    <SimpleGrid
      templateColumns={{ base: '1fr', lg: `${theme.sizes.md} 1fr` }}
      spacing="12"
      as="main"
    >
      <Intro />
      <CardList />
    </SimpleGrid>
  )
}

export default Home

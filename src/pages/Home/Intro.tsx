import React from 'react'
import { CSSObject, Heading, Text, VStack } from '@chakra-ui/react'

const introSX: CSSObject = {
  mt: '16',
  maxW: 'md',
  position: 'sticky',
  top: '32',
  height: 'fit-content',
  '@media screen and (max-width: 960px)': {
    position: 'relative',
    top: 'initial',
    mt: '8'
  }
}

function Intro() {
  return (
    <VStack sx={introSX} spacing="10" as="section" align="start">
      <Heading fontSize="3.5rem" fontWeight="black">
        An EVM Airdrop Aggregator
      </Heading>
      <Text maxW="96">
        Pordria is an airdrop aggregator supporting ERC - 20, ERC - 721, ERC -
        1155 assets to be airdropped on Ethereum, Polygon, Heco, and Crab.
      </Text>
    </VStack>
  )
}

export default Intro

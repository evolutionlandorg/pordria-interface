import { baseColor, computeSize, size, weight } from '@/styles/variables'
import React from 'react'
import styled from 'styled-components'
import { Heading } from '@chakra-ui/react'

const IntroContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${computeSize(40)};
  margin-top: ${computeSize(80)};
  position: sticky;
  top: ${computeSize(140)};
  height: fit-content;
  max-width: ${computeSize(380)};

  @media screen and (max-width: 960px) {
    position: relative;
    top: initial;
    margin-top: 2rem;
  }
`

const Description = styled.span`
  font-size: ${size.lg};
  line-height: 150%;
  max-width: 100%;
  font-weight: ${weight.semiBold};
  color: ${baseColor.onPrimary};
`

function Intro() {
  return (
    <IntroContainer>
      <Heading size="2xl">An EVM Airdrop Aggregator</Heading>
      <Description>
        Pordria is an airdrop aggregator supporting ERC - 20, ERC - 721, ERC -
        1155 assets to be airdropped on Ethereum, Polygon, Heco, and Crab.
      </Description>
    </IntroContainer>
  )
}

export default Intro

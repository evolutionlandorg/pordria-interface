import { baseColor, computeSize, size, weight } from '@/styles/variables'
import React from 'react'
import styled from 'styled-components'

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

const Title = styled.h1`
  text-align: left;
  font-size: ${size.h1};
  line-height: ${computeSize(64)};
  letter-spacing: 0.002em;
  color: ${baseColor.darkBlack};
  margin: 0;
  max-width: 100%;

  @media screen and (max-width: 960px) {
    font-size: 2.1875rem;
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
      <Title>An EVM Airdrop Aggregator</Title>
      <Description>
        Pordria is an airdrop aggregator supporting ERC - 20, ERC - 721, ERC -
        1155 assets to be airdropped on Ethereum, Polygon, Heco, and Crab.
      </Description>
    </IntroContainer>
  )
}

export default Intro

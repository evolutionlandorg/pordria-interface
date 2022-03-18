import React from 'react'
import styled from 'styled-components'

const IntroContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 6rem;
  position: sticky;
  top: 10rem;
  height: fit-content;

  @media screen and (max-width: 960px) {
    position: relative;
    top: initial;
    margin-top: 2rem;
  }
`

const Title = styled.h1`
  text-align: left;
  font-size: 3rem;
  line-height: 125%;
  letter-spacing: 0.002em;
  color: #1f1f1f;
  margin: 0;

  @media screen and (max-width: 960px) {
    font-size: 2.1875rem;
  }
`

const Description = styled.span`
  font-size: 1.25rem;
  line-height: 150%;
`

function Intro() {
  return (
    <IntroContainer>
      <Title>An EVM Airdrop Aggregator</Title>
      <Description>
        Pordria is an airdrop aggregator support ERC - 20 / ERC - 721/ ERC -
        1155 assets to be airdropped on Ethereum, Polygon, Heco, and Crab.
      </Description>
    </IntroContainer>
  )
}

export default Intro

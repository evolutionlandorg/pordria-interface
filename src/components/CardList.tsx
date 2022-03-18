import React from 'react'
import styled from 'styled-components'
import Card from '@/components/Card'
import { INDEX } from '@/config/routers'

const IntroContainer = styled.section`
  padding: 5rem 0 6rem 0;
  display: grid;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 45rem;
  min-width: 45rem;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 960px) {
    max-width: initial;
    min-width: initial;
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 414px) {
    display: flex;
    flex-wrap: wrap;
    max-width: initial;
    min-width: initial;
    grid-template-columns: 1fr;
  }
`

function CardList() {
  return (
    <IntroContainer>
      {new Array(10).fill(1).map((v, i) => (
        // TODO: waiting for discussed result next week
        // eslint-disable-next-line react/no-array-index-key
        <Card key={i} to={INDEX} />
      ))}
    </IntroContainer>
  )
}

export default CardList

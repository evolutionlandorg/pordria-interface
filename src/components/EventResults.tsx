import React from 'react'
import styled from 'styled-components'
import Search from '@/components/Search'
import Wallet from '@/components/Wallet'
import EventsList from '@/components/EventsList'

const OptBar = styled.div`
  display: grid;
  margin-bottom: 2rem;
  grid-template-columns: 1fr 188px;
  grid-gap: 1rem;
`

const StyledResults = styled.div`
  padding: 3rem 0;
`

function EventResults() {
  return (
    <StyledResults>
      <OptBar>
        <Search />
        <Wallet />
      </OptBar>
      <EventsList />
    </StyledResults>
  )
}

export default EventResults

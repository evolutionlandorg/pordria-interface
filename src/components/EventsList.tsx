import React from 'react'
import styled from 'styled-components'
import EventItem from './EventItem'

const ListTitle = styled.div`
  font-weight: 500;
  color: rgba(0, 0, 0, 0.3);
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 128px 96px 96px 1fr 96px;
  margin-bottom: 1rem;
  @media screen and (max-width: 414px) {
    display: none;
  }
`

const Opt = styled.p`
  text-align: right;
`

function EventsList() {
  return (
    <>
      <ListTitle>
        <p>Event ID</p>
        <p>Start Time</p>
        <p>End Time</p>
        <p>Detail</p>
        <Opt>Operation</Opt>
      </ListTitle>
      {new Array(20).fill(null).map(() => (
        <EventItem key={Math.random()} />
      ))}
    </>
  )
}

export default EventsList

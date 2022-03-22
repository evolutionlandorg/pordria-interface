import React, { FC } from 'react'
import styled from 'styled-components'
import Search from '@/components/Search'
import Wallet from '@/components/Wallet'
import { IEventItem } from '@/hooks/useFetchEventList'
import EventItem from '@/components/EventItem'

const OptBar = styled.div`
  display: grid;
  margin-bottom: 2rem;
  grid-template-columns: 1fr 188px;
  grid-gap: 1rem;
`

const StyledResults = styled.div`
  padding: 3rem 0;
`
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
interface IEventResultsProps {
  list?: IEventItem[]
}

const EventResults: FC<IEventResultsProps> = ({ list = [] }) => (
  <StyledResults>
    <OptBar>
      <Search />
      <Wallet />
    </OptBar>
    <ListTitle>
      <p>Event ID</p>
      <p>Start Time</p>
      <p>End Time</p>
      <p>Detail</p>
      <Opt>Operation</Opt>
    </ListTitle>
    {list.map(item => (
      <EventItem key={item.name} item={item} />
    ))}
  </StyledResults>
)

EventResults.defaultProps = {
  list: undefined
}

export default EventResults

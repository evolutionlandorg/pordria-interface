import React, { FC, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import Search from '@/components/Search'
import Wallet from '@/components/Wallet'
import { IEventItem } from '@/hooks/useFetchEventList'
import EventItem from '@/components/EventItem'
import { Index } from 'flexsearch'

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

const EventResults: FC<IEventResultsProps> = ({ list = [] }) => {
  const [roots, setRoots] = useState<string[]>([])
  const [user, setUser] = useState('')
  const indexSearch = useMemo(() => {
    const index = new Index({ tokenize: 'full' })
    list.forEach(({ root, claims = [] }) => {
      claims.forEach(({ to }) => {
        index.add(root, to)
      })
    })

    return index
  }, [list])

  const renderEvents = useCallback(
    () =>
      list
        .map(item => {
          const { root } = item
          if (roots.length <= 0 || roots.includes(root)) {
            return <EventItem key={root} item={item} user={user} />
          }
          return null
        })
        .filter(Boolean),
    [list, roots, user]
  )

  const search = () => {
    const searchResult = indexSearch.search(user).map(item => item.toString())
    setRoots(searchResult)
  }

  return (
    <StyledResults>
      <OptBar>
        <Search onSearch={search} onChange={e => setUser(e.target.value)} />
        <Wallet />
      </OptBar>
      <ListTitle>
        <p>Event ID</p>
        <p>Start Time</p>
        <p>End Time</p>
        <p>Detail</p>
        <Opt>Operation</Opt>
      </ListTitle>
      {renderEvents()}
    </StyledResults>
  )
}

EventResults.defaultProps = {
  list: undefined
}

export default EventResults

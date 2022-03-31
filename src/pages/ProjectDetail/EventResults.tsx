import React, { FC, useMemo, useState } from 'react'
import styled from 'styled-components'
import Search from '@/components/Search'
import { IEventItem } from '@/hooks/useFetchEventList'
import { Index } from 'flexsearch'
import { baseColor, computeSize } from '@/styles/variables'
import useAuth from '@/hooks/useAuth'
import EventItem, { ItemContainer } from './EventItem'
import Wallet from './Wallet'

const OptBar = styled.div`
  display: flex;
  margin-bottom: 2rem;
  gap: ${computeSize(30)};
`

const OptSearch = styled(Search)`
  flex: 1;
`

const StyledResults = styled.div`
  padding: 3rem 0;
`
const ListTitle = styled(ItemContainer)`
  color: ${baseColor.secondary};
  margin-bottom: ${computeSize(20)};
`

const Opt = styled.span`
  text-align: right;
`
interface IEventResultsProps {
  list?: IEventItem[]
  chainID?: number
}

const EventResults: FC<IEventResultsProps> = ({ list = [], chainID }) => {
  const [roots, setRoots] = useState<string[]>([])
  const [searchFocused, setSearchFocused] = useState(false)
  const { account } = useAuth()
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
  const searchValue = useMemo(() => {
    if (searchFocused || user) {
      return user
    }

    return account || ''
  }, [user, account, searchFocused])

  const renderEvents = () =>
    list
      .map(item => {
        const { root } = item
        if (roots.length <= 0 || roots.includes(root)) {
          return <EventItem key={root} item={item} user={searchValue} />
        }
        return null
      })
      .filter(Boolean)

  const search = () => {
    const searchResult = indexSearch.search(user).map(item => item.toString())
    setRoots(searchResult)
  }

  return (
    <StyledResults>
      <OptBar>
        <OptSearch
          onSearch={search}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          onChange={e => setUser(e.target.value)}
          value={searchValue}
        />
        <Wallet chainID={chainID} />
      </OptBar>
      <ListTitle>
        <span>Event ID</span>
        <span>End Time</span>
        <span>Detail</span>
        <Opt>Operation</Opt>
      </ListTitle>
      {renderEvents()}
    </StyledResults>
  )
}

EventResults.defaultProps = {
  list: undefined,
  chainID: undefined
}

export default EventResults

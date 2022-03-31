import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Search from '@/components/Search'
import { IEventItem } from '@/hooks/useFetchEventList'
import { baseColor, computeSize, size, weight } from '@/styles/variables'
import useAuth from '@/hooks/useAuth'
import Fuse from 'fuse.js'
import EventItem, { ItemContainer } from './EventItem'
import Wallet from './Wallet'

const OptBar = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`

const OptContent = styled.div`
  display: flex;
  gap: ${computeSize(30)};
`

const OptSearch = styled(Search)`
  flex: 1;
`
const OptSearchTips = styled.p`
  margin: 0;
  margin-top: ${computeSize(8)};
  font-size: ${size.tn};
  font-weight: ${weight.semiBold};
  color: ${baseColor.onPrimary};
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

const EventResults = ({ list = [], chainID }: IEventResultsProps) => {
  const [roots, setRoots] = useState<IEventItem[]>([])
  const { account } = useAuth()
  const [user, setUser] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const fuse = useMemo(
    () =>
      new Fuse(list, {
        threshold: 0.1,
        keys: ['claims.to']
      }),
    [list]
  )

  const search = useCallback(
    (value: string) => {
      const searchResult = fuse.search(value)
      setUser(value)

      setRoots(searchResult.map(({ item }) => item))
    },
    [setUser, setRoots, fuse]
  )

  useEffect(() => {
    if (account) {
      setSearchValue(account)
      search(account)
    }
  }, [account, search])

  const renderEvents = () =>
    (user ? roots : list).map(item => {
      const { root } = item
      return <EventItem key={root} item={item} user={user} />
    })

  return (
    <StyledResults>
      <OptBar>
        <OptContent>
          <OptSearch
            onSearch={() => search(searchValue)}
            onChange={e => setSearchValue(e.target.value.toLowerCase())}
            value={searchValue}
          />
          <Wallet chainID={chainID} />
        </OptContent>
        <OptSearchTips>
          {user
            ? `Searching: ${user}`
            : 'click search button to start searching'}
        </OptSearchTips>
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

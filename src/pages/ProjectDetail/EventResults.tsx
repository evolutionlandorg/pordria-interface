import React, { useMemo } from 'react'
import {
  chakra,
  CSSObject,
  Flex,
  Heading,
  Show,
  SimpleGrid,
  useChakra
} from '@chakra-ui/react'
import Wallet from './Wallet'
import EventItem from './EventItem'

const Wrapper = chakra('section', {
  baseStyle: {
    py: '10'
  }
})
interface IEventResultsProps {
  list?: EventItem[]
  chainID?: number
}

const EventResults = ({ list = [], chainID }: IEventResultsProps) => {
  const { theme } = useChakra()

  const listSX = useMemo<CSSObject>(
    () => ({
      gridTemplateColumns: {
        base: `1fr ${theme.sizes['20']}`,
        sm: `${theme.sizes['36']} 1fr ${theme.sizes['20']}`,
        lg: `${theme.sizes['36']} ${theme.sizes['40']} 1fr ${theme.sizes['20']}`
      },
      py: '3',
      px: '6',
      gap: '4',
      wordBreak: 'break-all',
      whiteSpace: 'pre-wrap',
      alignItems: 'center'
    }),
    [theme]
  )

  const renderEvents = () =>
    list.map(item => {
      const { root } = item
      return <EventItem key={root} item={item} />
    })

  return (
    <Wrapper>
      <Flex justify="flex-end">
        <Wallet chainID={chainID} />
      </Flex>

      <SimpleGrid
        sx={listSX}
        bgColor="gray.100"
        borderTopRadius="primary"
        mt="5"
      >
        <Heading size="xs">Event ID</Heading>
        <Show above="lg">
          <Heading size="xs">End Time</Heading>
        </Show>
        <Show above="sm">
          <Heading size="xs">Detail</Heading>
        </Show>
        <Heading size="xs" justifySelf="end">
          Operation
        </Heading>
      </SimpleGrid>
      <SimpleGrid sx={listSX}>{renderEvents()}</SimpleGrid>
    </Wrapper>
  )
}

EventResults.defaultProps = {
  list: undefined,
  chainID: undefined
}

export default EventResults

import React, { useEffect, useMemo, useState } from 'react'
import useFetchEventList from '@/hooks/useFetchEventList'
import { useLocation } from 'react-router-dom'
import { SimpleGrid } from '@chakra-ui/react'
import theme from '@/theme'
import ProjectDescription from './ProjectDescription'
import EventResults from './EventResults'

function ProjectDetail() {
  const location = useLocation()
  const [projectID, setProjectID] = useState<string>('')
  const projectsID = useMemo(() => [projectID], [projectID])
  const res = useFetchEventList(projectsID, true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const search = location.search
      .slice(1)
      .split('&')
      .reduce<{ [key: string]: string }>((params, kv) => {
        const [k, v] = kv.split('=')
        return {
          ...params,
          [k]: v
        }
      }, {})
    setProjectID(search.url)
  }, [location])

  const { description, chainID, result } = useMemo(() => {
    if (projectID) {
      const { projectDetail: list } = res[projectID]
      const { events } = list || {}

      return {
        description: list,
        result: events,
        chainID: events && events[0].chainId
      }
    }
    return {}
  }, [res, projectID])

  return (
    <SimpleGrid
      templateColumns={{
        base: '1fr',
        lg: `${theme.sizes['60']} ${theme.sizes['4xl']}`
      }}
      spacing={{ base: '6', lg: '10' }}
      px={{ base: '6', lg: 'initial' }}
    >
      <ProjectDescription
        id={projectID}
        description={description}
        chainID={chainID}
      />
      <EventResults list={result} chainID={chainID} />
    </SimpleGrid>
  )
}

export default ProjectDetail

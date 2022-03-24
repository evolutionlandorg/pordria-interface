import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import useFetchEventList from '@/hooks/useFetchEventList'
import { useLocation } from 'react-router-dom'
import ProjectDescription from './ProjectDescription'
import EventResults from './EventResults'

const StyledList = styled.main`
  display: grid;
  grid-template-columns: 300px 800px;
  grid-gap: 3rem;
  position: relative;
  box-sizing: border-box;

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
    width: 100%;
    grid-gap: 1.5rem;
    padding: 0 1.5rem;
  }
`

function ProjectDetail() {
  const location = useLocation()
  const [projectsID, setProjectsID] = useState<string[]>([])
  const res = useFetchEventList(projectsID, true)

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
    setProjectsID([search.url])
  }, [location])

  const { description, chainID, result } = useMemo(() => {
    if (projectsID.length > 0) {
      const { projectDetail: list } = res[projectsID[0]]
      const { events } = list || {}

      return {
        description: list,
        result: events,
        chainID: events && events[0].chainId
      }
    }
    return {}
  }, [res, projectsID])

  return (
    <StyledList>
      <ProjectDescription
        id={projectsID[0]}
        description={description}
        chainID={chainID}
      />
      <EventResults list={result} chainID={chainID} />
    </StyledList>
  )
}

export default ProjectDetail

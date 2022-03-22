import React, { useEffect, useMemo, useState } from 'react'
import ProjectDescription from '@/components/ProjectDescription'
import styled from 'styled-components'
import EventResults from '@/components/EventResults'
import useFetchEventList from '@/hooks/useFetchEventList'
import { useLocation } from 'react-router-dom'

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
  const res = useFetchEventList(projectsID)

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

  const renderRes = useMemo(() => {
    if (projectsID.length > 0) {
      const { list } = res[projectsID[0]]
      const { events } = list || {}

      return { description: list, result: events }
    }

    return {}
  }, [res, projectsID])

  return (
    <StyledList>
      <ProjectDescription
        id={projectsID[0]}
        description={renderRes.description}
      />
      <EventResults list={renderRes.result} />
    </StyledList>
  )
}

export default ProjectDetail

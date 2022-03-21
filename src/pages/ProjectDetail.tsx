import React from 'react'
import ProjectDescription from '@/components/ProjectDescription'
import styled from 'styled-components'
import EventResults from '@/components/EventResults'

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
  return (
    <StyledList>
      <ProjectDescription />
      <EventResults />
    </StyledList>
  )
}

export default ProjectDetail

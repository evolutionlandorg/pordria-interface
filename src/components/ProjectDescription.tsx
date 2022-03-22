import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { getUrl, IEventList } from '@/hooks/useFetchEventList'

const StyledInfo = styled.section`
  display: grid;
  grid-template-rows: 1fr;
  grid-gap: 2rem;
  max-width: 960px;
  box-sizing: border-box;
  padding: 3rem 0;
  min-height: 400px;
  position: sticky;
  top: 3rem;
  height: 400px;

  @media screen and (max-width: 960px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem;
    position: relative;
    align-items: flex-start;
    min-height: initial;
    top: initial;
    margin-top: 2rem;
    height: fit-content;
    padding: 0;
  }

  @media screen and (max-width: 414px) {
    grid-template-columns: max-content;
    width: 100%;
    max-width: 320px;
    overflow: hidden;
  }
`

const descriptionCSS = css`
  font-size: 1rem;
  max-width: 260px;
`

const Description = styled.h4`
  ${descriptionCSS}
  margin: 1.25rem 0 0.25rem;
`

const Link = styled.a`
  ${descriptionCSS}
  color: #2172e5;
`

interface IProjectDescriptionProps {
  id: string
  description?: IEventList | null
}

const ProjectDescription: FC<IProjectDescriptionProps> = ({
  description,
  id
}) => {
  const { logoURI, name } = description || {}
  return (
    <StyledInfo>
      <img src={logoURI} alt="Evolution" />
      <div>
        <Description>{name}</Description>
        <Description>Website:</Description>
        <Link target="_blank" href={getUrl(id || '')} rel="noreferrer">
          {id}
        </Link>
      </div>
    </StyledInfo>
  )
}

ProjectDescription.defaultProps = {
  description: undefined
}

export default ProjectDescription

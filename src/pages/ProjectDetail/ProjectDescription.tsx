import React, { FC, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { getUrl, IProjectDetail } from '@/hooks/useFetchEventList'
import useProjects from '@/hooks/useProjects'
import chainConfig from '@/config/block-chain'

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

const DesContent = styled.span`
  ${descriptionCSS}
  color: #333;
`

const Link = styled.a`
  ${descriptionCSS}
  color: #2172e5;
`

interface IProjectDescriptionProps {
  id: string
  description?: IProjectDetail | null
  chainID?: number
}

const ProjectDescription: FC<IProjectDescriptionProps> = ({
  description,
  id,
  chainID
}) => {
  const { projects } = useProjects()
  const chainName = useMemo(() => {
    if (chainID) {
      return chainConfig[chainID].chainName
    }

    return ''
  }, [chainID])
  const { logoURI, name = id && projects[id].name } = description || {}
  return (
    <StyledInfo>
      <img src={logoURI} alt="Evolution" />
      <div>
        <Description>{name}</Description>
        <Description>Network:</Description>
        <DesContent>{chainName}</DesContent>
        <Description>Website:</Description>
        <Link target="_blank" href={getUrl(id || '')} rel="noreferrer">
          {id}
        </Link>
      </div>
    </StyledInfo>
  )
}

ProjectDescription.defaultProps = {
  description: undefined,
  chainID: undefined
}

export default ProjectDescription

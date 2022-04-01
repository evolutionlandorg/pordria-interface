import React, { FC, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { IProjectDetail } from '@/hooks/useFetchEventList'
import useProjects from '@/hooks/useProjects'
import networkMap from '@/config/network'
import Img from '@/components/Image'
import {
  baseColor,
  color,
  computeSize,
  gradient,
  radius,
  size
} from '@/styles/variables'

const StyledInfo = styled.section`
  display: grid;
  grid-template-rows: 1fr;
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
    grid-gap: ${computeSize(20)};
    position: relative;
    align-items: flex-start;
    min-height: initial;
    top: initial;
    margin-top: ${computeSize(50)};
    height: fit-content;
    padding: 0;
  }

  @media screen and (max-width: 414px) {
    grid-template-columns: max-content;
    width: 100%;
    max-width: ${computeSize(320)};
    overflow: hidden;
  }
`

const descriptionCSS = css`
  font-size: ${size.sm};
  max-width: ${computeSize(260)};
`

const Description = styled.h4`
  ${descriptionCSS}
  font-size: ${size.md};
  margin-top: ${computeSize(20)};
`

const DesContent = styled.span`
  ${descriptionCSS}
  color: ${baseColor.darkBlack};
  display: inline-block;
  margin-top: ${computeSize(10)};
`

const Link = styled.a`
  ${descriptionCSS}
  color: ${baseColor.blue};
  line-height: 1;
`

const LogoContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: ${computeSize(30)};
  width: fit-content;
  border: 1px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: ${gradient.card};
  box-shadow: 0px 4px 4px ${color.cardShadow};
  border-radius: ${radius.lg};
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
      return networkMap[chainID].chainName
    }

    return ''
  }, [chainID])
  const { homepage, name: projectName } = projects[id] || {}
  const { logoURI, name = id && projectName } = description || {}
  return (
    <StyledInfo>
      <LogoContainer>
        <Img src={logoURI} alt={name} width={computeSize(100)} />
      </LogoContainer>
      <div>
        <Description>{name}</Description>
        <Description>Network:</Description>
        <DesContent>{chainName}</DesContent>
        <Description>Website:</Description>
        <DesContent>
          <Link target="_blank" href={homepage} rel="noreferrer">
            {homepage}
          </Link>
        </DesContent>
      </div>
    </StyledInfo>
  )
}

ProjectDescription.defaultProps = {
  description: undefined,
  chainID: undefined
}

export default ProjectDescription

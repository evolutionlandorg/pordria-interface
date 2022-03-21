import React from 'react'
import styled, { css } from 'styled-components'
import logo from '@/logo.png'

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

const description = css`
  font-size: 1rem;
  max-width: 260px;
`

const Description = styled.h4`
  ${description}
  margin: 1.25rem 0 0.25rem;
`

const Link = styled.a`
  ${description}
  color: #2172e5;
`

function ProjectDescription() {
  return (
    <StyledInfo>
      <img src={logo} alt="Evolution" />
      <div>
        <Description>Evolution Land</Description>
        <Description>Website:</Description>
        <Link
          target="_blank"
          href="https://www.evolution.land"
          rel="noreferrer"
        >
          www.evolution.land
        </Link>
      </div>
    </StyledInfo>
  )
}

export default ProjectDescription

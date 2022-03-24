import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CONTACT_US, GITHUB_INDEX, INDEX } from '@/config/routers'
import { MarkGithubIcon, PaperAirplaneIcon } from '@primer/octicons-react'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  position: sticky;
  top: 0;
  backdrop-filter: blur(20px);
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.01);
  border-bottom: 0.75px solid rgba(19, 19, 19, 0.13);

  a {
    color: #0f0f0f;
  }
`
const Title = styled.h2`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
`
const StyledPaperAirplaneIcon = styled(PaperAirplaneIcon)`
  margin-right: 0.625rem;
`

const Nav = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
`
const ButtonLink = styled.a`
  display: inline-block;
  padding: 0.375rem 1rem;
  font-weight: 600;
  line-height: 1.25rem;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  border-radius: 0.375rem;
  text-align: center;
  font-size: 0.875rem;
  color: rgb(36, 41, 47);
  background-color: rgb(246, 248, 250);
  border: 1px solid rgba(27, 31, 36, 0.15);
  box-shadow: rgb(27 31 36 / 4%) 0px 1px 0px,
    rgb(255 255 255 / 25%) 0px 1px 0px inset;
`
const ButtonContent = styled.span`
  margin-left: 0.5rem;
`

function Header() {
  return (
    <StyledHeader>
      <Link to={INDEX}>
        <Title>
          <StyledPaperAirplaneIcon /> Pordria
        </Title>
      </Link>
      <Nav>
        <a href={CONTACT_US} rel="noreferrer">
          Contact us
        </a>
        <ButtonLink target="_blank" href={GITHUB_INDEX}>
          <MarkGithubIcon />
          <ButtonContent>Github</ButtonContent>
        </ButtonLink>
      </Nav>
    </StyledHeader>
  )
}

export default Header

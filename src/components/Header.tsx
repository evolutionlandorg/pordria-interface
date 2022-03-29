import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CONTACT_US, GITHUB_INDEX, INDEX } from '@/config/routers'
import { computeSize, size } from '@/styles/variables'
import Button from '@/components/Button'
import { GithubIcon, LogoIcon } from '@/components/Icon'

const { sm, md, lg } = size

const HeaderRoot = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: ${computeSize(15)} ${computeSize(30)};
  position: sticky;
  top: 0;
  backdrop-filter: blur(20px);
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.01);
  border-bottom: 1px solid #cfcceb;

  a {
    color: #212121;
    font-size: ${sm};
  }
`
const Title = styled.h2`
  display: flex;
  align-items: center;
  font-size: ${lg};
  color: #212121;
`

const Nav = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: ${computeSize(30)};
`

const ButtonContent = styled.span`
  margin-left: 6px;
`

const Github = styled(GithubIcon)`
  width: ${sm};
`
const Logo = styled(LogoIcon)`
  margin-right: 0.5rem;
`

function Header() {
  return (
    <HeaderRoot>
      <Link to={INDEX}>
        <Title>
          <Logo width={md} />
          Pordria
        </Title>
      </Link>
      <Nav>
        <a href={CONTACT_US}>Contact us</a>
        <Button onClick={() => window.open(GITHUB_INDEX)}>
          <Github width={sm} />
          <ButtonContent>Github</ButtonContent>
        </Button>
      </Nav>
    </HeaderRoot>
  )
}

export default Header

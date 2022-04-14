import React from 'react'
import { Link as ReactLink } from 'react-router-dom'
import { CONTACT_US, GITHUB_INDEX, INDEX } from '@/config/routers'
import { GithubIcon, LogoIcon } from '@/components/Icon'
import {
  Button,
  CSSObject,
  Flex,
  Heading,
  HStack,
  Link,
  LinkOverlay
} from '@chakra-ui/react'

const headerSX: CSSObject = {
  width: 'full',
  py: '3',
  px: '7.5',
  position: 'sticky',
  top: '0',
  zIndex: 'sticky',
  backdropFilter: 'blur(10px)',
  bgColor: 'whiteAlpha.10'
}

const Header = () => (
  <Flex as="header" sx={headerSX} justify="space-between">
    <Flex position="relative" align="center">
      <LogoIcon boxSize="5" mr="2" />
      <Heading size="md">Pordria</Heading>
      <LinkOverlay as={ReactLink} to={INDEX} />
    </Flex>
    <HStack as="nav" spacing="7.5">
      <Link href={CONTACT_US}>Contact us</Link>
      <Button
        variant="github"
        onClick={() => window.open(GITHUB_INDEX)}
        leftIcon={<GithubIcon />}
      >
        Github
      </Button>
    </HStack>
  </Flex>
)

export default Header

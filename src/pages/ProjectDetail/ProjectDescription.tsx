import React, { FC, useMemo } from 'react'
import { IProjectDetail } from '@/hooks/useFetchEventList'
import useProjects from '@/hooks/useProjects'
import networkMap from '@/config/network'
import {
  chakra,
  CSSObject,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Text
} from '@chakra-ui/react'
import ImgWithFb from '@/components/ImgWithFb'

const ProjectDescriptionSX: CSSObject = {
  py: { base: '0', lg: '10' },
  minH: { base: 'initial', lg: 'sm' },
  h: { base: 'fit-content', lg: 'sm' },
  alignItems: { base: 'flex-start', lg: 'initial' },
  pos: { base: 'relative', lg: 'sticky' },
  maxW: { base: '80', sm: 'full' },
  top: { base: 'initial', lg: '10' },
  mt: { base: '12', lg: '0' },
  width: { base: 'full', sm: 'initial' },
  overflow: { base: 'hidden', sm: 'initial' }
}

const logoCardSX: CSSObject = {
  w: 'fit-content',
  p: '3.375rem',
  bgClip: 'padding-box, border-box',
  backgroundOrigin: 'padding-box, border-box',
  border: '1px solid',
  borderColor: 'transparent',
  boxShadow: 'card',
  borderTopRadius: '6.25rem',
  borderBottomRadius: 'xl'
}

const Title = chakra(Heading, {
  baseStyle: {
    ':not(:first-of-type)': {
      mt: '5'
    }
  }
})

const Content = chakra(Text, {
  baseStyle: {
    fontSize: 'sm',
    mt: '2.5'
  }
})

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
    <SimpleGrid
      sx={ProjectDescriptionSX}
      as="section"
      columns={{ base: 1, sm: 2, lg: 1 }}
      spacing="7"
    >
      <Flex
        justify="center"
        align="center"
        sx={logoCardSX}
        bgGradient="linear(to-tr, white, white), linear-gradient(180deg, gradient.cardStart, gradient.cardEnd)"
      >
        <ImgWithFb src={logoURI} alt={name} w="16" />
      </Flex>
      <div>
        <Title size="sm">{name}</Title>
        <Title size="sm">Network:</Title>
        <Content>{chainName}</Content>
        <Title size="sm">Website:</Title>
        <Content>
          <Link color="blue.500" target="_blank" href={homepage}>
            {homepage}
          </Link>
        </Content>
      </div>
    </SimpleGrid>
  )
}

ProjectDescription.defaultProps = {
  description: undefined,
  chainID: undefined
}

export default ProjectDescription

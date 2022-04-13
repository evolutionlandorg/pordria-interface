import React, { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { IRenderItem } from '@/hooks/useFetchEventList'
import { ArrowRightIcon } from '@/components/Icon'
import { CSSObject, Heading, LinkOverlay, Text, Flex } from '@chakra-ui/react'
import ImgWithFb from '@/components/ImgWithFb'

interface CardProps extends LinkProps {
  item: IRenderItem
  id: string
}

const cardSX: CSSObject = {
  position: 'relative',
  p: '6',
  bgClip: 'padding-box, border-box',
  backgroundOrigin: 'padding-box, border-box',
  border: '1px solid',
  borderColor: 'transparent',
  boxShadow: 'card',
  willChange: 'border',
  transition: 'transform 0.25s ease-in-out',
  _hover: {
    transform: 'perspective(1px) scale(1.1)'
  }
}

const Card: FC<CardProps> = ({ to, item, id }) => {
  const { projectDetail } = item
  const { logoURI, name } = projectDetail || {}
  return (
    <Flex
      direction="column"
      sx={cardSX}
      justify="space-between"
      maxW="40"
      borderTopRadius="6.25rem"
      borderBottomRadius="xl"
      bgGradient="linear(to-tr, white, white), linear-gradient(180deg, gradient.cardStart, gradient.cardEnd)"
    >
      <ImgWithFb boxSize="16" mx="auto" src={logoURI} alt={name} mt="4" />
      <Heading size="sm" mt="3" mb="1" overflowWrap="break-word">
        {name}
      </Heading>
      <div>
        <Text>
          Detail
          <ArrowRightIcon width="3" ml="1" />
        </Text>
        <LinkOverlay to={`${to}?url=${id}`} as={Link} />
      </div>
    </Flex>
  )
}

export default Card

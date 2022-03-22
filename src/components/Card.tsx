import React, { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import styled from 'styled-components'
import { ArrowRightIcon } from '@primer/octicons-react'
import { IRenderItem } from '@/hooks/useFetchEventList'

interface CardProps extends LinkProps {
  item: IRenderItem
  id: string
}

const HoverCard = styled(Link)`
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 8px;
  padding: 1.5rem;
  max-width: 12.75rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: white;
  text-decoration: none;
  color: #0f0f0f;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.25s ease-in-out;

  @media screen and (max-width: 960px) {
    max-width: initial;
  }

  @media screen and (max-width: 414px) {
    width: 21.875rem;
  }

  :hover {
    transform: translateY(-10px);
  }
`

const CardLogo = styled.img`
  max-width: 4rem;
  margin-bottom: 2rem;
`

const CardTitle = styled.h3`
  font-size: 1.25rem;
  line-height: 150%;
  margin-bottom: 1.4rem;
`

const Details = styled.span`
  width: 100%;
`

const Card: FC<CardProps> = ({ to, item, id }) => {
  const { list } = item
  const { logoURI, name } = list || {}
  return (
    <HoverCard to={`${to}?url=${id}`}>
      <CardLogo src={logoURI} alt={name} />
      <CardTitle>{name}</CardTitle>
      <Details>
        Details <ArrowRightIcon />
      </Details>
    </HoverCard>
  )
}

export default Card

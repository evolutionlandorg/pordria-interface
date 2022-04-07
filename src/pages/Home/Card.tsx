import React, { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import styled from 'styled-components'
import { IRenderItem } from '@/hooks/useFetchEventList'
import {
  baseColor,
  color,
  computeSize,
  gradient,
  radius,
  size,
  weight
} from '@/styles/variables'
import { ArrowRightIcon } from '@/components/Icon'
import Img from '@/components/Image'

interface CardProps extends LinkProps {
  item: IRenderItem
  id: string
}

const HoverCard = styled(Link)`
  cursor: pointer;
  border-radius: ${radius.lg};
  padding: ${computeSize(30)} ${computeSize(20)};
  max-width: ${computeSize(178)};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: ${baseColor.onPrimary};
  border: 1px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: ${gradient.card};
  box-shadow: 0px 4px 4px ${color.cardShadow};
  will-change: transform, background-image, box-shadow;
  transition: transform 0.25s ease-in-out, background-image 1s ease-in-out;

  @media screen and (max-width: 960px) {
    max-width: initial;
  }

  @media screen and (max-width: 414px) {
    width: 100%;
  }

  :hover {
    transform: perspective(1px) scale(1.1);
    background-image: ${gradient.cardHover};
    box-shadow: 0px 4px 4px ${color.cardHoverShadow};
  }
`

const CardTitle = styled.h3`
  font-size: ${size.md};
  margin: 9px 0;
`

const Details = styled.span`
  font-size: ${size.sm};
  width: 100%;
  font-weight: ${weight.semiBold};
  margin-bottom: 9px;
`

const Card: FC<CardProps> = ({ to, item, id }) => {
  const { projectDetail } = item
  const { logoURI, name } = projectDetail || {}
  return (
    <HoverCard to={`${to}?url=${id}`}>
      <Img src={logoURI} alt={name} />
      <CardTitle>{name}</CardTitle>
      <Details>Details</Details>
      <ArrowRightIcon width={computeSize(12)} />
    </HoverCard>
  )
}

export default Card

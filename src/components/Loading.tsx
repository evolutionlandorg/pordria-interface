import { computeSize, size, weight } from '@/styles/variables'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { LoadingIcon } from './Icon'

const LoadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: ${computeSize(122)};
  font-size: ${size.sm};
  font-weight: ${weight.semiBold};
`
const LoadingRocket = styled(LoadingIcon)`
  width: ${computeSize(30)};
`

const dot = keyframes`
  0% {
    transform: translateX(0.5ch);
  }

  50% {
    transform: translateX(1ch);
  }

  100% {
    transform: translateX(1.5ch);
  }
`

const Dot = styled.span`
  position: relative;

  ::before {
    content: '';
    background-color: white;
    position: absolute;
    width: 100%;
    height: 100%;
    animation: ${dot} 2s steps(3, end) infinite;
  }
`

function Loading() {
  return (
    <LoadingWrap>
      <LoadingRocket />
      <p>
        Loading<Dot>...</Dot>
      </p>
    </LoadingWrap>
  )
}

export default Loading

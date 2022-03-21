import React from 'react'
import styled, { css, keyframes } from 'styled-components'

const bounce = keyframes`
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
`

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const LoadingWrap = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
  margin: 0 auto;
  animation: ${spin} 2s linear infinite;
`

const StyledCircle = css`
  position: absolute;
  top: 0;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  animation: ${bounce} 2s ease-in-out infinite;
`

const Circle1 = styled.div`
  ${StyledCircle}
`

const Circle2 = styled.div`
  ${StyledCircle}
  top: auto;
  bottom: 0;
  animation-delay: -1s;
`

function Loading() {
  return (
    <LoadingWrap>
      <Circle1 />
      <Circle2 />
    </LoadingWrap>
  )
}

export default Loading

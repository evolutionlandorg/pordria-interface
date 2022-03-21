import React from 'react'
import styled from 'styled-components'

const StyledItem = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 128px 96px 96px 1fr 96px;
  align-items: center;
  margin-bottom: 1rem;
`

const Opts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const StyledButton = styled.button`
  font-size: 0.9rem;
  height: fit-content;
  text-align: center;
  padding: 0;
  border: 0.5px solid #838383;
  padding: 4px;
  border-radius: 8px;
  :not(:last-of-type) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right-color: transparent;
  }

  :not(:first-of-type) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  :hover {
    border-color: #333;
    background-color: rgba(51, 51, 51, 0.1);
  }
`

function EventItem() {
  return (
    <StyledItem>
      <span>Event 1</span>
      <span>2022/03/16</span>
      <span>2022/03/16</span>
      <span>www.medium.com/eeeeee</span>
      <Opts>
        <StyledButton type="button">Claim</StyledButton>
        <StyledButton type="button">List</StyledButton>
      </Opts>
    </StyledItem>
  )
}

export default EventItem

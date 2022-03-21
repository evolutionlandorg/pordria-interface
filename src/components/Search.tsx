import React from 'react'
import { SearchIcon } from '@primer/octicons-react'
import styled from 'styled-components'

const StyledSearch = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  width: fit-content;
`

const StyledInput = styled.input`
  background-color: transparent;
  border: 0.5px solid #838383;
  font-size: 14px;
  text-align: left;
  padding: 8px;
  padding-left: 1rem;
  padding-right: 2rem;
  width: 200px;
  border-radius: 8px;
`

const StyledButton = styled.button`
  height: 100%;
  width: 2rem;
  position: absolute;
  right: 0;

  ::before {
    content: '';
    height: 60%;
    border-left: 0.5px solid #838383;
    position: absolute;
    top: 20%;
    left: 0;
  }
`

function Search() {
  return (
    <StyledSearch>
      <StyledInput type="search" placeholder="Search by address" />
      <StyledButton type="button">
        <SearchIcon />
      </StyledButton>
    </StyledSearch>
  )
}

export default Search

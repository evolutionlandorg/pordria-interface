import React, { ChangeEventHandler } from 'react'
import styled from 'styled-components'
import { baseColor, computeSize, radius, size } from '@/styles/variables'

const StyledSearch = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  width: fit-content;
`

const StyledInput = styled.input`
  background-color: transparent;
  border: 1px solid ${baseColor.secondary};
  font-size: ${size.tn};
  text-align: left;
  padding: 8px;
  width: 100%;
  padding-left: 1rem;
  line-height: 1;
  padding-right: ${computeSize(70)};
  border-radius: ${radius.md};
  outline: none;

  ::placeholder {
    color: ${baseColor.secondary};
  }
`

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  height: 100%;
  min-width: ${size.tn};
  position: absolute;
  right: 0;
  padding: 0 ${computeSize(8)};
  font-size: ${size.sm};

  ::before {
    content: '';
    height: 60%;
    border-left: 1px solid ${baseColor.secondary};
    position: absolute;
    top: 20%;
    left: 0;
  }
`

interface ISearchProps {
  onSearch: (search?: string) => void
  onChange: ChangeEventHandler<HTMLInputElement>
  className?: string
  value?: string
}

const Search = ({ onChange, onSearch, className, value }: ISearchProps) => (
  <StyledSearch
    className={className}
    onSubmit={e => {
      e.preventDefault()
      onSearch(value)
    }}
  >
    <StyledInput
      type="search"
      placeholder="Enter the address you will claim for"
      onChange={onChange}
      value={value}
    />
    <StyledButton type="button" onClick={() => onSearch(value)}>
      confirm
    </StyledButton>
  </StyledSearch>
)

Search.defaultProps = {
  className: undefined,
  value: ''
}

export default Search

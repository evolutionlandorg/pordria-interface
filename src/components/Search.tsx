import React, {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  MouseEventHandler
} from 'react'
import styled from 'styled-components'
import { baseColor, computeSize, radius, size } from '@/styles/variables'
import { SearchIcon } from '@/components/Icon'

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
  padding-right: 2rem;
  border-radius: ${radius.md};
  outline: none;

  ::placeholder {
    color: ${baseColor.secondary};
  }
`

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  box-sizing: content-box;
  height: 100%;
  min-width: ${size.tn};
  position: absolute;
  right: 0;
  padding: 0 ${computeSize(8)};

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
  onSearch: MouseEventHandler<HTMLButtonElement>
  onChange: ChangeEventHandler<HTMLInputElement>
  onFocus: FocusEventHandler<HTMLInputElement>
  onBlur: FocusEventHandler<HTMLInputElement>
  className?: string
  value?: string
}

const Search: FC<ISearchProps> = ({
  onChange,
  onSearch,
  onFocus,
  onBlur,
  className,
  value
}) => (
  <StyledSearch className={className} onSubmit={e => e.preventDefault()}>
    <StyledInput
      type="search"
      placeholder="Search by address"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
    />
    <StyledButton type="button" onClick={onSearch}>
      <SearchIcon />
    </StyledButton>
  </StyledSearch>
)

Search.defaultProps = {
  className: undefined,
  value: ''
}

export default Search

import React, { FC, MouseEventHandler } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  font-size: 1rem;
  height: fit-content;
  text-align: center;
  padding: 0;
  border: 0.5px solid #838383;
  padding: 8px;
  border-radius: 8px;

  :hover {
    border-color: #333;
    background-color: rgba(51, 51, 51, 0.1);
  }
`

interface IButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

const Button: FC<IButtonProps> = ({ onClick, children }) => (
  <StyledButton type="button" onClick={onClick}>
    {children}
  </StyledButton>
)

Button.defaultProps = {
  onClick: undefined
}

export default Button

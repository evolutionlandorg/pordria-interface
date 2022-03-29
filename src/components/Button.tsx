import { radius, size } from '@/styles/variables'
import React, { FC, MouseEventHandler } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  font-size: ${size.tn};
  height: fit-content;
  text-align: center;
  padding: 0;
  border: 1px solid #7a7a7a;
  padding: 8px;
  border-radius: ${radius.md};
  box-sizing: border-box;
  font-weight: 600;

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

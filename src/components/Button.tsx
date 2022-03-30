import {
  baseColor,
  computeSize,
  radius,
  color,
  size,
  weight
} from '@/styles/variables'
import React, { FC, MouseEventHandler } from 'react'
import styled from 'styled-components'

interface IStyledButtonProps {
  width?: string
  large?: boolean
}
interface IButtonProps extends IStyledButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

const StyledButton = styled.button<IStyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${size.tn};
  height: fit-content;
  text-align: center;
  border: 1px solid ${baseColor.secondary};
  padding: ${({ large }) => {
    if (large) {
      return `${computeSize(8)} ${computeSize(40)}`
    }

    return computeSize(8)
  }};
  border-radius: ${radius.md};
  box-sizing: border-box;
  font-weight: ${weight.semiBold};
  width: ${({ width }) => width};

  :hover {
    border-color: ${baseColor.darkBlack};
    background-color: ${color.buttonHover};
  }

  :not(:last-of-type) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right-color: transparent;
  }

  :not(:first-of-type) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  @media screen and (max-width: 414px) {
    padding: ${computeSize(8)};
  }
`

const Button: FC<IButtonProps> = ({ onClick, children, ...styleProps }) => (
  <StyledButton {...styleProps} type="button" onClick={onClick}>
    {children}
  </StyledButton>
)

Button.defaultProps = {
  onClick: undefined,
  width: 'fit-content',
  large: false
}

export default Button

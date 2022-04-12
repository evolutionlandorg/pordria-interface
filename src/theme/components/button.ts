import { ComponentStyleConfig } from '@chakra-ui/react'

const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'button',
    color: 'white',
    _focus: {
      boxShadow: 'none'
    }
  },
  sizes: {
    sm: {
      h: '9'
    }
  },
  variants: {
    github: {
      bgColor: 'black'
    },
    text: {
      bgColor: 'transparent'
    },
    primary: {
      bgGradient: 'linear(270deg, gradient.buttonStart, gradient.buttonEnd)'
    }
  },
  defaultProps: {
    size: 'sm',
    variant: 'primary'
  }
}

export default Button

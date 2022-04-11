import { ComponentStyleConfig } from '@chakra-ui/react'

const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: '1.25rem',
    color: 'white'
  },
  variants: {
    github: {
      bgColor: 'black'
    },
    solid: {
      bgGradient: 'linear(270deg, #A45CFF, #77F7FF)',
      _hover: {
        bgGradient: 'linear(270deg, #A45CFF, #77F7FF)'
      },
      _active: {
        bgGradient: 'linear(270deg, #A45CFF, #77F7FF)'
      }
    }
  },
  defaultProps: {
    size: 'sm',
    variant: 'solid'
  }
}

export default Button

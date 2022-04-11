import { ComponentStyleConfig } from '@chakra-ui/react'

const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: '1.25rem',
    color: 'white'
  },
  sizes: {
    md: {
      fontSize: 'md',
      px: 6,
      py: 4
    }
  },
  variants: {
    github: {
      bgColor: 'black'
    }
  },
  defaultProps: {
    size: 'sm',
    variant: 'solid'
  }
}

export default Button

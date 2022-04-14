import { ComponentStyleConfig } from '@chakra-ui/react'

const Input: ComponentStyleConfig = {
  sizes: {
    md: {
      field: {
        borderRadius: 'primary'
      }
    },
    sm: {
      field: {
        borderRadius: 'primary'
      }
    }
  },
  variants: {
    outline: {
      field: {
        color: 'turquoise.900',
        fontWeight: 'black',
        borderColor: 'turquoise.800',
        _hover: {
          borderColor: 'turquoise.900'
        },
        _focus: {
          zIndex: 1,
          borderColor: 'turquoise.900',
          boxShadow: 'none'
        },
        '::placeholder': {
          color: 'turquoise.800',
          fontWeight: 'normal'
        }
      }
    }
  },
  defaultProps: {
    size: 'md',
    variant: 'outline'
  }
}

export default Input

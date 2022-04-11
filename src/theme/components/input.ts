import { ComponentStyleConfig } from '@chakra-ui/react'

const Input: ComponentStyleConfig = {
  baseStyle: {
    field: {}
  },
  sizes: {
    md: {
      field: {
        borderRadius: '1.25rem'
      }
    }
  },
  variants: {
    outline: {
      field: {
        color: 'turquoise.900',
        borderColor: 'turquoise.900',
        _hover: {
          borderColor: 'turquoise.900'
        },
        _focus: {
          zIndex: 1,
          borderColor: 'turquoise.900',
          boxShadow: `0 0 0 1px turquoise.900`
        },
        '::placeholder': {
          color: 'turquoise.900'
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

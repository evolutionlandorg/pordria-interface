import { ComponentStyleConfig } from '@chakra-ui/react'

const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'primary',
    color: 'white',
    _focus: {
      boxShadow: 'none'
    }
  },
  sizes: {
    sm: {
      h: '9'
    },
    '2xs': {
      h: '5',
      px: '1',
      fontSize: 'xs',
      w: 'fit-content'
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
      bgGradient: 'linear(to left, gradient.primaryStart, gradient.primaryEnd)',
      _hover: {
        _disabled: {
          bgGradient:
            'linear(to left, gradient.primaryStart, gradient.primaryEnd)'
        }
      }
    },
    'primary-outline': {
      color: 'purple.400',
      borderWidth: '1px',
      borderColor: 'transparent',
      bgClip: 'padding-box, border-box',
      backgroundOrigin: 'padding-box, border-box',
      bgGradient:
        'linear(to-l, white, white), linear-gradient(to left, gradient.primaryStart, gradient.primaryEnd)'
    }
  },
  defaultProps: {
    size: 'sm',
    variant: 'primary'
  }
}

export default Button

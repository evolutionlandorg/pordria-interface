import { ChakraTheme } from '@chakra-ui/react'

const styles: ChakraTheme['styles'] = {
  global: {
    'body::before': {
      content: '""',
      bgImage: '/bg.png',
      width: '100%',
      height: '100vh',
      zIndex: '-1',
      position: 'fixed'
    }
  }
}

export default styles

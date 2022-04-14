import { MAIN_BG_URL } from '@/config/routers'
import { ChakraTheme } from '@chakra-ui/react'

const styles: ChakraTheme['styles'] = {
  global: {
    'body::before': {
      content: '""',
      bgImage: MAIN_BG_URL,
      width: '100%',
      height: '100vh',
      zIndex: '-1',
      position: 'fixed'
    }
  }
}

export default styles

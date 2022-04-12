import { ComponentStyleConfig } from '@chakra-ui/react'

const Modal: ComponentStyleConfig = {
  baseStyle: {
    dialog: {
      borderRadius: 'primary'
    },
    header: {
      fontSize: 'lg'
    },
    overlay: {
      bg: 'blackAlpha.300'
    },
    closeButton: {
      _focus: {
        boxShadow: 'none'
      }
    }
  }
}

export default Modal

import { extendTheme } from '@chakra-ui/react'
import space from './foundations/space'
import colors from './foundations/colors'
import styles from './styles'
import Button from './components/button'

const theme = extendTheme({
  styles,
  space,
  colors,
  components: {
    Button
  }
})

export default theme

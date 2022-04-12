import { extendTheme } from '@chakra-ui/react'
import space from './foundations/space'
import colors from './foundations/colors'
import shadows from './foundations/shadows'
import radii from './foundations/radii'
import styles from './styles'
import Button from './components/button'
import Input from './components/input'

const breakpoints = {
  sm: '414px',
  lg: '960px',
  xl: '1200px'
}

const theme = extendTheme({
  styles,
  space,
  colors,
  shadows,
  breakpoints,
  radii,
  components: {
    Button,
    Input
  }
})

export default theme

const baseSize = 16
export const computeSize = (size: number) => `${size / baseSize}rem`
export const rgba = (hex: string, alpha: number = 1) => {
  const len = hex.length
  const isShort = len === 4
  if (!isShort && len !== 7) {
    return hex
  }
  const numbers = []
  for (let i = 1; i < len; i += 1) {
    const h = `0x${hex[i]}`
    if (!isShort) {
      i += 1
    }
    numbers.push(Number.parseInt(h + hex[i], 16))
  }

  return `rgba(${numbers.join(',')},${alpha})`
}

export const size = {
  base: baseSize,
  tn: computeSize(12),
  sm: computeSize(14),
  md: computeSize(16),
  lg: computeSize(18),
  xl: computeSize(20),
  h1: computeSize(48)
}

export const weight = {
  semiBold: 600,
  Bold: 700
}

export const radius = {
  md: '8px',
  lg: '10px',
  xl: '16px'
}

export const baseColor = {
  onPrimary: '#212121',
  primaryLight: '#fff',
  secondary: '#7a7a7a',
  black: '#000',
  darkBlack: '#333',
  green: '#00eb34',
  red: '#eb0000',
  blue: '#2172e5',
  gray: '#838383'
}

export const color = {
  backdrop: rgba(baseColor.black, 0.5),
  buttonHover: rgba(baseColor.darkBlack, 0.1),
  checkCircle: baseColor.green,
  XCircle: baseColor.red,
  headerBorder: '#cfcceb',
  notificationBg: '#4d5880',
  headerBgFilter: rgba(baseColor.primaryLight, 0.01),
  cardShadow: 'rgba(124, 255, 247, 0.25)',
  cardHoverShadow: 'rgba(153, 117, 255, 0.25)'
}

export const gradient = {
  card: `linear-gradient(
    to right,
    ${baseColor.primaryLight},
    ${baseColor.primaryLight}
  ),
  linear-gradient(270deg, #a8fbff, #81c2ff, #f9d0fa)`,

  cardHover: `linear-gradient(
    to right,
    ${baseColor.primaryLight},
    ${baseColor.primaryLight}
  ),
  linear-gradient(270deg, #12d6df, #db12df)`,

  background: `linear-gradient(
    285.42deg,
    rgba(133, 156, 234, 0.05) 1.17%,
    rgba(173, 255, 255, 0.1) 100.94%
  )`
}

const baseSize = 16
export const computeSize = (size: number) => `${size / baseSize}rem`

export const size = {
  base: baseSize,
  tn: computeSize(12),
  sm: computeSize(14),
  md: computeSize(16),
  lg: computeSize(18),
  xl: computeSize(20),
  h1: computeSize(48)
}

export const radius = {
  md: '8px',
  lg: '10px'
}

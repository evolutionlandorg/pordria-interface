import { createIcon, IconProps } from '@chakra-ui/icons'
import React from 'react'

const BaseCopyIcon = createIcon({
  displayName: 'BaseCopyIcon',
  viewBox: '0 0 16 16',
  defaultProps: {
    fill: 'none'
  },
  path: (
    <>
      <path
        d="M13.333 6h-6C6.597 6 6 6.597 6 7.333v6c0 .737.597 1.334 1.333 1.334h6c.737 0 1.334-.597 1.334-1.334v-6c0-.736-.597-1.333-1.334-1.333Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.333 10h-.666a1.333 1.333 0 0 1-1.333-1.333v-6a1.333 1.333 0 0 1 1.333-1.334h6A1.333 1.333 0 0 1 10 2.667v.666"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  )
})

const CopyIcon = ({ color, ...props }: IconProps) => (
  <BaseCopyIcon stroke={color} {...props} />
)

export default CopyIcon

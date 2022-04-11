import React from 'react'
import { createIcon } from '@chakra-ui/icons'

const LogoIcon = createIcon({
  displayName: 'LogoIcon',
  viewBox: '0 0 16 16',
  path: (
    <>
      <path
        fillRule="evenodd"
        d="M1.592 2.712 2.38 7.25h4.87a.75.75 0 1 1 0 1.5H2.38l-.788 4.538L13.929 8 1.592 2.712zM.989 8 .064 2.68a1.341 1.341 0 0 1 1.85-1.462l13.402 5.744a1.13 1.13 0 0 1 0 2.076L1.913 14.782a1.341 1.341 0 0 1-1.85-1.463L.99 8z"
        stroke="url(#a)"
      />
      <defs>
        <linearGradient
          id="a"
          x1=".713"
          y1="1.051"
          x2="14.863"
          y2="15.166"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#12D6DF" />
          <stop offset="1" stopColor="#DB12DF" />
        </linearGradient>
      </defs>
    </>
  )
})

export default LogoIcon

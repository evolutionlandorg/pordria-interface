import { Image, ImageProps } from '@chakra-ui/react'
import React from 'react'
import imgFallback from './img-fallback.png'

const ImgWithFb = (props: ImageProps) => (
  <Image fallbackSrc={imgFallback} {...props} />
)

export default ImgWithFb

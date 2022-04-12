import { Flex, Image } from '@chakra-ui/react'
import React from 'react'
import loading from '@/assets/loading.png'

function Loading() {
  return (
    <Flex direction="column" align="center" justify="center" pt="25">
      <Image src={loading} boxSize="16" />
    </Flex>
  )
}

export default Loading

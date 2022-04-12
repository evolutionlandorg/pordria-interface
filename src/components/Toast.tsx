import React from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  chakra,
  UseToastOptions
} from '@chakra-ui/react'

/**
 * TODO: global custom styles not supported by Chakra
 *       and need to implement a custom render to apply global styles
 */
const Toast = ({ title, id, status }: UseToastOptions) => {
  const alertTitleId =
    typeof id !== 'undefined' ? `toast-${id}-title` : undefined

  return (
    <Alert
      status={status}
      variant="solid"
      id={id?.toString()}
      alignItems="start"
      borderRadius="button"
      boxShadow="lg"
      paddingEnd={8}
      textAlign="start"
      width="auto"
      py="3px"
      fontSize="sm"
      aria-labelledby={alertTitleId}
    >
      <AlertIcon />
      <chakra.div flex="1" maxWidth="100%">
        {title && <AlertTitle id={alertTitleId}>{title}</AlertTitle>}
      </chakra.div>
    </Alert>
  )
}

export default Toast

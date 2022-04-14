import Toast from '@/components/Toast'
import { UseToastOptions, useToast as useChakraToast } from '@chakra-ui/react'
import React, { useCallback } from 'react'

function useToast() {
  const toast = useChakraToast({ position: 'bottom-end' })
  return useCallback(
    (props: UseToastOptions) => {
      const { id } = props

      const options: UseToastOptions = {
        ...props,
        render: () => <Toast {...props} />
      }

      if (id && toast.isActive(id)) {
        toast.update(id, options)
        return
      }

      toast(options)
    },
    [toast]
  )
}

export default useToast

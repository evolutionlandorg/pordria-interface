import { computeSize } from '@/styles/variables'
import React from 'react'
import { useToaster } from 'react-hot-toast'
import styled from 'styled-components'
import Notification from './Notification'

const Container = styled.div`
  position: fixed;
  top: ${computeSize(70)};
  right: ${computeSize(30)};
`

const Notifications = () => {
  const { toasts, handlers } = useToaster()
  const { startPause, endPause, calculateOffset, updateHeight } = handlers
  return (
    <Container onMouseEnter={startPause} onMouseLeave={endPause}>
      {toasts
        .filter(toast => toast.visible)
        .map(toast => {
          const offset = calculateOffset(toast, {
            reverseOrder: false
          })

          return (
            <Notification
              updateHeight={updateHeight}
              toastOffset={offset}
              {...toast}
              key={toast.id}
            >
              {toast.message}
            </Notification>
          )
        })}
    </Container>
  )
}

export default Notifications

import { color, baseColor, computeSize, radius, size } from '@/styles/variables'
import React, { FC } from 'react'
import toast, { Toast, ToastType } from 'react-hot-toast'
import styled, { css } from 'styled-components'
import { CheckCircleFillIcon, XCircleFillIcon, XIcon } from '@/components/Icon'

interface INotificationContainerProps {
  $offset: number
  $visible: boolean
}

const Container = styled.div<INotificationContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  gap: ${computeSize(6)};
  max-width: ${computeSize(250)};
  padding: ${computeSize(8)} ${computeSize(10)};
  font: ${size.tn};
  background-color: ${color.notificationBg};
  color: ${baseColor.primaryLight};
  border-radius: ${radius.xl};
  position: absolute;
  transition: all 0.5s ease-out;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translate(-100%, ${({ $offset }) => $offset}px);
`
const icon = css`
  align-self: flex-start;
  max-width: ${size.md};
  min-width: ${size.md};
  background-color: ${baseColor.primaryLight};
  border-radius: 50%;
`

const X = styled(XIcon)`
  ${icon}
  background-color: transparent;
  fill: ${baseColor.primaryLight};
`
const CheckCircleFill = styled(CheckCircleFillIcon)`
  ${icon}
  fill: ${color.checkCircle};
`

const XCircleFill = styled(XCircleFillIcon)`
  ${icon}
  fill: ${color.XCircle};
`

const Text = styled.span`
  line-height: 1;
  max-width: ${computeSize(192)};
  width: ${computeSize(192)};
  word-wrap: break-word;
  white-space: pre-wrap;
`

function getIcon(type: ToastType) {
  let res: JSX.Element
  switch (type) {
    case 'error':
      res = <XCircleFill />
      break
    case 'success':
    default:
      res = <CheckCircleFill />
      break
  }

  return res
}

type NotificationProps = {
  toastOffset: number
  updateHeight: (toastId: string, height: number) => void
} & Toast

const Notification: FC<NotificationProps> = ({
  children,
  type,
  toastOffset,
  updateHeight,
  height,
  id,
  visible
}) => {
  const refHandler = (el: HTMLDivElement | null) => {
    if (el && !height) {
      const { height: h } = el.getBoundingClientRect()
      updateHeight(id, h)
    }
  }
  return (
    <Container
      ref={refHandler}
      $offset={toastOffset}
      $visible={visible}
      onClick={() => toast.dismiss(id)}
    >
      {getIcon(type)}
      <Text>{children}</Text>
      <X />
    </Container>
  )
}
export default Notification

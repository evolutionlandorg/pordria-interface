import React, {
  DetailedHTMLProps,
  FC,
  ImgHTMLAttributes,
  useEffect,
  useState
} from 'react'
import { ImgFallbackIcon } from '@/components/Icon'
import { baseColor, computeSize } from '@/styles/variables'
import styled, { css } from 'styled-components'

interface IImageProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {}

const imgCommon = css<IImageProps>`
  min-width: ${({ width }) => width || computeSize(64)};
  max-width: ${({ width }) => width || computeSize(64)};
  fill: ${baseColor.onPrimary};
`

const ImgFallback = styled(ImgFallbackIcon)`
  ${imgCommon}
`

const ImgRoot = styled.img<IImageProps>`
  ${imgCommon}
`

const Img: FC<IImageProps> = ({ ref, ...props }) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const { src } = props

  useEffect(() => {
    const image = new Image()

    image.addEventListener('error', () => {
      setError(true)
      setLoading(false)
    })
    image.addEventListener('load', () => {
      setError(false)
      setLoading(false)
    })

    if (!src) {
      setError(true)
      return
    }

    image.src = src
    setLoading(true)
  }, [src])

  if (loading || error) {
    return <ImgFallback />
  }

  return <ImgRoot {...props} />
}

export default Img

import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

interface IFetchErrorConstructor {
  code: number
  message: string
}

class FetchError extends Error {
  code: number

  constructor({ code, message }: IFetchErrorConstructor) {
    super()
    this.code = code
    this.message = message
  }
}

const useFetch = () => {
  const [isLoading, setStatus] = useState(true)

  const fetchData = useCallback(
    async <T>(url: string): Promise<T | undefined> => {
      setStatus(true)
      let res
      try {
        const response = await fetch(url)
        const { ok, status, statusText } = response
        if (!ok) {
          throw new FetchError({
            code: status,
            message: statusText
          })
        }
        res = await response.json()
      } catch (e) {
        if (e instanceof Error) {
          toast.error(e.message)
        }
      }

      setStatus(false)
      return res
    },
    []
  )

  return { isLoading, fetchData }
}

export default useFetch

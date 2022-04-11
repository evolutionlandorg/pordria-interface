import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

interface IFetchErrorConstructor {
  code: number
  message: string
}

interface FetchInit extends RequestInit {
  catchError?: (e: Error) => void
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
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchData = useCallback(
    async <T>(url: RequestInfo, init?: FetchInit): Promise<T | undefined> => {
      setIsLoading(true)
      setIsError(false)
      let res
      try {
        const response = await fetch(url, init)
        const { ok, status, statusText } = response
        if (!ok) {
          throw new FetchError({
            code: status,
            message: statusText
          })
        }
        res = await response.json()
      } catch (e) {
        // TODO: add fetch error statusText
        if (e instanceof Error) {
          const catchError = init?.catchError
          if (catchError) {
            catchError(e)
          } else {
            toast.error(e.message || 'Error')
          }
        }
        setIsError(true)
      }

      setIsLoading(false)
      return res
    },
    []
  )

  return { isLoading, isError, fetchData }
}

export default useFetch

import { useCallback, useEffect, useMemo, useState } from 'react'
import useFetch from '@/hooks/useFetch'

export interface IEventItem {
  chainId: number
  address: string
  name: string
  detail: string
  logoURI: string
  proofURI: string
}

export interface IEventList {
  name: string
  timestamp: string
  version: { major: number; minor: number; patch: number }
  logoURI: string
  events: IEventItem[]
}

export interface IRenderItem {
  list: IEventList | null
  loading?: boolean
  error?: boolean
}

interface IRenderList {
  [key: string]: IRenderItem
}

export function getUrl(listID: string): string {
  if (/^http(s)?:\/\//.test(listID)) {
    return listID
  }
  if (listID.endsWith('.eth')) {
    return `https://wispy-bird-88a7.uniswap.workers.dev/?url=${`http://${listID}.link`}`
  }

  return ''
}

const useFetchEventList = (projectsID: string[]) => {
  const { fetchData } = useFetch()
  const [renderList, setRenderList] = useState<IRenderList>({})

  const fetchEventList = useCallback(async () => {
    if (projectsID && projectsID.length > 0) {
      projectsID.forEach(projectID => {
        fetchData<IEventList>(getUrl(projectID)).then(eventList => {
          setRenderList(list => ({
            ...list,
            [projectID]: {
              list: eventList || null,
              error: eventList === undefined
            }
          }))
        })
      })
    }
  }, [projectsID, fetchData])

  useEffect(() => {
    fetchEventList()
  }, [fetchEventList])

  return useMemo((): IRenderList => {
    const result: IRenderList = { ...renderList }
    projectsID.forEach(projectID => {
      const { list, error } = renderList[projectID] || {}
      result[projectID] = {
        list,
        loading: list === undefined,
        error
      }
    })
    // setRenderList(result)
    return result
  }, [projectsID, renderList])
}

export default useFetchEventList

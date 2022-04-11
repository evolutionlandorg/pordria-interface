import { useCallback, useEffect, useMemo, useState } from 'react'
import useFetch from '@/hooks/useFetch'
import { createDataArrayClaim, getRoot } from '@/utils/merkle-tree'

export interface IProjectDetail {
  name?: string
  timestamp?: string
  version?: { major: number; minor: number; patch: number }
  logoURI?: string
  events?: EventItem[]
}

export interface IRenderItem {
  projectDetail: IProjectDetail | null
  loading?: boolean
  error?: boolean
}

interface IRenderList {
  [key: string]: IRenderItem
}

export function getUrl(projectID: string): string {
  if (/^http(s)?:\/\//.test(projectID)) {
    return projectID
  }
  if (projectID.endsWith('.eth')) {
    return `https://wispy-bird-88a7.uniswap.workers.dev/?url=${`http://${projectID}.link`}`
  }

  return ''
}

const useFetchEventList = (
  projectsID: string[],
  isClaimsIncluded?: boolean
) => {
  const { fetchData } = useFetch()
  const [renderList, setRenderList] = useState<IRenderList>({})

  const fetchEventList = useCallback(() => {
    if (projectsID && projectsID.length > 0) {
      projectsID.forEach(projectID => {
        fetchData<IProjectDetail>(getUrl(projectID), { catchError: () => {} })
          .then(async eventList => {
            if (isClaimsIncluded && eventList) {
              const { events = [] } = eventList

              const fetchQueue = []

              for (const event of events) {
                fetchQueue.push(fetchData<IClaim[]>(event.proofURI))
              }

              const results = await Promise.allSettled(fetchQueue)
              results.forEach((settled, i) => {
                if (settled.status === 'fulfilled' && settled.value) {
                  const claims = settled.value
                  events[i].root = getRoot(createDataArrayClaim(claims)).hash
                  events[i].claims = claims
                }
              })
            }

            return eventList
          })
          .then(eventList => {
            setRenderList(list => ({
              ...list,
              [projectID]: {
                projectDetail: eventList || null,
                error: eventList === undefined
              }
            }))
          })
      })
    }
  }, [projectsID, fetchData, isClaimsIncluded])

  useEffect(() => {
    fetchEventList()
  }, [fetchEventList])

  return useMemo((): IRenderList => {
    const result: IRenderList = { ...renderList }
    projectsID.forEach(projectID => {
      const { projectDetail: list, error } = renderList[projectID] || {}
      result[projectID] = {
        projectDetail: list,
        loading: list === undefined,
        error
      }
    })

    return result
  }, [projectsID, renderList])
}

export default useFetchEventList

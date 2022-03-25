import { LocalKeyEnum } from '@/config/db'
import { useState } from 'react'
import useFetch from '@/hooks/useFetch'

interface IProjects {
  [key: string]: {
    name: string
    homepage: string
  }
}

export default function useProjects() {
  const { fetchData } = useFetch()
  const [projectIDPartialList, setProjectIDPartialList] = useState<
    Array<string>
  >([])
  const [projects, setProjects] = useState<IProjects>(() => {
    const cache = localStorage.getItem(LocalKeyEnum.AIRDROP_PROJECTS) || ''
    let res
    try {
      res = JSON.parse(cache)
      setProjectIDPartialList(Object.keys(res))
    } catch (error) {
      res = {}
    }

    return res
  })

  const addProjects = async (url: string) => {
    const newProjects = await fetchData<IProjects>(url)

    if (!newProjects) {
      return
    }

    setProjectIDPartialList(Object.keys(newProjects))
    const updatedProjects = {
      ...projects,
      ...newProjects
    }

    localStorage.setItem(
      LocalKeyEnum.AIRDROP_PROJECTS,
      JSON.stringify(updatedProjects)
    )

    setProjects(updatedProjects)
  }

  return { projectIDPartialList, addProjects, projects }
}

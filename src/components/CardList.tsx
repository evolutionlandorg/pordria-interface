import React, { useState } from 'react'
import styled from 'styled-components'
import Card from '@/components/Card'
import { PROJECT_DETAIL } from '@/config/routers'
import { LocalKeys } from '@/config/db'
import useFetch from '@/hooks/useFetch'
import useFetchEventList from '@/hooks/useFetchEventList'
import Button from './Button'

const CardWrapper = styled.div`
  padding: 5rem 0 6rem 0;
  display: grid;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 45rem;
  min-width: 45rem;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 960px) {
    max-width: initial;
    min-width: initial;
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 414px) {
    display: flex;
    flex-wrap: wrap;
    max-width: initial;
    min-width: initial;
    grid-template-columns: 1fr;
  }
`

const StyledAllLists = styled.section`
  min-height: 80vh;
  width: 100%;
  padding: 5rem 0 6rem 0;
  display: grid;
  gap: 24px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: fit-content;
  @media screen and (max-width: 960px) {
    padding: 0;
    align-items: flex-start;
  }
`

const AddList = styled.div`
  border-bottom: 0.5px solid #838383;
  display: inline-flex;
  padding: 8px;
`
const ListAddress = styled.input`
  border: none;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  display: block;
  flex: 1;
  font-size: 1rem;
`

interface IProjects {
  [key: string]: {
    name: string
    homepage: string
  }
}

function CardList() {
  const [url, setUrl] = useState('')
  const [projectsID, setProjectsID] = useState<string[]>([])
  const [cacheProjects, setCacheProjects] = useState<IProjects>(() => {
    const cache = localStorage.getItem(LocalKeys.AIRDROP_PROJECTS) || ''
    let res
    try {
      res = JSON.parse(cache)
      setProjectsID(Object.keys(res))
    } catch (error) {
      res = {}
    }

    return res
  })
  const { fetchData } = useFetch()
  const list = useFetchEventList(projectsID)

  const updateCacheProjects = async () => {
    const newProjects = await fetchData<IProjects>(url)
    if (newProjects) {
      setProjectsID(Object.keys(newProjects))
    }
    const updateProjects = {
      ...cacheProjects,
      ...newProjects
    }

    localStorage.setItem(
      LocalKeys.AIRDROP_PROJECTS,
      JSON.stringify(updateProjects)
    )

    setCacheProjects(updateProjects)
  }

  const getRender = (): JSX.Element[] => {
    const r: JSX.Element[] = []
    Object.keys(list).forEach(k => {
      const { loading, error } = list[k]
      console.warn(list[k])
      if (!loading && !error) {
        r.push(<Card key={k} to={PROJECT_DETAIL} id={k} item={list[k]} />)
      }
    })

    return r
  }

  return (
    <StyledAllLists>
      <CardWrapper>{getRender()}</CardWrapper>
      <AddList>
        <ListAddress
          placeholder="Address"
          type="text"
          onChange={e => setUrl(e.target.value)}
        />
        <Button onClick={updateCacheProjects}>+ add a list</Button>
      </AddList>
    </StyledAllLists>
  )
}

export default CardList

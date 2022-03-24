import React, { useState } from 'react'
import styled from 'styled-components'
import { PROJECT_DETAIL } from '@/config/routers'
import useFetchEventList from '@/hooks/useFetchEventList'
import Button from '@/components/Button'
import useProjects from '@/hooks/useProjects'
import Card from './Card'

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

function CardList() {
  const [url, setUrl] = useState('')
  const { projectIDPartialList, addProjects, projects } = useProjects()

  const projectDetailList = useFetchEventList(projectIDPartialList)

  const getRender = (): JSX.Element[] => {
    const r: JSX.Element[] = []
    Object.keys(projectDetailList).forEach(k => {
      const { loading, error, projectDetail } = projectDetailList[k]
      const { name } = projects[k]
      if (!loading && !error) {
        r.push(
          <Card
            key={k}
            to={PROJECT_DETAIL}
            id={k}
            item={{
              projectDetail: projectDetail || {
                name
              },
              loading,
              error
            }}
          />
        )
      }
    })

    return r
  }

  const addProjectsHandler = () => {
    setUrl('')
    addProjects(url)
  }

  return (
    <StyledAllLists>
      <CardWrapper>{getRender()}</CardWrapper>
      <AddList>
        <ListAddress
          placeholder="Address"
          type="text"
          onChange={e => setUrl(e.target.value)}
          value={url}
        />
        <Button onClick={addProjectsHandler}>+ add a list</Button>
      </AddList>
    </StyledAllLists>
  )
}

export default CardList

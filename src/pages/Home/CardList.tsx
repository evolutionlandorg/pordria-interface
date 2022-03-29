import React, { useState } from 'react'
import styled from 'styled-components'
import { PROJECT_DETAIL } from '@/config/routers'
import useFetchEventList from '@/hooks/useFetchEventList'
import Button from '@/components/Button'
import useProjects from '@/hooks/useProjects'
import { computeSize, size } from '@/styles/variables'
import Card from './Card'

const StyledAllLists = styled.section`
  min-height: 80vh;
  height: fit-content;
  width: 100%;
  padding: ${computeSize(70)} 0 ${computeSize(84)} 0;
  display: grid;
  gap: 24px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  @media screen and (max-width: 960px) {
    padding: 0;
    align-items: flex-start;
  }
`

const CardWrapper = styled.div`
  padding-bottom: ${computeSize(75)};
  display: grid;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: ${computeSize(600)};
  min-width: ${computeSize(600)};
  grid-gap: ${computeSize(30)};
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 960px) {
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
  font-size: ${size.sm};
  background-color: transparent;
  font-weight: 600;

  ::placeholder {
    color: #7a7a7a;
  }
`

function CardList() {
  const [url, setUrl] = useState('')
  const { projectIDPartialList, addProjects, projects } = useProjects()

  const projectDetailList = useFetchEventList(projectIDPartialList)

  const getRender = (): JSX.Element[] => {
    const r: JSX.Element[] = []
    Object.keys(projectDetailList).forEach(k => {
      const { loading, error, projectDetail } = projectDetailList[k]
      if (!loading && !error) {
        r.push(
          <Card
            key={k}
            to={PROJECT_DETAIL}
            id={k}
            item={{
              projectDetail: {
                ...projects[k],
                ...projectDetail
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
    addProjects(url)
    setUrl('')
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

import React, { useState } from 'react'
import { PROJECT_DETAIL } from '@/config/routers'
import useFetchEventList from '@/hooks/useFetchEventList'
import useProjects from '@/hooks/useProjects'
import { PlusIcon } from '@/components/Icon'
import {
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  VStack,
  Button
} from '@chakra-ui/react'
import Card from './Card'

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
                ...projectDetail,
                ...projects[k]
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
  const addProjectsHandler = async () => {
    if (!url) {
      return
    }
    await addProjects(url)
    setUrl('')
  }

  return (
    <VStack
      spacing="6"
      minH="80vh"
      height="fit-content"
      w="full"
      pb={{ base: 0, lg: '20' }}
      align={{ base: 'center', lg: 'flex-start' }}
    >
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3 }}
        spacing="7.5"
        maxW={{ base: 'initial', lg: '37.5rem' }}
        minW={{ base: 'initial', lg: '37.5rem' }}
        py="25"
      >
        {getRender()}
      </SimpleGrid>

      <InputGroup>
        <Input
          pr="4.5rem"
          placeholder="Address"
          onChange={e => setUrl(e.target.value)}
          value={url}
        />
        <InputRightElement w="fit-content">
          <Button h="full" leftIcon={<PlusIcon />} onClick={addProjectsHandler}>
            add a list
          </Button>
        </InputRightElement>
      </InputGroup>
    </VStack>
  )
}

export default CardList

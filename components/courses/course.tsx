import { Flex, Box, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import Container from '../Container'
import SEO from '../SEO'

import CourseHeader from './CourseHeader'
import Sidebar from './Sidebar'

interface Props {
  children: React.ReactNode
  frontMatter: any
}

export default function Layout({ children, frontMatter }: Props) {
  const router = useRouter()
  const slug = router.asPath

  return (
    <Container selected="course">
      <SEO url={`https://www.coffeeclass.io${slug}`} {...frontMatter} />

      <div className="border-b">
        <CourseHeader title={frontMatter?.title} course={router.query.course} />
      </div>

      <Flex>
        <Flex
          minH="100vh"
          display={['none', 'none', 'none', 'none', 'none', 'flex']}
          bgColor={useColorModeValue('rgb(247, 246, 243)', 'gray.700')}
        >
          <div>
            <Box w={300} overflow="scroll" pos="sticky" top={0}>
              <Sidebar course={router.query.course} />
            </Box>
          </div>
        </Flex>

        <Flex flexDir="column" mx="auto" w="100%">
          {/* <div className="border-b">
            <CourseHeader title={frontMatter?.title} course={router.query.course} />
          </div> */}

          <Box maxW={900} mx="auto" w="100%" overflowX="scroll" px={4} mt={10}>
            {children}
          </Box>
        </Flex>

        {/* <Flex minH="100vh" display={['none', 'none', 'none', 'none', 'none', 'flex']}>
                    <div>
                        <Box w={200} overflow="scroll" pos="sticky" top={10}>
                            <HeaderSidebar headers={frontMatter.headers} />
                        </Box>
                    </div>
                </Flex> */}
      </Flex>
    </Container>
  )
}

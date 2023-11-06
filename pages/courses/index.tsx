import { Heading, Flex, Stack, Box, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'

import Container from '@/components/Container'
import CourseCard from '@/components/courses/CourseCard'
import { COURSE_PATH, getCourseFolders } from '@/lib/scripts/mdx-utils'

import courses from '../../configs/courses.json'

const url = 'https://www.coffeeclass.io/courses'
const title = 'Courses'
const description =
  'Learn programming languages and frameworks through our easy to follow, interactive courses.'

export default function Index(coursesList: any) {
  const data = courses.routes

  return (
    <Container title={title} description={description} url={url} selected="course">
      <Flex flexDir="column" px={[2, 2, 2, 6, 10, 12]}>
        <Text
          as="small"
          textTransform="uppercase"
          mt={8}
          mb={1}
          fontFamily="lato"
          color={useColorModeValue('gray.600', 'gray.400')}
          fontSize="sm"
        >
          {coursesList.coursesList.length} courses
        </Text>
        <Heading
          as="h1"
          size="2xl"
          fontFamily="lato"
          mb={2}
          fontWeight="medium"
          color={useColorModeValue('gray.800', 'gray.300')}
        >
          Courses
        </Heading>
        <SimpleGrid minChildWidth={['100%', '100%', '100%', '100%', '400px', '400px']} gap={4}>
          {data.map((course: any, index: number) => {
            return <CourseCard course={course} key={index} />
          })}
        </SimpleGrid>
      </Flex>
    </Container>
  )
}

export function getStaticProps() {
  // gets a string array of all folders in the courses folder. These are the courses
  let coursesList = getCourseFolders(COURSE_PATH)

  return { props: { coursesList } }
}

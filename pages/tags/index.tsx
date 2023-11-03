import { Heading, Flex, Link, Box, Text } from '@chakra-ui/react'
import matter from 'gray-matter'
import NextLink from 'next/link'

import fs from 'fs'
import path from 'path'

import Container from '@/components/Container'
import { tagsFilePaths, TAGS_PATH } from '@/lib/scripts/mdx-utils'

const url = `https://www.coffeeclass.io/tags/`
const title = 'Tags'
const description = `All tags on coffeeclass.io.`

export default function Index({ tags }: any) {
  return (
    <Container title={title} description={description} url={url}>
      <Heading px={4} mt={4} as="h1" size="2xl" color="brand_one.500">
        Tags 🏷️
      </Heading>
      <Box mx={4} bgColor="brand_one.500" h={2} w={150} borderRadius={5} mb={12} mt={2} />
      <Flex wrap="wrap" justify="center">
        {tags.map((tag: any, index: number) => {
          return (
            <Link
              key={index}
              as={NextLink}
              href={`/tags/${tag.data.title}`}
              _hover={{
                textDecor: 'none',
                opacity: '.8',
                transform: 'scale(1.1)'
              }}
            >
              <Flex
                mr={2}
                mb={2}
                w="100px"
                h="100px"
                align="center"
                justify="center"
                borderRadius="50%"
                bgColor="brand_one.500"
              >
                <Text fontSize="sm" textAlign="center">
                  #{tag.data.title}
                </Text>
              </Flex>
            </Link>
          )
        })}
      </Flex>
    </Container>
  )
}

export function getStaticProps() {
  const tags = tagsFilePaths.map(filePath => {
    const source = fs.readFileSync(path.join(TAGS_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath
    }
  })

  return { props: { tags } }
}

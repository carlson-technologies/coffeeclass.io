import { Text, Link, Box, Flex, Avatar, Divider } from '@chakra-ui/react'
import useSWR from 'swr'

import fetcher from '@/lib/scripts/fetcher'

type Props = {
  author: string
  course: string
}

export default function AuthorCard({ author, course }: Props) {
  const { data }: any = useSWR(`/api/getAuthor?authorSlug=${author.replace('.mdx', '')}`, fetcher)
  return (
    <>
      <Divider my={8} />
      <Flex align="center">
        <Avatar
          src={`/authors/${data?.data?.data?.image}`}
          size="lg"
          mr={2}
          name={`Image of ${data?.data?.data?.name}`}
        />
        <Box>
          <Text fontSize="sm" color="gray.600">
            This course on {course} is created by
          </Text>
          <Text fontWeight="bold" fontSize="xl">
            {data?.data?.data?.name}
          </Text>
          <Text color="gray.600">{data?.data?.content}</Text>
        </Box>
      </Flex>
      <Divider mt={8} />
    </>
  )
}

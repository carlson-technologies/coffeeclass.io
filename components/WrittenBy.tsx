import { Text, Link, Flex, Avatar, useColorMode } from '@chakra-ui/react'
import useSWR from 'swr'

import fetcher from '@/lib/scripts/fetcher'

interface Props {
  frontMatter: any
}

export default function WrittenBy({ frontMatter }: Props) {
  const { colorMode } = useColorMode()
  const color = {
    light: 'gray.600',
    dark: 'gray.500'
  }

  const { data, error }: any = useSWR(
    `/api/getAuthor?authorSlug=${frontMatter.author.replace('.mdx', '')}`,
    fetcher
  )

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    if (data) console.log(data)
    // eslint-disable-next-line no-console
    if (error) console.log(error)
  }

  if (error) return <Text>Failed to load author data!</Text>

  if (!data) return <Text>Loading author data...</Text>

  return (
    <>
      <Avatar src={`/authors/${data.data.data.image}`} size="xl" mb={2} />
      <Flex flexDir="column" align="center" px={4} textAlign="center">
        {data.data.data.links?.twitter ? (
          <Text>
            Written By{' '}
            <Link textDecor="underline" href={data.data.data.links.twitter} isExternal>
              {data.data.data.name}
            </Link>
          </Text>
        ) : (
          <Text>Written By {data.data.data.name}</Text>
        )}
        <Text color={color[colorMode]}>{data.data.content}</Text>
        <Text mt={4}>
          <Link href={`/authors/${frontMatter.author.replace('.mdx', '')}`} fontWeight="bold">
            More Articles By {data.data.data.name}
          </Link>
        </Text>
      </Flex>
    </>
  )
}

import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Flex,
  Box,
  Text,
  AspectRatio,
  Skeleton,
  useColorModeValue,
  Link,
  Icon,
  Avatar
} from '@chakra-ui/react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import Router from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'

import fetcher from '@/lib/scripts/fetcher'
import TimeAgo from '@/lib/scripts/time-ago'

type Props = {
  article: any
}

export default function Card({ article }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [margin, setMargin] = useState(0)
  const color = useColorModeValue('gray.500', 'gray.400')
  const color1 = useColorModeValue('gray.700', 'gray.300')

  const { data, error }: any = useSWR(
    `/api/getAuthor?authorSlug=${article.data.author.replace('.mdx', '')}`,
    fetcher
  )

  return (
    <Link
      as={NextLink}
      className="gradient"
      href={`/articles/${article.filePath.replace('.mdx', '')}`}
      _hover={{
        textDecor: 'none'
      }}
      my={2}
      mr={[0, 0, 0, 0, 0, 2]}
      borderRadius={15}
      onMouseEnter={() => setMargin(1)}
      onMouseLeave={() => setMargin(0)}
    >
      <Flex borderRadius={15}>
        <Box p={4} borderRadius={5}>
          <Box w={50} h={50} my={2} mx="auto">
            <AspectRatio ratio={1}>
              <Skeleton isLoaded={loaded}>
                <NextImage
                  src={`/logos/${article.data.logoImage}`}
                  alt={article?.data?.logoImage}
                  layout="fill"
                  onLoad={() => setLoaded(true)}
                />
              </Skeleton>
            </AspectRatio>
          </Box>
        </Box>
        <Flex h="100%" w="100%" p={[0, 0, 0, 2, 4, 5]} flexDir="column" maxW={1000}>
          <div className="align-center flex items-center">
            <Avatar
              size="sm"
              name={data?.data?.data?.name}
              src={`/authors/${data?.data?.data?.image}`}
              mr={2}
            />
            <div className="text-lg flex space-x-2">
              <p
                onClick={(ev: any) => {
                  ev.preventDefault()
                  Router.push(`/authors/${article.data.author.replace('.mdx', '')}`)
                }}
                className="text-blue-500 hover:underline"
              >
                {data?.data?.data?.name}
              </p>
              <p className="text-gray-500">shared</p>
            </div>
          </div>
          <h2 className="text-3xl font-recursive font-medium mt-1 mb-2 text-gray-800 dark:text-gray-300">
            {article.data.title}
          </h2>
          <div>
            <Text as="span" color={color} fontSize="lg" fontStyle="italic">
              {TimeAgo(new Date(article.data.publishedAt))}
            </Text>{' '}
            <Text as="span" color="gray">
              &middot;
            </Text>{' '}
            <Text as="span" color={color1} fontSize="xl">
              {article.data.description}
            </Text>
            <Flex align="center" mt={4} textDecor="underline" color="blue.500">
              <Text>Read More</Text>
              <Icon
                as={ChevronRightIcon}
                fontSize="24px"
                ml={margin}
                transition=".3s margin ease-out"
              />
            </Flex>
          </div>
        </Flex>
      </Flex>
    </Link>
  )
}

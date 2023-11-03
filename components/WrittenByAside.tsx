import { Text, Link, Flex, Avatar, useColorMode } from '@chakra-ui/react'
import useSWR from 'swr'

import fetcher from '@/lib/scripts/fetcher'

interface Props {
  frontMatter: any
}

export default function WrittenByAside({ frontMatter }: Props) {
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

  if (error) return <></>

  if (!data) return <></>

  return (
    <div className="flex flex-col items-start space-y-2 mb-4 px-4">
      <div className="bg-brand_one-500 p-2 rounded mb-2">
        <Avatar src={`/authors/${data.data.data.image}`} size="2xl" borderRadius={5} />
      </div>
      <Flex flexDir="column">
        <p className="font-bold text-lg text-gray-700 dark:text-gray-400">
          About {data.data.data.name}
        </p>
        <p className="font-semibold text-gray-600 dark:text-gray-500">{data.data.content}</p>
      </Flex>
    </div>
  )
}

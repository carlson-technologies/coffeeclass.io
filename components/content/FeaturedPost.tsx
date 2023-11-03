import { Box, useColorModeValue, Heading, Text, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

interface Props {
  title: string
  url: string
  views: number
  date: string
  children: React.ReactNode
}

const FeaturedPost = ({ title, url, views, date, children }: Props) => {
  return (
    <Link as={NextLink} href={url}>
      <Box p={5} borderRadius={5} bgColor={useColorModeValue('gray.100', 'gray.700')}>
        <Flex
          justify="space-between"
          flexDir={['column', 'column', 'column', 'column', 'row', 'row']}
        >
          <Heading as="h3" size="md" mb={2}>
            {title}
          </Heading>
          <Text color="gray.500">
            {views} views / shared on {date}
          </Text>
        </Flex>
        <Text fontSize="lg">{children}</Text>
      </Box>
    </Link>
  )
}

export default FeaturedPost

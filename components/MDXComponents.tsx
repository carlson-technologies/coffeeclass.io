import {
  Heading,
  Text,
  Code,
  UnorderedList,
  ListItem,
  useColorMode,
  Link,
  Box,
  OrderedList,
  Alert,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
  useColorModeValue
} from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useState } from 'react'

import FeaturedPost from './content/FeaturedPost'
import FloatUpDivAnimation from './content/FloatUpDivAnimation'
import FloatUpDivAnimationNoHeight from './content/FloatUpDivAnimationNoHeight'
import Step from './content/Step'
import ThreeDots from './content/ThreeDots'
import AuthorCard from './courses/AuthorCard'
import DefinitionPopup from './courses/DefinitionPopup'
import EmbeddedVideo from './EmbeddedVideo'

const Quote = (props: any) => {
  const { colorMode } = useColorMode()
  const bgColor = {
    light: 'brand_three.200',
    dark: 'brand_three.800'
  }

  return (
    <Alert
      my={10}
      w={['100%', '100%', '100%', '90%', '90%', '80%']}
      bg={bgColor[colorMode]}
      variant="left-accent"
      status="info"
      py={1}
      borderLeftColor="brand_three.500"
      borderRadius={5}
      {...props}
    />
  )
}

const CustomLink = (props: any) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Box
        _hover={{ borderBottomColor: 'blue.500' }}
        as="span"
        borderBottom="2px solid"
        borderBottomColor="transparent"
        transition="border-bottom-color .2s ease-in-out"
      >
        <Link _hover={{ TextDecoder: 'none' }} color="blue.500" {...props} as={NextLink} />
      </Box>
    )
  }

  return (
    <Box
      _hover={{ borderBottomColor: 'blue.500' }}
      as="span"
      borderBottom="2px solid"
      borderBottomColor="transparent"
      transition="border-bottom-color .2s ease-in-out"
    >
      <Link _hover={{ TextDecoder: 'none' }} color="blue.500" isExternal {...props} />
    </Box>
  )
}

const CustomListItem = (props: any) => {
  const { colorMode } = useColorMode()
  const color = {
    light: 'gray.800',
    dark: 'gray.200'
  }
  return (
    <ListItem
      my={2}
      fontSize="lg"
      key={props.children}
      color={color[colorMode]}
      listStylePos="inside"
    >
      {props.children}
    </ListItem>
  )
}

const DocsHeading = (props: any) => {
  const { colorMode } = useColorMode()
  const color = {
    light: 'gray.800',
    dark: 'gray.200'
  }
  return (
    <Heading
      fontWeight="bold"
      fontFamily="Recursive"
      id={props.children}
      color={color[colorMode]}
      {...props}
    />
  )
}

const CustomP = (props: any) => {
  const { colorMode } = useColorMode()
  const color = {
    light: 'gray.700',
    dark: 'gray.300'
  }
  return <Text fontSize="1.2em" my={4} color={color[colorMode]} {...props} />
}

const CustomCode = (props: any) => {
  return (
    <Code
      fontSize="0.84em"
      overflowWrap="break-word"
      wordBreak="break-word"
      whiteSpace="normal"
      {...props}
    />
  )
}

const CustomTable = (props: any) => {
  return (
    <Flex overflow="auto" w="100%">
      <Table variant="simple" {...props}></Table>
    </Flex>
  )
}

const CustomImage = (props: any) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <Box my={4}>
      <Skeleton isLoaded={loaded} borderRadius="5px">
        <Box
          // p={['0px', '0px', '0px', '5%', '5%', '5%']}
          bgColor={useColorModeValue('rgb(247, 246, 243)', 'gray.900')}
        >
          <div className="image-wrapper">
            <Image
              objectFit="contain"
              layout="fill"
              onLoad={() => setLoaded(true)}
              alt={props.alt || ''}
              {...props}
            />
          </div>
        </Box>
      </Skeleton>
      <Flex fontSize="sm" justify="center" mt={2} wrap="wrap">
        <Box
          _hover={{ borderBottomColor: 'blue.500' }}
          as="span"
          borderBottom="2px solid"
          borderBottomColor="transparent"
          transition="border-bottom-color .2s ease-in-out"
        >
          <Link _hover={{ TextDecoder: 'none' }} color="blue.500" href={props.src} isExternal>
            View Full Image
          </Link>
        </Box>
        {props.alt && (
          <>
            <Text mx={1} color="gray.500">
              &middot;
            </Text>
            <Text color="gray.500">{props.alt}</Text>
          </>
        )}
      </Flex>
      <style jsx>{`
        .image-wrapper {
          position: relative;
          border-radius: 5px;
          overflow: hidden;
          height: 500px;
          width: 100%;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }

        .image-wrapper img {
          display: block;
          vertical-align: bottom;
        }
      `}</style>
    </Box>
  )
}

const MDXComponents = {
  h1: (props: any) => <Heading as="h1" size="2xl" {...props} />,
  h2: (props: any) => <DocsHeading as="h2" size="xl" mt=".8em" {...props} />,
  h3: (props: any) => <DocsHeading as="h3" size="lg" mt=".7em" {...props} />,
  h4: (props: any) => <DocsHeading as="h4" size="md" mt=".6em" {...props} />,
  h5: (props: any) => <DocsHeading as="h5" size="sm" mt=".5em" {...props} />,
  h6: (props: any) => <DocsHeading as="h6" size="sm" mt=".5em" {...props} />,
  p: CustomP,
  inlineCode: (props: any) => <CustomCode {...props} />,
  ul: (props: any) => <UnorderedList my={4} {...props} />,
  ol: (props: any) => <OrderedList my={4} {...props} />,
  li: CustomListItem,
  a: CustomLink,
  blockquote: Quote,
  img: (props: any) => <CustomImage {...props} />,
  table: (props: any) => <CustomTable {...props} />,
  thead: (props: any) => <Thead {...props} />,
  tbody: (props: any) => <Tbody {...props} />,
  tr: (props: any) => <Tr {...props} />,
  td: (props: any) => <Td {...props} />,
  th: (props: any) => <Th {...props} />,
  EmbeddedVideo,
  FloatUpDivAnimation,
  FloatUpDivAnimationNoHeight,
  Step,
  FeaturedPost,
  ThreeDots,
  DefinitionPopup,
  AuthorCard
}

export default MDXComponents

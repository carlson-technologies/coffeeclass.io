import { useState } from 'react'
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
} from '@chakra-ui/react'
import NextLink from 'next/link'
import EmbeddedVideo from './EmbeddedVideo'
import Image from 'next/image'
import ExampleColorModeComponent from "./Content/ExampleColorModeComponent"
import FloatUpDivAnimation from "./Content/FloatUpDivAnimation"
import FloatUpDivAnimationNoHeight from './Content/FloatUpDivAnimationNoHeight'
import Step from "./Content/Step"

const Quote = (props) => {
    const { colorMode } = useColorMode()
    const bgColor = {
        light: '#f5e2b8',
        dark: '#706855'
    }

    return (
        <Alert
            my={2}
            w={["100%", "100%", "100%", "90%", "90%", "80%"]}
            bg={bgColor[colorMode]}
            variant="left-accent"
            status="info"
            py={0}
            borderLeftColor="brand_one.500"
            {...props}
        />
    )
}

const CustomLink = (props) => {
    const { colorMode } = useColorMode()
    const color = {
        light: 'brand_one.700',
        dark: 'brand_one.500'
    }

    const href = props.href
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

    if (isInternalLink) {
        return (
            <NextLink href={href} passHref>
                <Box
                    _hover={{ borderBottomColor: `${color[colorMode]}` }}
                    as="span"
                    borderBottom="2px solid"
                    borderBottomColor="transparent"
                    transition="border-bottom-color .2s ease-in-out"
                >
                    <Link _hover={{ TextDecoder: 'none' }} color={color[colorMode]} {...props} />
                </Box>
            </NextLink>
        )
    }

    return (
        <Box
            _hover={{ borderBottomColor: `${color[colorMode]}` }}
            as="span"
            borderBottom="2px solid"
            borderBottomColor="transparent"
            transition="border-bottom-color .2s ease-in-out"
        >
            <Link _hover={{ TextDecoder: 'none' }} color={color[colorMode]} isExternal {...props} />
        </Box>
    )
}

const CustomListItem = (props) => {
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.800',
        dark: 'gray.200'
    }
    return (
        <ListItem
            my={2}
            fontSize="xl"
            key={props.children}
            color={color[colorMode]}
            listStylePos="inside"
        >
            {props.children}
        </ListItem>
    )
}

const DocsHeading = (props) => (
    <Heading id={props.children} {...props}></Heading>
)

const CustomP = (props) => {
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.800',
        dark: 'gray.200'
    }
    return (
        <Text fontSize="xl" my={4} color={color[colorMode]} {...props} />
    )
}

const CustomCode = (props) => {
    return (
        <Code fontSize="0.84em" {...props} />
    )
}

const CustomTable = (props) => {
    return (
        <Flex overflow="auto" w="100%">
            <Table variant="simple" {...props}></Table>
        </Flex>
    )
}

const CustomImage = (props) => {
    const [loaded, setLoaded] = useState(false)
    return (
        <Box
            borderRadius={15}
            w={1000}
            maxW="100%"
        >
            <Skeleton isLoaded={loaded}>
                <Image
                    objectFit="contain"
                    width={1000}
                    height={500}
                    onLoad={() => setLoaded(true)}
                    alt={props.alt || ''}
                    {...props}
                />
            </Skeleton>
        </Box>
    )
}

const MDXComponents = {
    h1: (props) => <Heading as="h1" size="2xl" {...props} />,
    h2: (props) => <DocsHeading as="h2" size="xl" mt="1em" {...props} />,
    h3: (props) => <DocsHeading as="h3" size="lg" mt=".5em" {...props} />,
    h4: (props) => <DocsHeading as="h4" size="md" mt=".5em" {...props} />,
    h5: (props) => <DocsHeading as="h5" size="sm" mt=".5em" {...props} />,
    h6: (props) => <DocsHeading as="h6" size="xs" mt=".5em" {...props} />,
    p: CustomP,
    inlineCode: (props) => <CustomCode {...props} />,
    ul: (props) => <UnorderedList my={4} {...props} />,
    ol: (props) => <OrderedList my={4} {...props} />,
    li: CustomListItem,
    a: CustomLink,
    blockquote: Quote,
    img: (props) => <CustomImage {...props} />,
    table: (props) => <CustomTable {...props} />,
    thead: (props) => <Thead {...props} />,
    tbody: (props) => <Tbody {...props} />,
    tr: (props) => <Tr {...props} />,
    td: (props) => <Td {...props} />,
    th: (props) => <Th {...props} />,
    EmbeddedVideo,
    ExampleColorModeComponent,
    FloatUpDivAnimation,
    FloatUpDivAnimationNoHeight,
    Step,
}

export default MDXComponents
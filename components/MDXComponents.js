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
    Image
} from '@chakra-ui/react'
import NextLink from 'next/link'
import SnippetStep from '../components/SnippetStep'

const Quote = (props) => {
    const { colorMode } = useColorMode()
    const bgColor = {
        light: 'brand_one.50',
        dark: 'brand_one.900'
    }

    return (
        <Alert
            my={2}
            w="100%"
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
                <Box _hover={{ opacity: '.6' }} as="span" borderBottom="2px solid" borderBottomColor={`${color[colorMode]}`}><Link _hover={{ TextDecoder: 'none' }} color={color[colorMode]} {...props} /></Box>
            </NextLink>
        )
    }

    return <Box _hover={{ opacity: '.6' }} as="span" borderBottom="2px solid" borderBottomColor={`${color[colorMode]}`}><Link _hover={{ TextDecoder: 'none' }} color={color[colorMode]} isExternal {...props} /></Box>
}

const CustomListItem = (props) => {
    return (
        <ListItem
            my={2}
            fontSize="xl"
            key={props.children}
        >
            {props.children}
        </ListItem>
    )
}

const DocsHeading = (props) => (
    <Heading
        css={{
            scrollMarginTop: '100px',
            scrollSnapMargin: '100px', // Safari
            '&[id]': {
                pointerEvents: 'none'
            },
            '&[id]:before': {
                display: 'block',
                height: ' 6rem',
                marginTop: '-6rem',
                visibility: 'hidden',
                content: `""`
            },
            '&[id]:hover a': { opacity: 1 }
        }}
        {...props}
    >
        <Box>
            {props.children}
            {props.children && (
                <Box
                    aria-label="anchor"
                    as="a"
                    color="brand_one.500"
                    fontWeight="normal"
                    outline="none"
                    _hover={{
                        opacity: 1,
                        boxShadow: 'outline'
                    }}
                    opacity="0"
                    ml="0.375rem"
                    href={`#${props.children}`}
                    id={props.children}
                >
                    #
                </Box>
            )}
        </Box>
    </Heading>
)

const CustomP = (props) => {
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.700',
        dark: 'gray.300'
    }
    return (
        <Text fontSize="xl" my={4} color={color[colorMode]} {...props} />
    )
}

const MDXComponents = {
    h1: (props) => <Heading as="h1" size="2xl" {...props} />,
    h2: (props) => <DocsHeading as="h2" size="xl" mt="1em" {...props} />,
    h3: (props) => <DocsHeading as="h3" size="lg" mt=".5em" {...props} />,
    h4: (props) => <DocsHeading as="h4" size="md" {...props} />,
    h5: (props) => <DocsHeading as="h5" size="sm" {...props} />,
    h6: (props) => <DocsHeading as="h6" size="xs" {...props} />,
    p: CustomP,
    inlineCode: (props) => <Code colorScheme="brand_two" fontSize="0.84em" {...props} />,
    ul: (props) => <UnorderedList my={4} {...props} />,
    ol: (props) => <OrderedList my={4} {...props} />,
    li: CustomListItem,
    a: CustomLink,
    blockquote: Quote,
    img: (props) => <Image {...props} borderRadius={5}></Image>,
    SnippetStep
}

export default MDXComponents
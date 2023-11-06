import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Box,
  Text,
  Link,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  theme
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { connectStateResults, connectHighlight } from 'react-instantsearch-dom'

interface Props {
  searchState: any
  searchResults: any
}

const CustomHighlight = connectHighlight(({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit
  })

  return (
    <div>
      {parsedHit.map(part =>
        part.isHighlighted ? (
          <mark key={part.value} style={{ backgroundColor: theme.colors.orange[200] }}>
            {part.value}
          </mark>
        ) : (
          part.value
        )
      )}
    </div>
  )
})

function Hits({ searchState, searchResults }: Props) {
  const validQuery = searchState.query?.length >= 3 // 3 is the minimum query length

  const bgColor = useColorModeValue('gray.200', 'gray.700')
  const color = useColorModeValue('gray.600', 'gray.400')

  return (
    <>
      {!validQuery && searchState.query?.length == 1 && (
        <Text align="center" mt={4} fontSize="lg">
          <Box as="span" fontWeight="bold">
            2
          </Box>{' '}
          more characters to go!
        </Text>
      )}
      {!validQuery && searchState.query?.length == 2 && (
        <Text align="center" mt={4} fontSize="lg">
          <Box as="span" fontWeight="bold">
            1
          </Box>{' '}
          more!
        </Text>
      )}
      {searchResults?.hits.length === 0 && validQuery && (
        <Text align="center" mt={4} fontSize="lg">
          No results found!
        </Text>
      )}
      {searchResults?.hits.length > 0 && validQuery && (
        <>
          {searchResults.hits.map((hit: any, index: number) => (
            <div tabIndex={index} key={hit.objectID}>
              <>
                {hit.type === 'article' && (
                  <Link as={NextLink} href={`/articles/${hit.slug.replace('.mdx', '')}`}>
                    <Box bgColor={bgColor} my={4} p={5} borderRadius={5}>
                      <Breadcrumb
                        color={color}
                        spacing="4px"
                        separator={<ChevronRightIcon color="gray.500" />}
                      >
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                          <BreadcrumbLink href="/articles">Article</BreadcrumbLink>
                        </BreadcrumbItem>
                      </Breadcrumb>
                      <div className="title">
                        <CustomHighlight attribute="title" hit={hit} />
                      </div>
                    </Box>
                  </Link>
                )}
              </>

              <>
                {hit.type === 'author' && (
                  <>
                    <Link as={NextLink} href={`/authors/${hit.slug.replace('.mdx', '')}`}>
                      <Box bgColor={bgColor} my={4} p={5} borderRadius={5}>
                        <Breadcrumb
                          color={color}
                          spacing="4px"
                          separator={<ChevronRightIcon color="gray.500" />}
                        >
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                          </BreadcrumbItem>

                          <BreadcrumbItem>
                            <BreadcrumbLink href="/authors">Author</BreadcrumbLink>
                          </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="title">
                          <CustomHighlight attribute="name" hit={hit} />
                        </div>
                      </Box>
                    </Link>
                  </>
                )}
              </>

              <>
                {hit.type === 'tag' && (
                  <>
                    <Link as={NextLink} href={`/tags/${hit.slug.replace('.mdx', '')}`}>
                      <Box bgColor={bgColor} my={4} p={5} borderRadius={5}>
                        <Breadcrumb
                          color={color}
                          spacing="4px"
                          separator={<ChevronRightIcon color="gray.500" />}
                        >
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                          </BreadcrumbItem>

                          <BreadcrumbItem>
                            <BreadcrumbLink href="/tags">Tag</BreadcrumbLink>
                          </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="title">
                          <CustomHighlight attribute="title" hit={hit} />
                        </div>
                      </Box>
                    </Link>
                  </>
                )}
              </>
            </div>
          ))}
        </>
      )}

      <style jsx>{`
        .title {
          font-size: ${theme.fontSizes.lg};
        }
      `}</style>
    </>
  )
}

export default connectStateResults(Hits)

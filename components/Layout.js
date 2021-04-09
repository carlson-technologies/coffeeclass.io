import Container from '../components/Container'
import {
  Divider,
  Flex,
  Heading,
  Text,
  Link,
  useColorMode
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import SEO from '../components/SEO'

export default function Layout({ frontMatter, children }) {
  const router = useRouter()
  const slug = router.asPath
  const { colorMode } = useColorMode()
  const bgColor = {
    light: 'gray.100',
    dark: 'gray.700'
  }
  const boxShadowColor = {
    light: '0 4px 12px 0 rgba(0, 0, 0, 0.3)',
    dark: '0 4px 12px 0 rgba(0, 0, 0, 0.9)'
  }
  return (
    <Container>
      <SEO url={`https://coffeeclass.io${slug}`} {...frontMatter} />
      <Flex flexDir="row" mt={50}>
        <Flex
          flexDir="column"
          m={[0, 0, 5]}
          px={[4, 4, 0]}
          w={frontMatter.headings ? ["100%", "100%", "calc(100% - 300px)"] : '100%'}
        >
          {children}
        </Flex>
        {frontMatter?.headings &&
          <Flex
            w={200}
            bgColor={bgColor[colorMode]}
            borderRadius={5}
            pos="fixed"
            right={50}
            top={100}
            flexDir="column"
            p={2}
            boxShadow={boxShadowColor[colorMode]}
            display={['none', 'none', 'flex']}
          >
            <Text textAlign="center" fontSize="lg">Sections</Text>
            <Divider w="90%" my={1} alignSelf="center" />
            {frontMatter?.headings.map((h) => {
              return (
                <>
                  {
                    h.h2 &&
                    <Text as="h4" my={1} key={h.h2}>
                      <Link href={`#${h.h2}`}>{h.h2}</Link>
                    </Text>
                  }
                  {
                    h.h3 &&
                    <Text as="h4" my={1} ml={2} key={h.h3}>
                      <Link href={`#${h.h3}`}>- {h.h3}</Link>
                    </Text>
                  }
                  {
                    h.h4 &&
                    <Text as="h4" my={1} ml={4} key={h.h4}>
                      <Link href={`#${h.h4}`}>- {h.h4}</Link>
                    </Text>
                  }
                  {
                    h.h5 &&
                    <Text as="h4" my={1} ml={6} key={h.h5}>
                      <Link href={`#${h.h5}`}>- {h.h5}</Link>
                    </Text>
                  }
                  {
                    h.h6 &&
                    <Text as="h4" my={1} ml={8} key={h.h6}>
                      <Link href={`#${h.h6}`}>- {h.h6}</Link>
                    </Text>
                  }
                </>
              )
            })}
          </Flex>
        }
      </Flex>
    </Container>
  )
}
import Container from '../components/Container'
import {
  Divider,
  Flex,
  Heading,
  Text,
  Link,
  useColorMode,
  Tooltip
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import SEO from '../components/SEO'
import { YoutubeIcon, GitHubIcon } from '../components/CustomIcons'

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
          w="100%"
          // w={frontMatter.headings ? ["100%", "100%", "calc(100% - 300px)"] : '100%'}
        >
          {children}
        </Flex>
        {/* {frontMatter?.headings &&
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
            <Text textAlign="center" fontSize="lg">Sections 📑</Text>
            <Divider w="90%" my={1} alignSelf="center" />
            <Flex align="center" alignSelf="center">
              {frontMatter.githubURL &&
                <Tooltip hasArrow label="Link To This Post's Code" closeDelay={100}>
                  <Link isExternal href={frontMatter?.githubURL} w="fit-content">
                    <GitHubIcon fontSize="2xl" mt={2} mr={2} />
                  </Link>
                </Tooltip>
              }
              {frontMatter.youtubeId?.map((id) => {
                return (
                  <Tooltip k={id} hasArrow label="Link To This Post As A YouTube Video" closeDelay={100}>
                    <Link isExternal href={id} w="fit-content">
                      <YoutubeIcon fontSize="2xl" mt={2} mr={2} />
                    </Link>
                  </Tooltip>
                )
              })}
            </Flex>
            <Divider w="90%" my={1} alignSelf="center" />
            {frontMatter?.headings.map((h) => {
              return (
                <>
                  {
                    h.h2 &&
                    <Heading as="h4" size="sm" fontWeight="semibold" my={1} key={h.h2}>
                      <Link href={`#${h.h2}`}>{h.h2}</Link>
                    </Heading>
                  }
                  {
                    h.h3 &&
                    <Heading as="h4" size="sm" fontWeight="normal" my={1} ml={2} key={h.h3}>
                      <Link href={`#${h.h3}`}>- {h.h3}</Link>
                    </Heading>
                  }
                  {
                    h.h4 &&
                    <Heading as="h4" size="sm" fontWeight="normal" my={1} ml={4} key={h.h4}>
                      <Link href={`#${h.h4}`}>- {h.h4}</Link>
                    </Heading>
                  }
                  {
                    h.h5 &&
                    <Heading as="h4" size="sm" fontWeight="normal" my={1} ml={6} key={h.h5}>
                      <Link href={`#${h.h5}`}>- {h.h5}</Link>
                    </Heading>
                  }
                  {
                    h.h6 &&
                    <Heading as="h4" size="sm" fontWeight="normal" my={1} ml={8} key={h.h6}>
                      <Link href={`#${h.h6}`}>- {h.h6}</Link>
                    </Heading>
                  }
                </>
              )
            })}
            <Divider />
            <Text my={1} textAlign="center">
              <Link href='#__next'>Top</Link>
            </Text>
          </Flex>
        } */}
      </Flex>
    </Container>
  )
}
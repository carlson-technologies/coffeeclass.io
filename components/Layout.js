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
          // w="100%"
          w={frontMatter.headers ? ["100%", "100%", "calc(100% - 300px)"] : '100%'}
        >
          {children}
        </Flex>
        {frontMatter?.headers &&
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
            <Flex align="center" alignSelf="center" color="brand_one.500">
              {frontMatter.githubURL &&
                <Tooltip hasArrow label="Link To This Post's Code" closeDelay={100}>
                  <Link isExternal href={frontMatter?.githubURL} w="fit-content">
                    <GitHubIcon fontSize="2xl" mt={2} mr={2} />
                  </Link>
                </Tooltip>
              }
              {frontMatter.youtubeId?.map((id) => {
                return (
                  <Tooltip key={id} hasArrow label="Link To This Post As A YouTube Video" closeDelay={100}>
                    <Link isExternal href={id} w="fit-content">
                      <YoutubeIcon fontSize="2xl" mt={2} mr={2} />
                    </Link>
                  </Tooltip>
                )
              })}
            </Flex>
            {(frontMatter.youtubeId || frontMatter.githubURL) && <Divider w="90%" my={1} alignSelf="center" />}
            {frontMatter?.headers.map((h) => {
              return (
                <Heading as="h4" size="sm" fontWeight="normal" my={1} key={h.text}>
                  <Link href={`#${h.text}`} ml={(h.level - 2) * 2}>{h.text}</Link>
                </Heading>
              )
            })}
            <Divider />
            <Text my={1} textAlign="center">
              <Link href='#__next'>Top</Link>
            </Text>
          </Flex>
        }
      </Flex>
    </Container>
  )
}
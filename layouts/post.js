import { useState, useEffect } from 'react'
import Container from '../components/Container'
import {
  Divider,
  Flex,
  Heading,
  Text,
  Link,
  useColorMode,
  Tooltip,
  Box
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

  const [width, setWidth] = useState(0)
  const handleScroll = () => {
    let scrollTop = window.scrollY;
    let docHeight = document.body.offsetHeight;
    let winHeight = window.innerHeight;
    let scrollPercent = scrollTop / (docHeight - winHeight);
    let scrollPercentRounded = Math.round(scrollPercent * 100);
    setWidth(scrollPercentRounded)

    // this value is being passed into Confetti component
    // we only want to set it off once so no need to ever set it back to false
    // if (scrollPercentRounded == 100)
    //     setFire(true)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <Container>
      <SEO url={`https://coffeeclass.io${slug}`} {...frontMatter} />
      <Box h={1} as="div" bgGradient="linear(to-r, #EAD9CD, #714B2F)" position="fixed" top={0} left={0} zIndex={100} w={`${width}%`}></Box>
      <Flex flexDir="row" mt={10}>
        <Flex
          flexDir="column"
          mx={[0, 0, 0, 0, 1, 5]}
          px={[4, 4, 4, 2, 2, 0]}
          w={frontMatter.headers ? ["100%", "100%", "100%", "100%", "calc(100% - 300px)", "calc(100% - 300px)"] : '100%'}
        >
          {children}
        </Flex>
        {frontMatter?.headers &&
          <Flex
            w={200}
            pos="fixed"
            right={50}
            top={100}
            flexDir="column"
            p={2}
            display={['none', 'none', 'none', 'none', 'flex', 'flex']}
          >
            {frontMatter?.headers.map((h) => {
              return (
                <Heading as="h4" size="sm" fontWeight="normal" my={1} key={h.text}>
                  <Link href={`#${h.text}`} ml={(h.level - 2) * 2}>{h.text}</Link>
                </Heading>
              )
            })}
          </Flex>
        }
      </Flex>
    </Container>
  )
}
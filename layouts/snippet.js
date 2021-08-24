import { useState, useEffect } from 'react'
import Container from '../components/Container'
import {
  Flex,
  Box,
  Heading,
  useColorMode,
  Text,
  Skeleton,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import SEO from '../components/SEO'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Layout({ frontMatter, children }) {
  const router = useRouter()
  const slug = router.asPath

  const [loaded, setLoaded] = useState(false)

  const { colorMode } = useColorMode()
  const color = {
    light: 'gray.600',
    dark: 'gray.400'
  }
  const headerBgColor = {
    light: 'brand_one.100',
    dark: '#75665f'
  }

  const [width, setWidth] = useState(0)
  const handleScroll = () => {
    let scrollTop = window.scrollY;
    let docHeight = document.body.offsetHeight;
    let winHeight = window.innerHeight;
    let scrollPercent = scrollTop / (docHeight - winHeight);
    let scrollPercentRounded = Math.round(scrollPercent * 100);
    setWidth(scrollPercentRounded)
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
      <Box h={1} as="div" bgGradient="linear(to-r, #EAD9CD, #714B2F)" position="fixed" top={0} left={0} zIndex={15} w={`${width}%`}></Box>
      <Box
        w="100%"
        display={["block", "block", "block", "block", "block", "flex"]}
        justifyContent="center"
        flexDir="column"
      >
        <Box
          bgColor={headerBgColor[colorMode]}
          display={["block", "block", "block", "block", "block", "flex"]}
          justifyContent="center"
          flexDir="column"
          w="100%"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: .5 }}
            style={{
              flexDir: "column",
              w: ['100%', '100%', '100%', '100%', '100%', '70%'],
              alignSelf: "center",
              maxW: "800px",
            }}
          >
            <Flex
              flexDir="column"
              alignSelf="center"
              maxW="800px"
              minW={[null, null, null, '100%', '800px', '800px']}
              px={[4, 4, 4, 4, 4, 0]}
            >
              <Flex mt={10}>
                {
                  frontMatter.logoImage?.map((image, index) => (
                    // If the image title includes "light", it has a dark mode image
                    // so we need to use the correct image.
                    // This is not the best solution, but it works for now.
                    image.includes('light') ?
                      <Box
                        w="5em"
                        mb={4}
                        mr={2}
                        alignSelf="left"
                      >
                        <Skeleton isLoaded={loaded}>
                          <Image
                            key={index}
                            src={`/snippet-images/${image}`}
                            alt={frontMatter.logoImage}
                            width="200px"
                            height="200px"
                            objectFit="contain"
                            priority={true}
                            onLoad={() => setLoaded(true)}
                          />
                        </Skeleton>
                      </Box> :
                      <Box
                        w="5em"
                        mb={4}
                        mr={2}
                        alignSelf="left"
                      >
                        <Skeleton isLoaded={loaded}>
                          <Image
                            key={index}
                            src={`/snippet-images/${image}`}
                            alt={frontMatter.logoImage}
                            width="200px"
                            height="200px"
                            objectFit="cover"
                            priority={true}
                            onLoad={() => setLoaded(true)}
                          />
                        </Skeleton>
                      </Box>
                  ))
                }
              </Flex>
              <Heading
                as="h1"
                size="xl"
                textAlign="left"
              >
                {frontMatter.title}
              </Heading>
              <Text
                fontSize="2xl"
                mt={2}
                mb={6}
                color={color[colorMode]}
                textAlign="left"
              >
                {frontMatter.description}
              </Text>
            </Flex>
          </motion.div>
        </Box>
        <Box
          px={4}
          display={["block", "block", "block", "block", "block", "flex"]}
          justifyContent="center"
          flexDir="column"
          w="100%"
        >
          {children}
        </Box>
      </Box>
    </Container>
  )
}
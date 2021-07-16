import { useState, useEffect } from 'react'
import Container from '../components/Container'
import {
  Flex,
  Box
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import SEO from '../components/SEO'

export default function Layout({ frontMatter, children }) {
  const router = useRouter()
  const slug = router.asPath

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
        px={4}
        mt={10}
        w="100%"
        display={["block", "block", "block", "block", "block", "flex"]}
        justifyContent="center"
      >
        {children}
      </Box>
    </Container>
  )
}
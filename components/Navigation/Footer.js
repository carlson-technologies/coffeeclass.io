import {
    Flex,
    Text,
    Divider,
    Link
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const Footer = () => {
    const router = useRouter()
    var slug = router.asPath
    const editLinkBase = 'https://github.com/bjcarlson42/coffeeclass.io/edit/main'
    const extension = slug.includes('tutorials/') || slug.includes('learn/') || slug.includes('snippets/') ? ".mdx" : '.js'
    if (slug == '/') { slug = '/index' }
    if (slug == '/snippets') { slug = '/snippets/index' }
    if (slug == '/learn') { slug = '/learn/index' }
    if (slug == '/tutorials') { slug = '/tutorials/index' }
    if (slug == '/tags') { slug = '/tags/index' }
    return (
        <Flex
            flexDir="column"
            align="center"
            ml={[0, 0, 100]}
            mb={4}
            px={4}
            as="footer"
        >
            <Divider w="80%" mb={4} mt={8} />
            <Text fontSize="sm">Copyright &copy; 2021 Coffeclass LLC</Text>
            <Text fontSize="sm" textAlign="center">Created by <Link href="https://benjamincarlson.io" color="blue.500" isExternal>Benjamin Carlson</Link> using <Link href="https://nextjs.org" color="blue.500" isExternal>Next.js</Link> and <Link href="https://chakra-ui.com" color="blue.500" isExternal>Chakra-UI</Link></Text>
            <Flex fontSize="sm" flexDir="row">
                <Text textDecor="underline" mr={2}>
                    <NextLink href="/terms" passHref>Terms</NextLink>
                </Text>
                {` • `}
                <Text textDecor="underline" mx={2}>
                    <NextLink href="/privacy" passHref>Privacy</NextLink>
                </Text>
                {` • `}
                <Text textDecor="underline" ml={2}>
                    <NextLink href="/disclaimer" passHref>Disclaimer</NextLink>
                </Text>
            </Flex>
        </Flex>
    )
}

export default Footer
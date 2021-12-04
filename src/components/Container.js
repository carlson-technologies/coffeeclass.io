import {
    Flex,
} from '@chakra-ui/react'
import Footer from '../components/Navigation/Footer'
import Navbar from '../components/Navigation/Navbar'
import { NextSeo } from 'next-seo'

const Container = ({ title, description, url, children }) => {
    return (
        <>
            <NextSeo
                title={title}
                description={description}
                canonical={url}
                openGraph={{
                    url,
                    title,
                    description
                }}
            />
            <Navbar />
            <Flex
                flexDirection="column"
            >
                <Flex
                    display="block"
                    minH="100vh"
                    as="main"
                >
                    {children}
                </Flex>
                <Footer />
            </Flex>
        </>
    )
}

export default Container
import {
    Flex,
} from '@chakra-ui/react'
import Footer from '../components/Navigation/Footer'
import Navbar from '../components/Navigation/Navbar'

const Container = ({ children }) => {
    return (
        <>
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
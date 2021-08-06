import {
    Flex,
    Box
} from '@chakra-ui/react'
import NavbarLeft from '../components/Navigation/NavbarLeft'
import NavbarTop from '../components/Navigation/NavbarTop'
import Footer from '../components/Navigation/Footer'

const Container = ({ children }) => {
    return (
        <>
            <NavbarTop />
            <NavbarLeft />
            <Flex
                flexDirection="column"
            >
                <Flex
                    display="block"
                    minH="100vh"
                    ml={[0, 0, 0, 0, 55, 55]}
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
import {
    Flex,
    Text,
    Link,
    IconButton,
    SimpleGrid,
    Box
} from '@chakra-ui/react'
import NavbarLeft from '../components/Navigation/NavbarLeft'
import NavbarTop from '../components/Navigation/NavbarTop'


const Container = ({ children }) => {
    return (
        <>
            <NavbarTop />
            <NavbarLeft />
            <Flex
                as="main"
                flexDirection="column"
                ml={100}
            >
                {children}
            </Flex>
        </>
    )
}

export default Container
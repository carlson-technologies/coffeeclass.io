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
import Footer from '../components/Navigation/Footer'
import { motion } from "framer-motion"

const MotionBox = motion(Box)

const Container = ({ children }) => {
    return (
        <>
            <NavbarTop />
            <NavbarLeft />
            <Flex
                as="main"
                flexDirection="column"
                mt={50}
            >
                <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div style={{ minHeight: '100vh', marginLeft: '100px' }}>
                        {children}
                    </div>
                </MotionBox>
                <Footer />
            </Flex>
        </>
    )
}

export default Container
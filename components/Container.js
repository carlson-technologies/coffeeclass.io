import {
    Flex,
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
                flexDirection="column"
                // mt={50}
            >
                {/* <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                > */}
                    <Flex
                        display="block"
                        minH="100vh"
                        ml={[0, 0, 150]}
                        as="main"
                    >
                        {children}
                    </Flex>
                {/* </MotionBox> */}
                <Footer />
            </Flex>
        </>
    )
}

export default Container
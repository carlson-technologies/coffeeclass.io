import { Heading, Flex } from '@chakra-ui/react'
import NavBarTop from '../components/Navigation/NavbarTop'
import NavBarLeft from '../components/Navigation/NavBarLeft'

export default function Index() {
    return (
        <>
            <NavBarTop />
            <NavBarLeft />
            <Flex flexDir="column" ml={100}>
                <Heading as="h1">coffeeclass.io</Heading>
                <Heading as="h1" mt={50}>coffeeclass.io</Heading>
                <Heading as="h1" mt={50}>coffeeclass.io</Heading>
                <Heading as="h1" mt={50}>coffeeclass.io</Heading>
                <Heading as="h1" mt={50}>coffeeclass.io</Heading>
            </Flex>
        </>
    )
}
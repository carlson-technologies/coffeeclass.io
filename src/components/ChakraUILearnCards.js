import {
    Flex,
    Icon,
    Heading,
    Text,
    Grid,
    Box,
    useColorModeValue,
} from '@chakra-ui/react'
import { IoMdMoon } from "react-icons/io"
import { MdAccessibility, MdGrain, MdPalette } from "react-icons/md"
import { AiFillThunderbolt } from "react-icons/ai"
import { FaDiscord } from "react-icons/fa"

const Feature = ({ title, icon, children, ...props }) => {
    return (
        <Box
            bg={useColorModeValue("white", "gray.700")}
            rounded="12px"
            shadow="base"
            p={["40px", "40px", "40px", "30px", "40px", "40px"]}
            mx={2}
            {...props}
        >
            <Flex
                rounded="full"
                w="12"
                h="12"
                bg="teal.500"
                align="center"
                justify="center"
            >
                <Icon fontSize="24px" color="white" as={icon} />
            </Flex>
            <Heading as="h3" size="md" fontWeight="semibold" mt="1em" mb="0.5em">
                {title}
            </Heading>
            <Text fontSize="lg" opacity={0.7}>
                {children}
            </Text>
        </Box>
    )
}

export default function ChakraUILearnCards() {
    return (
        <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)"]}
            gap={10}
            my={4}
        >
            <Feature icon={MdAccessibility} title="Accessible">
                Chakra UI strictly follows WAI-ARIA standards for all
                components.
            </Feature>
            <Feature icon={MdPalette} title="Themeable">
                Customize any part of our components to match your design needs.
            </Feature>
            <Feature icon={MdGrain} title="Composable">
                Designed with composition in mind. Compose new components with
                ease.
            </Feature>
            <Feature icon={IoMdMoon} title="Light and Dark UI">
                Optimized for multiple color modes. Use light or dark, your
                choice.
            </Feature>
            <Feature icon={AiFillThunderbolt} title="Developer Experience">
                Guaranteed to boost your productivity when building your app or
                website.
            </Feature>
            <Feature icon={FaDiscord} title="Active Community">
                We're a team of active maintainers ready to help you whenever
                you need.
            </Feature>
        </Grid>
    )
}

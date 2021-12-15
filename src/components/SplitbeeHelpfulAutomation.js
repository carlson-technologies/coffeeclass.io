
import { useState } from 'react'
import {
    Flex,
    Button,
    useToast,
    Text,
} from "@chakra-ui/react"
import { useRouter } from "next/router"

export default function SplitbeeHelpfulAutomation() {
    const router = useRouter()
    const pathName = router.pathname
    const toast = useToast()
    const [display, setDisplay] = useState('flex')

    return (
        <Flex flexDir="column" align="center" mb={4} display={display}>
            <Text mt={4}>Was this page helpful?</Text>
            <Flex mt={4}>
                <Button
                    mr={2}
                    w={100}
                    data-splitbee-event="Snippet Helpful"
                    data-splitbee-event-type={`yes - ${slug}`}
                    onClick={() => {
                        toast({
                            title: "Awesome!",
                            description: "Your feedback is helpful for the future of coffeeclass.io!",
                            status: "success",
                            duration: 4000,
                            isClosable: true,
                        })
                        setDisplay("none")
                    }}
                >
                    Yes
                </Button>
                <Button
                    w={100}
                    data-splitbee-event="Snippet Helpful"
                    data-splitbee-event-type={`no  - ${slug}`}
                    onClick={() => {
                        toast({
                            title: "Sorry to hear that :(",
                            description: "Your feedback is helpful for the future of coffeeclass.io!",
                            status: "success",
                            duration: 4000,
                            isClosable: true,
                        })
                        setDisplay("none")
                    }}
                >
                    No
                </Button>
            </Flex>
        </Flex>
    )
}

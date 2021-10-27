import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import {
    useToast,
    Input,
    Stack,
    InputGroup,
    Button,
    Box,
    useColorMode,
    Text,
    Heading,
    InputRightElement,
} from "@chakra-ui/react"

const Subscribe = () => {
    const router = useRouter()
    const inputEl = useRef(null)
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const { colorMode } = useColorMode()

    const colorSecondary = {
        light: 'gray.700',
        dark: 'gray.400'
    }

    const borderColor = {
        light: 'gray.200',
        dark: 'gray.600'
    }

    const subscribe = async (e) => {
        e.preventDefault()
        setLoading(true)

        const res = await fetch('/api/join-waitlist', {
            body: JSON.stringify({
                email: inputEl.current.value,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        setLoading(false)
        const { error } = await res.json()

        if (error) {
            toast({
                title: 'Whoops! There\'s an error!',
                description: error,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            return
        }

        inputEl.current.value = ''
        toast({
            title: "You are subscribed!",
            description: "Please click the link that was sent to your email to verify your registration. We'll send you an email when we launch user accounts!",
            status: "success",
            duration: 6000,
            isClosable: true,
        })
    }

    return (
        <Box
            w="100%"
            p={5}
            border='1px solid'
            borderColor={borderColor[colorMode]}
            borderRadius={5}
        >
            <Heading as="h3" size="md" mb={2}>
                Add Your Email To Accounts Waitlist
            </Heading>
            <Stack spacing={4}>
                <InputGroup size="md" mt={4} borderColor={borderColor[colorMode]}>
                    <Input
                        aria-label="Email for newsletter"
                        placeholder="ben@benjamincarlson.io"
                        ref={inputEl}
                        type="email"
                    />
                    <InputRightElement width="6.75rem">
                        <Button
                            isLoading={loading}
                            fontWeight="bold"
                            h="1.75rem"
                            size="sm"
                            onClick={subscribe}
                            colorScheme="blue"
                            variant="outline"
                            px={10}
                        >
                            Subscribe
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Text as="small" color={colorSecondary[colorMode]}>Be sure to verify your email after you subscribe!</Text>
            </Stack>
        </Box>
    )
}

export default Subscribe
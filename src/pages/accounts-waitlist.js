import {
    Heading,
    Flex,
    Stack,
    Text,
    OrderedList,
    ListItem,
    Box,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../components/Container'
import Subscribe from '../components/Subscribe'

const url = 'https://www.coffeeclass.io/accounts-waitlist'
const title = 'Accounts Waitlist | coffeeclass.io'
const description = 'Join the coffeeclass.io accounts waitlist so you can have access to features like bookmarking a snippet, tracking your progress in courses, and better commenting.'

export default function AccountsWaitlist() {
    return (
        <Container>
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
            <Stack
                spacing={8}
                px={4}
            >
                <Flex
                    flexDir="column"
                    w={["100%", "100%", "100%", "100%", "100%", "60%"]}
                    alignSelf="center"
                >
                    <Heading mt={4} as="h1" size="2xl" color="brand_one.500">Accounts Waitlist</Heading>
                    <Box bgColor="brand_one.500" h={2} w={150} borderRadius={5} mb={4} mt={2} />
                    <Text fontSize="xl" mb={4}>
                        Thanks for your interest in coffeeclass.io user accounts. We are working hard to build this site including more content and features.
                    </Text>
                    <Text fontSize="xl" mb={4}>
                        Our next major feature will be user accounts! Having an account will allow you to do the following:
                    </Text>

                    <OrderedList spacing={4} mb={8}>
                        <ListItem>
                            Bookmark articles
                        </ListItem>
                        <ListItem>
                            Track your progress in courses
                        </ListItem>
                        <ListItem>
                            Better commenting
                        </ListItem>
                        <ListItem>
                            Ability to follow favorite authors
                        </ListItem>
                        <ListItem>
                            And more!
                        </ListItem>
                    </OrderedList>
                    <Text fontSize="xl" mb={4}>
                        If this looks interesting to you, be sure to add your email to the waitlist below, and be notified  when accounts are available!
                    </Text>
                    <Subscribe />
                </Flex>
            </Stack>
        </Container>
    )
}

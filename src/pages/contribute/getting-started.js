import {
    Heading,
    Flex,
    Stack,
    Text,
    useColorModeValue,
    Link,
    Box,
    UnorderedList,
    ListItem,
    Code,
} from '@chakra-ui/react'
import Container from '../../components/Container'
import NextLink from 'next/link'
import Step from '../../components/Content/Step'

const url = 'https://www.coffeeclass.io/getting-started'
const title = 'Getting Started'
const description = 'Learn the benefits of writing a coding tutorial for coffeeclass.io and how to submit an article!'

export default function GettingStarted() {
    return (
        <Container title={title} description={description} url={url}>
            <Box py={100} bgColor={useColorModeValue("brand_one.100", "#75665f")}>
                <Stack
                    spacing={8}
                    px={4}
                >
                    <Flex
                        flexDir="column"
                        mt={50}
                        maxW={800}
                        alignSelf="center"
                    >
                        <Heading as="h1" size="2xl">
                            Write For coffeeclass.io
                        </Heading>
                        <Text fontSize="2xl" mt={4} color={useColorModeValue("gray.600", "gray.300")}>Learn the benefits of writing for coffeeclass.io and how to submit an article!</Text>
                    </Flex>
                </Stack>
            </Box>
            <Stack
                spacing={8}
                px={4}
            >
                <Flex
                    flexDir="column"
                    mt={50}
                    maxW={800}
                    alignSelf="center"
                >
                    <Box bgColor={useColorModeValue("gray.100", "gray.800")} p={4} mb={8} borderRadius={5}>
                        <Flex align="center">
                            <Text fontSize="5xl" mr={2}>💡</Text>
                            <Heading size="md" fontWeight="normal" mb={2}>On this page</Heading>
                        </Flex>
                        <UnorderedList listStylePos="inside" color={useColorModeValue("gray.600", "gray.400")}>
                            <ListItem>
                                <Link href="#Welcome" color="gray.500" fontSize="lg">Welcome Writers!</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#Types of Articles" color="gray.500" fontSize="lg">Types of Articles we Publish</Link>
                                <UnorderedList listStylePos="inside">
                                    <ListItem>
                                        <Link href="#Welcome" color="gray.500" fontSize="lg">Snippets</Link>
                                    </ListItem>
                                    <ListItem>
                                        <Link href="#Types of Articles" color="gray.500" fontSize="lg">Tutorials</Link>
                                    </ListItem>
                                    <ListItem>
                                        <Link href="#How to Submit" color="gray.500" fontSize="lg">Guides</Link>
                                    </ListItem>
                                    <ListItem>
                                        <Link href="#How to Submit" color="gray.500" fontSize="lg">Courses</Link>
                                    </ListItem>
                                </UnorderedList>
                            </ListItem>
                            <ListItem>
                                <Link href="#How to Submit" color="gray.500" fontSize="lg">How to Submit</Link>
                                <UnorderedList listStylePos="inside">
                                    <ListItem>
                                        <Link href="#Welcome" color="gray.500" fontSize="lg">Pull Request</Link>
                                    </ListItem>
                                    <ListItem>
                                        <Link href="#Types of Articles" color="gray.500" fontSize="lg">Email</Link>
                                    </ListItem>
                                </UnorderedList>
                            </ListItem>
                        </UnorderedList>
                    </Box>

                    <Heading as="h2" size="lg" mt={8} mb={4} id="Welcome">
                        Welcome Writers!
                    </Heading>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        If you are looking to write about code, you are in the right place. We publish articles covering a <NextLink href="/tags" passHref><Link href="/tags" fontWeight="bold">range of topics</Link></NextLink> as well as <NextLink href="/authors" passHref><Link href="/authors" fontWeight="bold">writers</Link></NextLink> who range in skill level. Read on to find out how to get started writing and how we are different than other programming blogs.
                    </Text>

                    <Heading as="h2" size="lg" mt={8} mb={4} id="Types of Articles">
                        Types of Articles we Publish
                    </Heading>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        coffeeclass.io is different than other programming blogs. That is because our articles are not only broken up by tags, but also by article type. Below we will detail the 4 types of articles we publish.
                    </Text>

                    <Heading as="h3" size="md" mt={8} mb={4}>
                        Snippets
                    </Heading>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        The first type of posts are snippets. Think of snippets as stack overflow answers. They are specific articles that aim to answer a question or solve a problem.
                    </Text>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        However, our snippets are a bit more formal than Stack Overflow. They generally follow the following structure:
                    </Text>

                    <UnorderedList listStylePos="inside" color={useColorModeValue("gray.600", "gray.400")}>
                        <ListItem>
                            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                                Description of the problem
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                                Solution
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                                Explanation of solution
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                                Other variants
                            </Text>
                        </ListItem>
                    </UnorderedList>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        Here is an <NextLink href="/snippets/make-div-float-up-hover-css" passHref><Link href="/snippets/make-div-float-up-hover-css" fontWeight="bold">example</Link></NextLink> of a snippet. As you can see,
                        it includes all of the parts mentioned above.
                    </Text>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        You&apos;ll also notice that it includes interactive examples as well as custom step components. This is another thing that differentiates our site from others. Since all of the posts are <Code>.mdx</Code> files, we can embed custom components in them! You should definitely take advantage of this and use some custom components in your snippets. You can create your own or use some that are already built. They can all be found <Link fontWeight="bold" href="https://github.com/carlson-technologies/coffeeclass.io/tree/main/src/components" isExternal>here</Link>.
                    </Text>

                    <Heading as="h3" size="md" mt={8} mb={4}>
                        Tutorials
                    </Heading>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        Tutorials are longer articles that cover a larger range of knowledge. Here are some example tutorial titles to give you a better idea of what a tutorial consists of:
                    </Text>

                    <UnorderedList listStylePos="inside" color={useColorModeValue("gray.600", "gray.400")}>
                        <ListItem>
                            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                                Building a Personal Website With Next.js + Chakra-UI
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                                Building A TODO list app in Flutter
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                                An Introduction to Gatbsy - Building A Simple Blog
                            </Text>
                        </ListItem>
                    </UnorderedList>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        As you can see, tutorials are longer than snippets and cover much more. They usually involve building something using multiple tools - but not always. Check out an example of a tutorial <NextLink href="/articles/add-firebase-to-nextjs" passHref><Link href="/articles/add-firebase-to-nextjs" fontWeight="bold">here</Link></NextLink>.
                    </Text>

                    <Heading as="h3" size="md" mt={8} mb={4}>
                        Guides
                    </Heading>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        Guides are essentially cheat sheets. They cover a specific topic and cover everything about that topic. For example, here are some guide titles:
                    </Text>

                    <UnorderedList listStylePos="inside" color={useColorModeValue("gray.600", "gray.400")}>
                        <ListItem>
                            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                                A complete guide to next/image
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                                A complete guide to CSS grid
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                                A complete guide to firebase_auth pub.dev Flutter package
                            </Text>
                        </ListItem>
                    </UnorderedList>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        We try not to create guides about larger topics (like a full language or framework) because then it gets too long. These larger topics are taught through our course section.
                    </Text>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        You can create a new guide or add to a guide that is already made.
                    </Text>

                    <Heading as="h3" size="md" mt={8} mb={4}>
                        Courses
                    </Heading>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        Courses are where you can learn full languages and frameworks. They are essentially documentation with examples and exercises included. Think of the freeCodeCamp curriculum. If you want to see what courses we are currently working on, check out the <Link href="https://benjamincarlson.notion.site/609b8bb171844146a9bcd9fbabd171a8?v=341de17fff6149bea36dbafbe2f2cf88" isExternal fontWeight="bold">roadmap</Link>.
                    </Text>

                    <Heading as="h3" size="md" mt={8} mb={4}>
                        Conclusion
                    </Heading>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        And that&apos;s it! At the moment, coffeeclass.io is made up of those 4 types of content. If you still want to write, read on for more info!
                    </Text>

                    <Heading as="h2" size="lg" mt={8} mb={4} id="How to Submit">
                        How To Submit an Article
                    </Heading>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        Now that you know what types of articles we publish, it is time to write and submit your article. You can do this 2 ways.
                    </Text>

                    <Heading as="h3" size="md" mt={8} mb={4}>
                        Create a Pull Request
                    </Heading>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        The first way to submit an article is to create a pull request. Let&apos;s go through the steps.
                    </Text>

                    <Step number="1" title="Clone this repo" />

                    <Box p={3} mt={2} mb={4} borderRadius={2} bgColor={useColorModeValue("gray.100", "gray.900")}>
                        <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} m={2}><strong>git clone</strong> https://github.com/carlson-technologies/coffeeclass.io.git</Text>
                    </Box>

                    <Step number="2" title="Open This project and run `yarn`" />

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>Run <Code>yarn</Code> to install all the dependencies.</Text>

                    <Step number="3" title="Create a new branch" />

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>Use the command</Text>

                    <Box p={3} mt={2} mb={4} borderRadius={2} bgColor={useColorModeValue("gray.100", "gray.900")}>
                        <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} m={2}><strong>git checkout -b</strong> branch-name-here</Text>
                    </Box>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>to create a new branch. Use a name that relates to your article.</Text>

                    <Step number="4" title="Add the content!" />

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        Now is the time to add your content. If you are creating a snippet, add your <Code>.mdx</Code> file to the snippets folder. If you are creating a guide or tutorial, add it to the respective folder. Inside of the file add your metadata and content. Use <Link isExternal fontWeight="bold" href="https://raw.githubusercontent.com/carlson-technologies/coffeeclass.io/main/content/articles/make-div-float-up-hover-css.mdx">this link</Link> as a reference. A couple of other things to note, if you are creating a snippet, the <Code>logoImage</Code> is a picture of the logo. Check to see if we already have one in the public folder. To use custom components, create them in the components folder and import them inside of <Code>MDXComponents.js</Code>. For any images, create a folder inside of public with the same name as the <Code>.mdx</Code> file.
                    </Text>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        Don&apos;t be worried if something is not correct. When you create your pr we will review it and request any changes if necessary.
                    </Text>

                    <Step number="5" title="Create your author page" />

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        After your article is created, create a <Code>.mdx</Code> file inside of the authors folder. Use <Link isExternal fontWeight="bold" href="https://raw.githubusercontent.com/carlson-technologies/coffeeclass.io/main/content/authors/benjamin-carlson.mdx">this</Link> as a guide.
                    </Text>

                    <Heading as="h3" size="md" mt={8} mb={4}>
                        Email the Article to Us
                    </Heading>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        If that is too much, feel free to email (<Link href="mailto:ben@carlsontechnologies.dev" fontWeight="bold">ben@carlsontechnologies.dev</Link>) the article to us and we&apos;ll do all the heavy lifting. We&apos;d prefer if you emailed a link to the article (either a Google Doc or a shared Notion page) rather than emailing the entire article. Be sure to include the following info:
                    </Text>

                    <UnorderedList>
                        <ListItem>
                            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                                Your Name
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                                A Profile Picture
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                                Your Bio
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                                Your Social Links (5 max please)
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                                Article Name
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                                Article Description
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                                Article Tags (5 max please)
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                                Article Featured Image (If it&apos;s a tutorial)
                            </Text>
                        </ListItem>
                    </UnorderedList>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        Please note, we may lightly edit any articles you submit to fix correctness, grammar, flow, etc.
                    </Text>

                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} my={2}>
                        If you have any questions, feel free to reach out to us at <Link href="mailto:ben@carlsontechnologies.dev" fontWeight="bold">ben@carlsontechnologies.dev</Link>. Thanks for your interest in writing for coffeeclass.io!
                    </Text>

                </Flex>
            </Stack>
        </Container>
    )
}
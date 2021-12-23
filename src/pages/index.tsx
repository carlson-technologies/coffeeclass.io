import { useState } from "react";
import {
  Heading,
  Flex,
  Button,
  Text,
  Box,
  Link,
  Icon,
  useColorMode,
  useColorModeValue,
  SimpleGrid,
  AspectRatio,
  Skeleton,
} from "@chakra-ui/react";
import Container from "../components/Container";
import NextLink from "next/link";
import NextImage from "next/image";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { contentFilePaths, CONTENT_PATH } from "../scripts/mdx-utils";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Hero from "../components/Hero";
import TimeAgo from "../scripts/time-ago";

const url = "https://www.coffeeclass.io/";
const title = "coffeeclass.io Home";
const description =
  "Explore the latest programming and computer science articles and learn programming for free on coffeeclass.io.";

/*
(property) posts: {
    content: string;
    data: {
        [key: string]: any;
    };
    filePath: string;
}[]
*/
interface Props {
  posts: {
    content: string;
    data: {
      [key: string]: any;
    };
    filePath: string;
  }[];
}

export default function Index({ posts }: Props) {
  const { colorMode } = useColorMode();
  const bgImage = {
    light:
      "linear-gradient(to bottom,rgba(255,255,255, 0),rgba(255,255,255, 1) 90%)",
    dark: "linear-gradient(to bottom,rgba(0,0,0, 0),rgba(0,0,0, 1) 90%)",
  };

  const [loaded, setLoaded] = useState(false);

  const color = useColorModeValue("gray.500", "gray.400");
  const bgColor = useColorModeValue("gray.100", "gray.900");

  return (
    <Container title={title} description={description} url={url}>
      <Flex flexDir="column" maxW="110em">
        <Flex
          flexDir="column"
          as="section"
          bgColor={useColorModeValue("gray.100", "gray.900")}
        >
          <Hero />
        </Flex>

        <Box backgroundImage={bgImage[colorMode]} w="100%" h="2em" mt="-2em" />

        <Box mt="-12" p={5} zIndex={9}>
          <SimpleGrid
            minChildWidth={["100%", "100%", "100%", "100%", "250px", "250px"]}
            spacing="40px"
          >
            {posts
              .sort(
                (a, b) =>
                  Number(new Date(b.data.publishedAt)) -
                  Number(new Date(a.data.publishedAt))
              )
              .slice(0, 6)
              .map((post, index) => (
                <NextLink
                  href={`/articles/${post.filePath.replace(".mdx", "")}`}
                  passHref
                  key={index}
                >
                  <Link
                    href={`/articles/${post.filePath.replace(".mdx", "")}`}
                    _hover={{ textDecor: "none" }}
                  >
                    <Flex
                      flexDir="column"
                      bgColor={bgColor}
                      h="100%"
                      p={5}
                      borderRadius={5}
                      _hover={{
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                        transform: "scale(1.05)",
                      }}
                      transition="box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out"
                      justify="space-between"
                    >
                      <Box>
                        <Text
                          minW={120}
                          textAlign="center"
                          color={color}
                          fontSize="md"
                          mb={6}
                        >
                            {TimeAgo(new Date(post.data.publishedAt))}
                        </Text>
                        {post?.data?.logoImage && (
                          <Box>
                            <Box w={50} h={50} my={2} mx="auto">
                              <AspectRatio ratio={1}>
                                <Skeleton isLoaded={loaded}>
                                  <NextImage
                                    src={`/logos/${post.data.logoImage[0]}`}
                                    alt={post?.data?.logoImage[0]}
                                    layout="fill"
                                    onLoad={() => setLoaded(true)}
                                  />
                                </Skeleton>
                              </AspectRatio>
                            </Box>
                          </Box>
                        )}

                        {post?.data?.featureImg && (
                          <Flex justify="center">
                            <AspectRatio w="100%" ratio={16 / 9}>
                              <NextImage
                                src={`/content/articles/${post?.filePath.replace(
                                  ".mdx",
                                  ""
                                )}/${post?.data?.featureImg}`}
                                alt={post?.data?.title}
                                layout="fill"
                              />
                            </AspectRatio>
                          </Flex>
                        )}
                        <Heading as="h3" size="md" mt={4} fontWeight="normal">
                          {post.data.title}
                        </Heading>
                      </Box>
                      <Flex mt={4} align="center">
                        <Text color="brand_one.500" fontSize="lg">
                          Read article
                        </Text>
                        <Icon
                          color="brand_one.500"
                          as={ChevronRightIcon}
                          fontSize="2xl"
                        />
                      </Flex>
                    </Flex>
                  </Link>
                </NextLink>
              ))}
            <NextLink href={`/articles`} passHref>
              <Link href={`/articles`} _hover={{ textDecor: "none" }}>
                <Flex
                  bgColor={useColorModeValue("gray.100", "gray.900")}
                  h="100%"
                  p={5}
                  borderRadius={5}
                  _hover={{
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    transform: "scale(1.05)",
                  }}
                  transition="box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out"
                  align="center"
                  justify="center"
                >
                  <Heading
                    as="h3"
                    size="md"
                    fontWeight="normal"
                    textAlign="center"
                  >
                    All Articles
                  </Heading>
                </Flex>
              </Link>
            </NextLink>
          </SimpleGrid>
        </Box>

        <Flex
          as="section"
          flexDir="column"
          align="center"
          justify="space-around"
          mt={20}
          mx={2}
          px={2}
          mb={8}
        >
          <Heading
            as="h2"
            size="xl"
            letterSpacing="tight"
            mb={2}
            textTransform="uppercase"
          >
            Write For Us
          </Heading>
          <Text fontSize="xl" mt={2} mb={4} textAlign="center">
            Like to write code? Try writing about it!
          </Text>
          <NextLink href="/contribute/getting-started" passHref>
            <Button
              colorScheme="brand_one"
              w={["100%", "100%", "100%", 200, 200, 200]}
              to="/about"
            >
              See How
            </Button>
          </NextLink>
        </Flex>
      </Flex>
    </Container>
  );
}

export function getStaticProps() {
  const posts = contentFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(CONTENT_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { posts } };
}

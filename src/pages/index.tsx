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
  Divider,
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
import ArticleCard from "../components/ArticleCard";
import CourseCard from "../components/Courses/CourseCard";

const course = {
  title: "Chakra UI",
  path: "/courses/chakra-ui",
  slug: "chakra-ui",
  image: "chakra-ui.png",
  description:
    "Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.",
};

const url = "https://www.coffeeclass.io/";
const title = "coffeeclass.io Home";

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
    dark: "linear-gradient(to bottom,rgba(45,55,72, 0),rgba(45,55,72, .2) 90%)",
  };

  const [loaded, setLoaded] = useState(false);

  const color = useColorModeValue("gray.500", "gray.400");
  const bgColor = useColorModeValue("gray.100", "gray.900");

  return (
    <Container title={title} url={url}>
      <Flex flexDir="column" maxW="100vw">
        <Flex
          flexDir="column"
          as="section"
          bgColor={useColorModeValue("gray.100", "gray.900")}
        >
          <Hero />
        </Flex>

        <Box backgroundImage={bgImage[colorMode]} w="100%" h="2em" mt="-2em" />

        <Box maxW={1000} mx="auto" w="100%">
          <Heading
            as="h3"
            size="xl"
            fontFamily="lato"
            mb={2}
            fontWeight="medium"
            px={[2, 2, 2, 6, 10, 12]}
            mt={8}
          >
            Latest Course &mdash;
          </Heading>
        </Box>

        <CourseCard course={course} />

        <Box maxW={1000} mx="auto" w="100%">
          <Heading
            as="h3"
            size="xl"
            fontFamily="lato"
            mb={2}
            fontWeight="medium"
            px={[2, 2, 2, 6, 10, 12]}
            mt={8}
          >
            Latest Articles &mdash;
          </Heading>
        </Box>

        <Flex flexDir="column" px={[2, 2, 2, 6, 10, 12]} mx="auto">
          {posts.slice(0, 6).map((post, index) => (
            <ArticleCard key={index} article={post} />
          ))}

          <NextLink href={`/articles`} passHref>
            <Button
              w={300}
              mx="auto"
              as="a"
              href={`/articles`}
              rightIcon={<ChevronRightIcon />}
              size="lg"
              variant="outline"
              mt={8}
            >
              All Articles
            </Button>
          </NextLink>
        </Flex>

        <Divider my={20} w="80%" mx="auto" />

        <Flex
          as="section"
          flexDir="column"
          align="center"
          justify="space-around"
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

  posts.sort(
    (a, b) =>
      Number(new Date(b.data.publishedAt)) -
      Number(new Date(a.data.publishedAt))
  );

  return { props: { posts } };
}

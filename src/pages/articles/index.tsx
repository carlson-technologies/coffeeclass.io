import {
  Heading,
  Flex,
  Text,
  useColorModeValue,
  Wrap,
  Box,
  Link,
} from "@chakra-ui/react";
import Container from "../../components/Container";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { contentFilePaths, CONTENT_PATH } from "../../scripts/mdx-utils";
import ArticleCard from "../../components/ArticleCard";
import NextLink from "next/link";
import { useState } from "react";
import Pagination from "../../components/Pagination";
import Search from "../../components/Navigation/Search";

const url = "https://www.coffeeclass.io/articles";
const title = "Articles";
const description =
  "Read all coffeeclass.io articles on programming and computer science for free.";

type Post = {
  content: string;
  data: {
    [key: string]: any;
  };
  filePath: string;
};

interface Props {
  posts: Post[];
}

const tags = [
  "react",
  "flutter",
  "chakra-ui",
  "firebase",
  "terminal",
  "mdx",
  "dart",
  "nextjs",
];

export default function Index({ posts }: Props) {
  const color = useColorModeValue("gray.500", "gray.400");
  const color2 = useColorModeValue("gray.500", "gray.400");
  const color3 = useColorModeValue("gray.700", "gray.300");
  const bgColor = useColorModeValue("gray.100", "gray.700");

  const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(10);

  return (
    <Container title={title} description={description} url={url}>
      <Flex flexDir="column" px={[2, 2, 2, 6, 10, 12]}>
        <Text
          as="small"
          textTransform="uppercase"
          mt={4}
          mb={1}
          fontFamily="lato"
          color={useColorModeValue("gray.600", "gray.400")}
          fontSize="sm"
        >
          {posts.length} articles
        </Text>
        <Heading
          as="h1"
          size="2xl"
          fontFamily="lato"
          mb={2}
          fontWeight="medium"
        >
          Articles
        </Heading>
        <Flex>
          <Flex flexDir="column">
            {sliceStart >= 20 && (
              <Box bgColor={bgColor} m={4} p={5} borderRadius={15}>
                <Text fontSize="lg" color={color3}>
                  Looking for a specific article? Try a <Search is404 />!
                </Text>
              </Box>
            )}

            {posts.slice(sliceStart, sliceEnd).map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}

            <Pagination
              total={posts.length}
              sliceStart={sliceStart}
              sliceEnd={sliceEnd}
              setSliceStart={setSliceStart}
              setSliceEnd={setSliceEnd}
            />
          </Flex>
          <Flex
            display={["none", "none", "none", "none", "none", "flex"]}
            flexDir="column"
            w={200}
          >
            <Text
              mb={2}
              textTransform="uppercase"
              color={useColorModeValue("gray.600", "gray.400")}
              fontSize="sm"
              fontWeight="semibold"
            >
              Browse Popular Tags
            </Text>
            <Wrap>
              {tags.map((tag, index) => {
                return (
                  <NextLink href={`/tags/${tag}`} key={index} passHref>
                    <Link
                      href={`/tags/${tag}`}
                      color={color}
                      fontSize="sm"
                      fontWeight="semibold"
                      _hover={{
                        textDecor: "none",
                      }}
                    >
                      <Box
                        px={3}
                        py={1}
                        border="1px"
                        borderRadius={5}
                        borderColor={color2}
                        transition=".1s background-color ease-in-out"
                        _hover={{
                          backgroundColor: color2,
                          color: "white",
                        }}
                      >
                        #{tag}
                      </Box>
                    </Link>
                  </NextLink>
                );
              })}
              <NextLink href={`/tags`} passHref>
                <Link
                  href={`/tags`}
                  color={useColorModeValue("gray.500", "gray.400")}
                  fontSize="sm"
                  fontWeight="semibold"
                  _hover={{
                    textDecor: "none",
                  }}
                >
                  <Box
                    px={3}
                    py={1}
                    border="1px"
                    borderRadius={5}
                    borderColor={useColorModeValue("gray.500", "gray.400")}
                    transition=".1s background-color ease-in-out"
                    backgroundColor={useColorModeValue("gray.500", "gray.400")}
                    color="white"
                    _hover={{
                      backgroundColor: "transparent",
                      color: useColorModeValue("black", "white"),
                    }}
                  >
                    View All
                  </Box>
                </Link>
              </NextLink>
            </Wrap>
          </Flex>
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

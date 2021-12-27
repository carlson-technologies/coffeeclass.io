import {
  Heading,
  Flex,
  Stack,
  useColorMode,
  Text,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import Container from "../../components/Container";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { authorsFilePaths, AUTHORS_PATH } from "../../scripts/mdx-utils";
import AuthorCard from "../../components/AuthorCard";

const url = "https://www.coffeeclass.io/authors";
const title = "Authors";
const description = "All authors on coffeeclass.io.";

interface IIndex {
  authors: IAuthor;
}

interface IAuthor {
  [x: string]: any;
  content: string;
  data: {
    [key: string]: any;
  };
  filePath: string;
}

export default function Index({ authors }: IIndex) {
  return (
    <Container title={title} description={description} url={url}>
      <Stack spacing={8} px={4}>
        <Flex flexDir="column">
          <Heading mt={4} as="h1" size="2xl" color="brand_one.500">
            Authors
          </Heading>
          <Box
            bgColor="brand_one.500"
            h={2}
            w={150}
            borderRadius={5}
            mb={4}
            mt={2}
          />
          <SimpleGrid columns={[1, 1, 1, 2, 2, 3]} spacing={10}>
            {authors.map((author: IAuthor, index: number) => (
              <AuthorCard key={index} author={author} />
            ))}
          </SimpleGrid>
        </Flex>
      </Stack>
    </Container>
  );
}

export function getStaticProps() {
  const authors = authorsFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(AUTHORS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { authors } };
}

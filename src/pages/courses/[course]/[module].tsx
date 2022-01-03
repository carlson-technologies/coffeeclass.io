import fs from "fs";
import matter from "gray-matter";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import path from "path";
import Layout from "../../../layouts/course";
import { getCourseFilePaths, COURSE_PATH } from "../../../scripts/mdx-utils";
import MDXComponents from "../../../components/MDXComponents";
import mdxPrism from "mdx-prism";
import readingTime from "reading-time";
import { motion } from "framer-motion";
import Pagination from "../../../components/Courses/Pagination";
import { parseISO, format } from "date-fns";
import getHeaders from "../../../scripts/get-headings";
import {
  Heading,
  Text,
  Box,
  Flex,
  useColorModeValue,
  useColorMode,
  Link,
  Icon,
} from "@chakra-ui/react";
import Ad from "../../../components/Content/Ad";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import HeadersAccordion from "../../../components/HeadersAccordion";

interface Props {
  source: any;
  frontMatter: any;
  params: {
    course: string;
    module: string;
  };
}

export default function PostPage({ source, frontMatter, params }: Props) {
  return (
    <Layout frontMatter={frontMatter}>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box>
          <Heading as="h1" size="2xl" letterSpacing="tight" mb={2} mt={6}>
            {frontMatter.title}
          </Heading>
          <Text color={useColorModeValue("gray.600", "gray.400")} fontSize="xl">
            {frontMatter.description}
          </Text>
          <Box display={["auto", "auto", "auto", "auto", "auto", "none"]}>
            <HeadersAccordion headers={frontMatter?.headers} />
          </Box>
        </Box>
        <Flex flexDir="column" id="main-content">
          <Ad />
          <MDXRemote {...source} components={MDXComponents} />
        </Flex>
        <Box mb={2} mt={10}>
          {frontMatter.updatedAt && (
            <Text color="gray.500" fontSize="sm" textAlign="center">
              Last updated on{" "}
              {format(
                parseISO(frontMatter.updatedAt || frontMatter.publishedAt),
                "MMMM dd, yyyy"
              )}
            </Text>
          )}
        </Box>
        <Flex align="center" justify="center" mb={4}>
          <Link textDecor="underline" _hover={{ opacity: 0.8 }} w="fit-content">
            <Icon as={ExternalLinkIcon} mr={2} />
            <Link
              href={`https://github.com/carlson-technologies/coffeeclass.io/tree/main/content/courses/${params.course}/${params.module}.mdx`}
              isExternal
            >
              Edit on GitHub
            </Link>
          </Link>
        </Flex>
        <Pagination />
      </motion.div>
    </Layout>
  );
}

interface PropsProps {
  params: {
    course: string;
    module: string;
  };
}

export const getStaticProps = async ({ params }: PropsProps) => {
  const modulePath =
    COURSE_PATH + `/${params.course}/` + `${params.module}.mdx`;
  const moduleSource = fs.readFileSync(modulePath);
  const { content, data } = matter(moduleSource);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [require("remark-code-titles"), rehypeAutolinkHeadings],
      rehypePlugins: [mdxPrism],
    },
    scope: data,
  });

  return {
    props: {
      params,
      source: mdxSource,
      frontMatter: {
        readingTime: readingTime(content),
        headers: await getHeaders(content),
        ...data,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const paths = getCourseFilePaths(COURSE_PATH)
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((module) => ({
      params: {
        course: module.split("/").slice(-2)[0],
        module: module.split("/").pop(),
      },
    }));

  return {
    paths,
    fallback: false,
  };
};

import { useState } from "react";
import {
  Heading,
  Text,
  Flex,
  Link,
  Stack,
  Box,
  useColorModeValue,
  Badge,
  IconButton,
  Tooltip,
  Button,
  AspectRatio,
  Skeleton,
} from "@chakra-ui/react";
import Container from "../../../components/Container";
import NextLink from "next/link";
import { FiYoutube } from "react-icons/fi";
import {
  getCourseFilePaths,
  COURSE_PATH,
  getCourseFolders,
} from "../../../scripts/mdx-utils";
import { useRouter } from "next/router";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NextImage from "next/image";
// Course routes below
import chakraUISidebar from "../../../configs/courses/chakra-ui.json";
import dataStructuresSidebar from "../../../configs/courses/data-structures.json";
import algorithmsSidebar from "../../../configs/courses/algorithms.json";
import algoliaNextInstantSearchSidebar from "../../../configs/courses/nextjs-algolia-instantsearch.json";
import ModuleBadge from "../../../components/Courses/ModuleBadge";

interface Props {
  files: string[];
  course: string;
}

export default function ChakraUI({ files, course }: Props) {
  const configMap: any = {
    "chakra-ui": chakraUISidebar,
    "data-structures": dataStructuresSidebar,
    algorithms: algorithmsSidebar,
    "nextjs-algolia-instantsearch": algoliaNextInstantSearchSidebar,
  };

  const { query } = useRouter();
  const c = query.course;

  const modules: any = configMap[c.toString()].routes;

  if (process.env.NODE_ENV === "development") {
    console.log("courses: " + files);
    console.log("course: " + JSON.stringify(course));
  }

  const bgColor = useColorModeValue("#fff", "#15161a");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const color = useColorModeValue("gray.600", "gray.400");

  const [loaded, setLoaded] = useState(false);

  let courseCount = 0;

  const url = `https://www.coffeeclass.io/${c}`;
  const title = `${configMap[c.toString()].title} Complete Course`;
  const description = configMap[c.toString()].description;

  return (
    <Container title={title} description={description} url={url}>
      <Stack spacing={8}>
        <Flex flexDir="column">
          <Box maxW={1000} minH="100vh" alignSelf="center" w="100%">
            <Box px={4}>
              <Box
                w={100}
                h={100}
                mx="auto"
                mt={10}
                css={{
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
                }}
                borderRadius={5}
                p={2}
                bgColor={useColorModeValue(
                  "rgba(255, 255, 255, .2)",
                  "rgba(26, 32, 44, .2)"
                )}
              >
                <AspectRatio ratio={1}>
                  <Skeleton isLoaded={loaded}>
                    <NextImage
                      src={`/logos/${configMap[c.toString()].image}`}
                      alt={`Image of ${configMap[c.toString()].title} Logo`}
                      layout="fill"
                      onLoad={() => setLoaded(true)}
                    />
                  </Skeleton>
                </AspectRatio>
              </Box>
              <Heading as="h1" size="2xl" mb={4} mt={5} textAlign="center">
                {configMap[c.toString()].title} Course Road Map 🚗
              </Heading>
              <Text mb={8} textAlign="center" fontSize="large">
                {configMap[c.toString()].description}
              </Text>
              <Flex justify="center">
                <NextLink href={modules[0].routes[0].path} passHref>
                  <Button
                    size="lg"
                    rightIcon={<ChevronRightIcon />}
                    colorScheme={configMap[c.toString()].color}
                    href={modules[0].routes[0].path}
                    as="a"
                  >
                    Start Course
                  </Button>
                </NextLink>
              </Flex>
            </Box>
            {modules.map((item: any, index: number) => (
              <>
                <Heading
                  as="h2"
                  textTransform="uppercase"
                  mt={4}
                  mb={2}
                  color={color}
                  fontSize="md"
                  fontWeight="semibold"
                  px={[2, 2, 2, 2, 2, 0]}
                  key={index}
                >
                  {item.title}
                </Heading>
                <>
                  {item?.routes?.map(
                    (item: any) => (
                      courseCount++,
                      (
                        <NextLink href={item.path} key={courseCount} passHref>
                          <Link
                            href={item.path}
                            _hover={{ textDecor: "none" }}
                            as="button"
                            textAlign="left"
                            disabled={item.tag == "coming soon"}
                            _disabled={{
                              opacity: 0.5,
                              cursor: "not-allowed",
                            }}
                            w="100%"
                          >
                            <Flex
                              transition="transform .5s"
                              _hover={{
                                transform: "translateY(-4px)",
                                boxShadow: "lg",
                              }}
                              bgColor={bgColor}
                              border="1px solid"
                              borderColor={borderColor}
                              borderRadius={5}
                              p={5}
                              align="center"
                              justify="space-between"
                            >
                              <Flex align="center">
                                <Text mr={4} fontSize="lg">
                                  {courseCount}.
                                </Text>
                                <Flex flexDir="column">
                                  <Flex align="center">
                                    <Heading as="h3" size="md" mr={2}>
                                      {item.title}
                                    </Heading>
                                    <ModuleBadge item={item} />
                                  </Flex>
                                  <Text mt={1}>{item.description}</Text>
                                </Flex>
                              </Flex>
                              {item.hasVideo && (
                                <>
                                  <Tooltip
                                    label="This module includes a video!"
                                    placement="top"
                                  >
                                    <IconButton
                                      isExternal
                                      target="_blank"
                                      borderRadius={5}
                                      icon={<FiYoutube />}
                                      fontSize="20px"
                                      aria-label="YouTube"
                                      bgColor="transparent"
                                      color="red.500"
                                      _hover={{
                                        backgroundColor: "transparent",
                                      }}
                                      p={[1, 2, 4]}
                                      ml={1}
                                      w={50}
                                    />
                                  </Tooltip>
                                </>
                              )}
                            </Flex>
                          </Link>
                        </NextLink>
                      )
                    )
                  )}
                </>
              </>
            ))}
            <Flex justify="center" my={8}>
              <NextLink href={modules[0].routes[0].path} passHref>
                <Button
                  size="lg"
                  rightIcon={<ChevronRightIcon />}
                  colorScheme={configMap[c.toString()].color}
                  href={modules[0].routes[0].path}
                  as="a"
                >
                  Start Course
                </Button>
              </NextLink>
            </Flex>
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}

export function getStaticProps({ params }: any) {
  const paths = params;

  // get the mdx files inside of the course folder
  const s = COURSE_PATH + "/" + paths.course;
  const files = getCourseFilePaths(s); // , paths

  return {
    props: {
      files,
      course: paths,
    },
  };
}

export async function getStaticPaths() {
  const paths = getCourseFolders(COURSE_PATH).map((item) => ({
    params: {
      course: item,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

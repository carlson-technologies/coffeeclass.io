import {
  Heading,
  Text,
  Flex,
  Link,
  Stack,
  Box,
  useColorModeValue,
  Image,
  Badge,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import lessons from "../../../configs/courses/chakra-ui.json";
import Container from "../../../components/Container";
import NextLink from "next/link";
import { FiYoutube } from "react-icons/fi";
import {
  getCourseFilePaths,
  COURSE_PATH,
  getCourseFolders,
} from "../../../scripts/mdx-utils";
import chakraUISidebar from "../../../configs/courses/chakra-ui.json";
import dataStructuresSidebar from "../../../configs/courses/data-structures.json";
import { useRouter } from "next/router";

interface Props {
  files: string[];
  course: string;
}

export default function ChakraUI({ files, course }: Props) {
  const configMap: any = {
    "chakra-ui": chakraUISidebar,
    "data-structures": dataStructuresSidebar,
  };

  console.log(files);

  const { query } = useRouter();
  const c = query.course;

  const modules: any = configMap[c.toString()].routes;

  // console.log("courses: " + files);
  // console.log("course: " + JSON.stringify(course));
  const bgColor = useColorModeValue("#fff", "#15161a");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const color = useColorModeValue("gray.600", "gray.400");

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
              <Flex justify="center" mt={10}>
                <Image
                  src={`/logos/${configMap[c.toString()].image}`}
                  w={100}
                  justifySelf="center"
                  alt={`Image of ${configMap[c.toString()].title} Logo`}
                />
              </Flex>
              <Heading as="h1" size="2xl" mb={4} mt={5} textAlign="center">
                {configMap[c.toString()].title} Course Road Map 🚗
              </Heading>
              <Text mb={8} textAlign="center" fontSize="large">
                {configMap[c.toString()].description}
              </Text>
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
                            disabled={item.tag == "coming soon" && true}
                            _disabled={{
                              opacity: 0.5,
                              cursor: "not-allowed",
                            }}
                            w="100%"
                          >
                            <Flex
                              // _hover={{
                              //   transform: "scale(1.01)",
                              //   boxShadow: boxShadow,
                              // }}
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
                                  <Heading as="h3" size="md">
                                    {item.title}
                                  </Heading>
                                  <Text mt={1}>{item.description}</Text>
                                  <Text>
                                    {item.tag == "coming soon" && (
                                      <Badge>Coming Soon!</Badge>
                                    )}
                                  </Text>
                                  <Text>
                                    {item.tag == "new" && <Badge>New!</Badge>}
                                  </Text>
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

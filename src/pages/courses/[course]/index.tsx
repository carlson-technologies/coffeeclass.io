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

const url = "https://www.coffeeclass.io/chakra-ui";
const title = "Chakra UI Complete Course";
const description =
  "Learn the css framework Chakra UI though our easy to follow, step by step course modules.";

interface Props {
  files: string[];
  course: string;
}

export default function ChakraUI({ files, course }: Props) {
  console.log("courses: " + files);
  console.log("course: " + JSON.stringify(course));
  const data = lessons.routes;
  const boxShadow = useColorModeValue(
    "0px 8px 26px rgba(0, 0, 0, 0.25)",
    "0px 8px 26px rgba(255, 255, 255, 0.1)"
  );
  const bgColor = useColorModeValue("#fff", "#15161a");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const color = useColorModeValue("gray.600", "gray.400");

  let courseCount = 0;

  return (
    <Container title={title} description={description} url={url}>
      <Stack spacing={8}>
        <Flex flexDir="column">
          <Box maxW={1000} minH="100vh" alignSelf="center" w="100%">
            <Box px={4}>
              <Flex justify="center" mt={10}>
                <Image
                  src={`/logos/${lessons.image}`}
                  w={100}
                  justifySelf="center"
                  alt={`Image of ${lessons.title} Logo`}
                />
              </Flex>
              <Heading as="h1" size="2xl" mb={4} mt={5} textAlign="center">
                {lessons.title} Course Road Map 🚗
              </Heading>
              <Text mb={8} textAlign="center" fontSize="large">
                {lessons.description}
              </Text>
            </Box>
            {data.map((item, index) => (
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
                >
                  {item.title}
                </Heading>
                <>
                  {item?.routes?.map(
                    (item) => (
                      courseCount++,
                      (
                        <NextLink href={item.path} key={item.title} passHref>
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
                              _hover={{
                                transform: "scale(1.05)",
                                boxShadow: boxShadow,
                              }}
                              transition="transform .5s, box-shadow .5s"
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
                              {/* {item.hasVideo && (
                                <>
                                  <Tooltip label="Has Video!" placement="top">
                                    <IconButton
                                      isExternal
                                      target="_blank"
                                      borderRadius={5}
                                      icon={<FiYoutube />}
                                      fontSize="20px"
                                      aria-label="YouTube"
                                      href="https://youtube.com/benjamincarlson"
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
                              )} */}
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

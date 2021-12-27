import { useState, ReactChild } from "react";
import {
  Heading,
  Flex,
  Stack,
  Text,
  Divider,
  useColorMode,
  SkeletonCircle,
  useColorModeValue,
  Link,
  OrderedList,
  ListItem,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import Container from "../../components/Container";
import subjects from "../../configs/courses.json";
import Image from "next/image";
import NextLink from "next/link";

const url = "https://www.coffeeclass.io/courses";
const title = "Courses";
const description =
  "Learn programming languages and frameworks through our easy to follow, interactive courses.";

interface Props {
  path: string;
  logo: string;
  children: ReactChild[];
}

const Wrapper = ({ path, logo, children }: Props) => {
  const { colorMode } = useColorMode();
  const boxShadowColor = {
    light: "0px 8px 26px rgba(0, 0, 0, 0.1)",
    dark: "0px 8px 26px rgba(255, 255, 255, 0.1)",
  };
  const bgLogo = {
    light: "green.100",
    dark: "green.500",
  };

  const [loaded, setLoaded] = useState(false);
  return (
    <NextLink href={path} passHref>
      <Link
        href={path}
        mt={2}
        mr={2}
        _hover={{ textDecor: "none" }}
      >
        <Flex
          _hover={{
            boxShadow: boxShadowColor[colorMode],
          }}
          borderRadius={15}
          transition="box-shadow 0.3s ease-in-out"
          flexDir={["column", "column", "column", "column", "row", "row"]}
        >
          <Flex p={4} bgColor={bgLogo[colorMode]}>
            <Flex justify="center" align="center" mx="auto">
              <SkeletonCircle isLoaded={loaded} h={100} w={100}>
                <Image
                  src={`/logos/${logo}`}
                  alt={`logo for ${logo}`}
                  height={100}
                  width={100}
                  onLoad={() => setLoaded(true)}
                />
              </SkeletonCircle>
            </Flex>
          </Flex>
          <Flex flexDir="column" p={4} minW={[0, 0, 0, 0, 450, 450]}>
            {children}
          </Flex>
        </Flex>
      </Link>
    </NextLink>
  );
};

export default function Index() {
  const data = subjects.routes;
  const dividerBorder = useColorModeValue("blackAlpha.300", "gray.300");
  const color = useColorModeValue("gray.400", "gray.600");

  return (
    <Container title={title} description={description} url={url}>
      <Stack spacing={8} px={4}>
        <Flex flexDir="column">
          <Heading mt={4} as="h1" size="2xl" color="brand_one.500">
            Courses 🎒
          </Heading>

          <Box
            bgColor="brand_one.500"
            h={2}
            w={150}
            borderRadius={5}
            mb={4}
            mt={2}
          />
          <SimpleGrid
            minChildWidth={["100%", "100%", "100%", "100%", "600px", "600px"]}
            gap={6}
          >
            {data.map((item, index) => {
              return (
                <Wrapper key={index} path={item.path} logo={item.image}>
                  <Heading textAlign="center" mx={2} mb={2} as="h2">
                    {item.title}
                  </Heading>
                  <Text textAlign="center" mx={2}>
                    {item.description}
                  </Text>
                  <Divider borderColor={dividerBorder} my={4} />
                  <OrderedList spacing={4} listStylePos="inside">
                    {item["first-5-lessons"].map((lesson, index) => {
                      return (
                        <ListItem key={index} color="gray.500">
                          {lesson.title}
                        </ListItem>
                      );
                    })}
                  </OrderedList>
                  <Text
                    fontSize="sm"
                    textTransform="uppercase"
                    color={color}
                    mt={2}
                  >
                    and more...
                  </Text>
                </Wrapper>
              );
            })}
          </SimpleGrid>
        </Flex>
      </Stack>
    </Container>
  );
}

// export function getStaticProps() {
//   // gets a string array of all folders in the courses folder. These are the courses
//   let courses = getCourseFolders(COURSE_PATH);

//   return { props: { courses } };
// }

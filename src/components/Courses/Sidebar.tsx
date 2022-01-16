import { useState } from "react";
import { useRouter } from "next/router";
import chakraUISidebar from "../../configs/courses/chakra-ui.json";
import dataStructuresSidebar from "../../configs/courses/data-structures.json";
import {
  Box,
  Flex,
  Text,
  Heading,
  Link,
  useColorMode,
  Divider,
  Badge,
  SkeletonCircle,
  AspectRatio,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const Sidebar = ({
  course,
  display,
  setDisplay,
  courseHeaderDisplay,
  setCourseHeaderDisplay,
}: any) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const { colorMode } = useColorMode();
  const sideBarActiveColor = {
    light: "gray.300",
    dark: "gray.600",
  };
  const sideBarHoverColor = {
    light: "gray.300",
    dark: "gray.600",
  };

  const configMap: any = {
    "chakra-ui": chakraUISidebar,
    "data-structures": dataStructuresSidebar,
  };

  const modules: any = configMap[course].routes;
  // console.log(JSON.stringify(modules))

  const color = useColorModeValue("gray.600", "gray.400");

  return (
    <Box>
      <Box
        as="aside"
        aria-label="Sidebar Navigation"
        sx={{
          overscrollBehavior: "contain",
        }}
        overflowY="auto"
        flexShrink={0}
        h="fit-content"
        maxH="calc(100vh - 50px)"
        id="sidebar"
        onMouseEnter={() => {
          setCourseHeaderDisplay("flex");
        }}
        onMouseLeave={() => {
          setCourseHeaderDisplay("none");
        }}
      >
        <Flex flexDirection="column" w={300}>
          <IconButton
            _hover={{
              bgColor: useColorModeValue("gray.200", "gray.800"),
            }}
            opacity={courseHeaderDisplay == "flex" ? 1 : 0}
            aria-label="Close Sidebar"
            icon={<ChevronLeftIcon fontSize="24px" />}
            size="md"
            pos="absolute"
            top={0}
            right={0}
            m={4}
            onClick={() => {
              setDisplay(display === "none" ? "flex" : "none");
              localStorage.setItem(
                "sidebarDisplay",
                display === "none" ? "flex" : "none"
              );
            }}
          />
          <Flex flexDirection="column" alignItems="center" id="logo" mt={4}>
            <SkeletonCircle isLoaded={loaded}>
              <NextLink href="/courses/chakra-ui" passHref>
                <Link href="/courses/chakra-ui">
                  <AspectRatio ratio={1}>
                    <Image
                      src={`/logos/${configMap[course].image}`}
                      alt={configMap[course].title}
                      layout="fill"
                      onLoad={() => setLoaded(true)}
                    />
                  </AspectRatio>
                </Link>
              </NextLink>
            </SkeletonCircle>
            <Heading as="h4" size="md" my={4}>
              Modules 🔖
            </Heading>
          </Flex>
          {modules.map((item: any, index: number) => (
            <>
              <Divider my={4} display={index == 0 && "none"} />
              <Heading
                as="h2"
                textTransform="uppercase"
                mt={4}
                mb={2}
                color={color}
                fontSize="md"
                fontWeight="semibold"
                key={item.title}
                px={4}
              >
                {item.title}
              </Heading>
              <>
                {item?.routes?.map((item: any) => (
                  <NextLink href={item.path} key={item.title} passHref>
                    <Link
                      href={item.path}
                      _hover={{
                        textDecoration: "none",
                      }}
                      as="button"
                      textAlign="left"
                      disabled={item.tag == "coming soon" && true}
                      _disabled={{
                        opacity: 0.5,
                        cursor: "not-allowed",
                      }}
                      w="100%"
                    >
                      <Box
                        _hover={{
                          textDecoration: "none",
                          backgroundColor: item.path.includes(
                            router.query.module
                          )
                            ? sideBarActiveColor[colorMode]
                            : sideBarHoverColor[colorMode],
                        }}
                        transition="background-color .15s ease-in-out"
                        w="100%"
                        borderRadius={2}
                        py={2}
                        px={4}
                        backgroundColor={
                          item.path.includes(router.query.module)
                            ? sideBarActiveColor[colorMode]
                            : null
                        }
                      >
                        <Flex flexDir="column">
                          <Text py="1px" pl={1}>
                            {item.title}
                          </Text>
                          {item.tag && (
                            <Badge
                              w="fit-content"
                              colorScheme={
                                item.tag == "new" ? "green" : "purple"
                              }
                            >
                              {item.tag}
                            </Badge>
                          )}
                        </Flex>
                      </Box>
                    </Link>
                  </NextLink>
                ))}
              </>
            </>
          ))}
        </Flex>
      </Box>
      <Flex
        borderTop={`1px solid ${useColorModeValue("#E2E8F0", "#A0AEC0")}`}
        h="50px"
        alignItems="center"
      >
        <Heading
          as="h3"
          textTransform="uppercase"
          color={useColorModeValue("gray.600", "gray.400")}
          fontSize="sm"
          fontWeight="semibold"
          letterSpacing="wider"
          textAlign="left"
          pl={2}
        >
          {configMap[course].title}{" "}
          {configMap[course].version ? ` - ${configMap[course].version}` : ""}
        </Heading>
      </Flex>
    </Box>
  );
};

export default Sidebar;

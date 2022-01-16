import { useRouter } from "next/router";
import chakraUISidebar from "../../configs/courses/chakra-ui.json";
import dataStructuresSidebar from "../../configs/courses/data-structures.json";
import { Flex, Text, Link, useColorMode, Icon, Button } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

const Pagination = () => {
  const { query } = useRouter();
  const course = query.course;

  const configMap: any = {
    "chakra-ui": chakraUISidebar,
    "data-structures": dataStructuresSidebar,
  };

  const modules: any = configMap[course.toString()].routes;

  const { colorMode } = useColorMode();
  const color = {
    light: "gray.600",
    dark: "gray.400",
  };

  const pagination = getPagination(modules);

  function getPagination(modules: any): any {
    let data = {};
    let routesWithTitlesRemoved = [];

    // remove the section headers from the routes
    for (var i = 0; i < modules.length; i++) {
      for (var j = 0; j < modules[i].routes.length; j++) {
        routesWithTitlesRemoved.push(modules[i].routes[j]);
      }
    }

    for (var i = 0; i < routesWithTitlesRemoved.length; i++) {
      const curr = routesWithTitlesRemoved[i];

      if (curr && curr.path.includes(query.module)) {
        const prevRoute = routesWithTitlesRemoved[i - 1];
        const nextRoute = routesWithTitlesRemoved[i + 1];

        data = {
          prevRoute,
          nextRoute,
        };
      }
    }

    return data;
  }

  return (
    <Flex
      as="section"
      justify="space-between"
      align="center"
      w="100%"
      color={color[colorMode]}
      flexDir={["column", "column", "column", "row", "row", "row"]}
      mb={8}
    >
      {pagination.prevRoute ? (
        <NextLink href={pagination.prevRoute.path} passHref>
          <Link href={pagination.prevRoute.path}>
            <Button
              variant="ghost"
              textAlign="right"
              w={["100vw", "100vw", "100vw", 200, 300, 300]}
              mb={pagination.nextRoute && 4}
            >
              <Flex align="center">
                <Icon as={ChevronLeftIcon} mr={2}></Icon>
                <Flex flexDir="column">
                  <Text as="small" mb={1}>
                    Previous Module
                  </Text>
                  <Text>{pagination.prevRoute.title}</Text>
                </Flex>
              </Flex>
            </Button>
          </Link>
        </NextLink>
      ) : (
        <Text></Text>
      )}
      {pagination.nextRoute ? (
        <NextLink href={pagination.nextRoute.path} passHref>
          <Link href={pagination.nextRoute.path}>
            <Button
              variant="ghost"
              textAlign="right"
              w={["100vw", "100vw", "100vw", 200, 300, 300]}
            >
              <Flex align="center">
                <Flex flexDir="column">
                  <Text as="small" mb={1}>
                    Next Module
                  </Text>
                  <Text>{pagination.nextRoute.title}</Text>
                </Flex>
                <Icon as={ChevronRightIcon} ml={2}></Icon>
              </Flex>
            </Button>
          </Link>
        </NextLink>
      ) : (
        <Text></Text>
      )}
    </Flex>
  );
};

export default Pagination;

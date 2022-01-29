import {
  Flex,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  IconButton,
  Box,
  Badge,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NavBarDrawer from "../Navigation/NavbarDrawer";
import NextLink from "next/link";
import { FiCoffee } from "react-icons/fi";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

export default function CourseHeader({
  title,
  course,
  display,
  setDisplay,
  courseHeaderDisplay,
  setCourseHeaderDisplay,
}: any) {
  // a switch statement that takes in the slug and returns the title
  const courseTitle =
    course === "chakra-ui"
      ? "Chakra UI"
      : course === "data-structures"
      ? "Data Structures"
      : course === "algorithms"
      ? "Algorithms"
      : course === "nextjs-algolia-instantsearch"
      ? "Algolia InstantSearch"
      : "";

  return (
    <Flex
      bgColor={useColorModeValue("#fff", "gray.800")}
      align="center"
      justify="space-between"
      w="100%"
      px={4}
      onMouseEnter={() => {
        setCourseHeaderDisplay("flex");
      }}
      onMouseLeave={() => {
        setCourseHeaderDisplay("none");
      }}
    >
      <IconButton
        _hover={{
          bgColor: useColorModeValue("gray.200", "gray.700"),
        }}
        opacity={display == "flex" ? 0 : courseHeaderDisplay == "flex" ? 1 : 0}
        display={[
          "none",
          "none",
          "none",
          "none",
          "none",
          display == "flex" ? "none" : "flex",
        ]}
        bgColor="transparent"
        aria-label="Close Sidebar"
        icon={<HiOutlineChevronDoubleRight fontSize="20px" />}
        m={4}
        onClick={() => {
          setDisplay(display === "none" ? "flex" : "none");
          localStorage.setItem(
            "sidebarDisplay",
            display === "none" ? "flex" : "none"
          );
        }}
      />

      <Breadcrumb
        spacing="0px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem
          display={[
            "none",
            "none",
            "none",
            "none",
            "inline-flex",
            "inline-flex",
          ]}
        >
          <NextLink href="/" passHref>
            <BreadcrumbLink
              href="/"
              px={2}
              py={1}
              borderRadius={5}
              transition="background-color 0.2s ease-in-out"
              _hover={{
                textDecor: "none",
                bgColor: useColorModeValue("gray.200", "gray.700"),
              }}
            >
              coffeeclass.io
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>

        <BreadcrumbItem
          display={[
            "inline-flex",
            "inline-flex",
            "inline-flex",
            "inline-flex",
            "none",
            "none",
          ]}
        >
          <NextLink href="/" passHref>
            <BreadcrumbLink
              href="/"
              px={2}
              py={1}
              borderRadius={5}
              transition="background-color 0.2s ease-in-out"
              _hover={{
                textDecor: "none",
                bgColor: useColorModeValue("gray.200", "gray.700"),
              }}
            >
              <Icon fontSize="lg" as={FiCoffee} />
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>

        <BreadcrumbItem
          display={[
            "none",
            "none",
            "none",
            "none",
            "inline-flex",
            "inline-flex",
          ]}
        >
          <NextLink href="/courses" passHref>
            <BreadcrumbLink
              href="/courses"
              px={2}
              py={1}
              borderRadius={5}
              transition="background-color 0.2s ease-in-out"
              _hover={{
                textDecor: "none",
                bgColor: useColorModeValue("gray.200", "gray.700"),
              }}
            >
              Courses
              <Badge ml={1}>Beta</Badge>
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>

        <BreadcrumbItem
          display={[
            "none",
            "none",
            "none",
            "none",
            "inline-flex",
            "inline-flex",
          ]}
        >
          <NextLink href={`/courses/${course}`} passHref>
            <BreadcrumbLink
              href={`/courses/${course}`}
              px={2}
              py={1}
              borderRadius={5}
              transition="background-color 0.2s ease-in-out"
              _hover={{
                textDecor: "none",
                bgColor: useColorModeValue("gray.200", "gray.700"),
              }}
            >
              {courseTitle}
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>

        <BreadcrumbItem
          display={[
            "inline-flex",
            "inline-flex",
            "inline-flex",
            "inline-flex",
            "none",
            "none",
          ]}
        >
          <BreadcrumbLink
            href="#"
            px={2}
            py={1}
            borderRadius={5}
            transition="background-color 0.2s ease-in-out"
            _hover={{
              textDecor: "none",
              bgColor: useColorModeValue("gray.200", "gray.700"),
            }}
          >
            <Menu>
              <MenuButton>...</MenuButton>
              <MenuList>
                <NextLink href="/courses" passHref>
                  <MenuItem>
                    Courses<Badge ml={1}>Beta</Badge>
                  </MenuItem>
                </NextLink>
                <NextLink href={`/courses/${course}`} passHref>
                  <MenuItem>{courseTitle}</MenuItem>
                </NextLink>
              </MenuList>
            </Menu>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <NextLink href="#" passHref>
            <BreadcrumbLink
              href="#"
              px={2}
              py={1}
              borderRadius={5}
              transition="background-color 0.2s ease-in-out"
              _hover={{
                textDecor: "none",
                bgColor: useColorModeValue("gray.200", "gray.700"),
              }}
              isCurrentPage
            >
              {title}
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box opacity={[1, 1, 1, 1, 1, courseHeaderDisplay == "flex" ? 1 : 0]}>
        <NavBarDrawer />
      </Box>
    </Flex>
  );
}

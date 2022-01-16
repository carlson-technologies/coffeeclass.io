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
  Text,
  Icon,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NavBarDrawer from "../Navigation/NavbarDrawer";
import NextLink from "next/link";
import { FiCoffee } from "react-icons/fi";

export default function CourseHeader({
  title,
  course,
  display,
  setDisplay,
  courseHeaderDisplay,
  setCourseHeaderDisplay,
}: any) {
  // convert course slug to name. data-structures => Data Structures
  const courseName = course.replace(/-/g, " ");
  // capitalize first letter of each word
  const courseNameCapitalized = courseName.replace(
    /\w\S*/g,
    (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

  return (
    <Flex
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
        opacity={display == "flex" ? 0 : courseHeaderDisplay == "flex" ? 1 : 0}
        display={display == "flex" ? "none" : "flex"}
        aria-label="Close Sidebar"
        icon={<ChevronRightIcon />}
        size="md"
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
        spacing="8px"
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
                bgColor: useColorModeValue("gray.300", "gray.600"),
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
                bgColor: useColorModeValue("gray.300", "gray.600"),
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
                bgColor: useColorModeValue("gray.300", "gray.600"),
              }}
            >
              Courses
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
                bgColor: useColorModeValue("gray.300", "gray.600"),
              }}
            >
              {courseNameCapitalized}
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
              bgColor: useColorModeValue("gray.300", "gray.600"),
            }}
          >
            <Menu>
              <MenuButton>
                <Text>...</Text>
              </MenuButton>
              <MenuList>
                <MenuItem>Courses</MenuItem>
                <MenuItem>{courseNameCapitalized}</MenuItem>
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
                bgColor: useColorModeValue("gray.300", "gray.600"),
              }}
              isCurrentPage
            >
              {title}
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box opacity={courseHeaderDisplay == "flex" ? 1 : 0}>
        <NavBarDrawer />
      </Box>
    </Flex>
  );
}

import { useState } from "react";
import {
  Badge,
  Box,
  useColorModeValue,
  Text,
  Flex,
  useDisclosure,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Link,
  AspectRatio,
  SkeletonCircle,
  Icon,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import NextLink from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/router";

const courseList = [
  {
    title: "Chakra UI",
    path: "/courses/chakra-ui",
    image: "chakra-ui.png",
    colorLight: "teal.100",
    colorDark: "teal.500",
    available: true,
  },
  {
    title: "Firebase",
    path: "/courses/firebase",
    image: "firebase.png",
    colorLight: "orange.100",
    colorDark: "orange.500",
    available: false,
  },
  {
    title: "Data Structures",
    path: "/courses/data-structures",
    image: "ds.png",
    colorLight: "purple.100",
    colorDark: "purple.500",
    available: true,
  },
  {
    title: "Algorithms",
    path: "/courses/algorithms",
    image: "algorithms.png",
    colorLight: "yellow.100",
    colorDark: "yellow.500",
    available: false,
  },
];

type Course = {
  title: string;
  path: string;
  image: string;
  colorLight: string;
  colorDark: string;
  available: boolean;
};

interface CourseItemProps {
  course: Course;
}

const CourseItem = ({ course }: CourseItemProps) => {
  const [loaded, setLoaded] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [fontWeight, setFontWeight] = useState("normal");
  return (
    <MenuItem
      transition="background-color 0.2s ease-in-out"
      _hover={{
        bgColor: useColorModeValue(
          `${course.colorLight}`,
          `${course.colorDark}`
        ),
      }}
      h={20}
      as="a"
      href={course.path}
      onMouseEnter={() => {
        setOpacity(1), setFontWeight("bold");
      }}
      onMouseLeave={() => {
        setOpacity(0), setFontWeight("normal");
      }}
    >
      <Flex align="center" h="100%" justify="space-between" w="100%">
        <Flex align="center" h="100%">
          <Flex w={50} h={50} mr={2}>
            <SkeletonCircle isLoaded={loaded} alignSelf="center">
              <NextLink href={course.path} passHref>
                <Link href={course.path}>
                  <AspectRatio ratio={1}>
                    <NextImage
                      src={`/logos/${course.image}`}
                      alt={course.title}
                      layout="fill"
                      onLoad={() => setLoaded(true)}
                    />
                  </AspectRatio>
                </Link>
              </NextLink>
            </SkeletonCircle>
          </Flex>
          <NextLink href={course.path} passHref>
            <Link _hover={{ textDecor: "none" }} w="100%" href={course.path}>
              <Flex flexDir="column" flexGrow={1}>
                <Text
                  transition=".2s font-weight ease-in-out"
                  fontWeight={fontWeight}
                >
                  {course.title}
                </Text>
              </Flex>
            </Link>
          </NextLink>
        </Flex>
        <Icon
          as={ExternalLinkIcon}
          fontSize="xl"
          opacity={opacity}
          ml="auto"
          transition="opacity 0.2s ease-in-out"
        />
      </Flex>
    </MenuItem>
  );
};

export default function CourseNavDropdown() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("gray.200", "gray.700");
  return (
    <Menu isOpen={isOpen} isLazy>
      <MenuButton
        variant="ghost"
        onClick={() => router.push("/courses")}
        mx={1}
        py={[1, 2, 2]}
        px={4}
        borderRadius={5}
        _hover={{ bg: bg }}
        aria-label="Courses"
        fontWeight="normal"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        <Box pos="relative">
          <Badge
            pos="absolute"
            top={0}
            left={0}
            mt={-4}
            size="sm"
            colorScheme={useColorModeValue("blackAlpha", "gray")}
          >
            Beta
          </Badge>
          <Text
            borderBottom={router.pathname.includes("/courses") && "2px solid"}
          >
            Courses {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Text>
        </Box>
      </MenuButton>
      <MenuList
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        mt="-8px"
        w="500px"
        py={0}
      >
        {courseList.map(
          (course) =>
            course.available && (
              <CourseItem key={course.title} course={course} />
            )
        )}
        <MenuItem
          h={20}
          transition="background-color 0.2s ease-in-out"
          _hover={{
            bgColor: useColorModeValue("gray.200", "gray.600"),
          }}
          as="a"
          href="/courses"
        >
          <NextLink href="/courses" passHref>
            <Link _hover={{ textDecor: "none" }} w="100%" href="/courses">
              <Text align="center" fontSize="lg">
                All Courses
              </Text>
            </Link>
          </NextLink>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

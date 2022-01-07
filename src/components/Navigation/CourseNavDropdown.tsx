import { useState, useEffect } from "react";
import {
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
  Tooltip,
  AspectRatio,
  SkeletonCircle,
  MenuDivider,
  MenuGroup,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/router";

export default function CourseNavDropdown() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loaded, setLoaded] = useState(false);
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
        <Text
          borderBottom={router.pathname.includes("/courses") && "2px solid"}
        >
          Courses {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Text>
      </MenuButton>
      <MenuList onMouseEnter={onOpen} onMouseLeave={onClose} mt="-8px">
        <MenuGroup title="CSS Frameworks">
          <MenuItem>
            <Flex align="center" h="100%">
              <SkeletonCircle isLoaded={loaded} mr={2} h="100%">
                <NextLink href="/courses/chakra-ui" passHref>
                  <Link href="/courses/chakra-ui">
                    <AspectRatio ratio={1}>
                      <NextImage
                        src={`/logos/chakra-ui.png`}
                        alt="chakra ui"
                        layout="fill"
                        onLoad={() => setLoaded(true)}
                      />
                    </AspectRatio>
                  </Link>
                </NextLink>
              </SkeletonCircle>
              <NextLink href="/courses/chakra-ui" passHref>
                <Link
                  _hover={{ textDecor: "none" }}
                  w="100%"
                  href="/courses/chakra-ui"
                >
                  Chakra UI
                </Link>
              </NextLink>
            </Flex>
          </MenuItem>
        </MenuGroup>
        <MenuGroup title="Coming Soon">
          <MenuItem>
            <Tooltip label="Coming Soon!">
              <Flex align="center" h="100%">
                <SkeletonCircle isLoaded={loaded} mr={2} h="100%">
                  <NextLink href="/courses/chakra-ui" passHref>
                    <Link href="/courses/chakra-ui">
                      <AspectRatio ratio={1}>
                        <Box
                          w={8}
                          h={8}
                          borderRadius={5}
                          bgColor={useColorModeValue("gray.100", "gray.900")}
                        />
                      </AspectRatio>
                    </Link>
                  </NextLink>
                </SkeletonCircle>
                <Link
                  disabled={true}
                  _disabled={{
                    opacity: 0.5,
                    cursor: "not-allowed",
                  }}
                  _hover={{ textDecor: "none" }}
                  w="100%"
                >
                  Algorithms
                </Link>
              </Flex>
            </Tooltip>
          </MenuItem>
          <MenuItem>
            <Tooltip label="Coming Soon!">
              <Flex align="center" h="100%">
                <SkeletonCircle isLoaded={loaded} mr={2} h="100%">
                  <NextLink href="/courses/chakra-ui" passHref>
                    <Link href="/courses/chakra-ui">
                      <AspectRatio ratio={1}>
                        <Box
                          w={8}
                          h={8}
                          borderRadius={5}
                          bgColor={useColorModeValue("gray.100", "gray.900")}
                        />
                      </AspectRatio>
                    </Link>
                  </NextLink>
                </SkeletonCircle>
                <Link
                  disabled={true}
                  _disabled={{
                    opacity: 0.5,
                    cursor: "not-allowed",
                  }}
                  _hover={{ textDecor: "none" }}
                  w="100%"
                >
                  Data Structures
                </Link>
              </Flex>
            </Tooltip>
          </MenuItem>
          <MenuItem>
            <Tooltip label="Coming Soon!">
              <Flex align="center" h="100%">
                <SkeletonCircle isLoaded={loaded} mr={2} h="100%">
                  <NextLink href="/courses/chakra-ui" passHref>
                    <Link href="/courses/chakra-ui">
                      <AspectRatio ratio={1}>
                        <Box
                          w={8}
                          h={8}
                          borderRadius={5}
                          bgColor={useColorModeValue("gray.100", "gray.900")}
                        />
                      </AspectRatio>
                    </Link>
                  </NextLink>
                </SkeletonCircle>
                <Link
                  disabled={true}
                  _disabled={{
                    opacity: 0.5,
                    cursor: "not-allowed",
                  }}
                  _hover={{ textDecor: "none" }}
                  w="100%"
                >
                  Next.js
                </Link>
              </Flex>
            </Tooltip>
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem>
          <NextLink href="/courses" passHref>
            <Link _hover={{ textDecor: "none" }} w="100%" href="/courses">
              All Courses
            </Link>
          </NextLink>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

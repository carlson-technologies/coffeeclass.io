import { useState, useEffect } from "react";
import {
  Box,
  useColorModeValue,
  Text,
  Heading,
  Icon,
  Flex,
  Button,
  IconButton,
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
import { FiCoffee, FiYoutube, FiGithub } from "react-icons/fi";
import NextLink from "next/link";
import NextImage from "next/image";
import { FiUser } from "react-icons/fi";
import { useRouter } from "next/router";
import DarkModeSwitch from "./DarkModeSwitch";
import NavBarDrawer from "./NavbarDrawer";
import Search from "./Search";

const Tags = () => {
  const bg = useColorModeValue("gray.200", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  let featuredTags = [
    "chakra-ui",
    "react",
    "firebase",
    "flutter",
    "nextjs",
    "dart",
    "javascript",
    "hooks",
  ];

  return (
    <>
      <Menu isOpen={isOpen} isLazy>
        <MenuButton
          variant="ghost"
          onClick={() => router.push("/tags")}
          mx={1}
          py={[1, 2, 2]}
          px={4}
          borderRadius={5}
          _hover={{ bg: bg }}
          aria-label="Courses"
          fontWeight="normal"
        //   bgColor={router.pathname.includes("/tags") && bg}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          display={["none", "none", "none", "none", "none", "flex"]}
        >
          Tags {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </MenuButton>
        <MenuList onMouseEnter={onOpen} onMouseLeave={onClose} mt="-8px">
          <MenuGroup title="Featured">
            {featuredTags.map((tag, index) => (
              <NextLink href={`/tags/${tag}`} key={index}>
                <MenuItem>#{tag}</MenuItem>
              </NextLink>
            ))}
          </MenuGroup>
          <MenuDivider />
          <MenuItem>
            <NextLink href="/tags" passHref>
              <Link _hover={{ textDecor: "none" }} w="100%" href="/tags">
                All Tags
              </Link>
            </NextLink>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default function Navbar() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loaded, setLoaded] = useState(false);
  const [top, setTop] = useState("0");

  // on scroll get the users scroll position
  // if the user has scrolled 100px, change boxShadow to true
  const [boxShadow, setBoxShadow] = useState(false);

  let lastScrollTop = 0;

  useEffect(() => {
    onmousemove = function (e) {
      if (e.clientY < 100) setTop("0");
      // console.log("mouse location:", e.clientX, e.clientY)
    };
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setBoxShadow(true);
      } else {
        setBoxShadow(false);
      }

      // detect whether the user is scrolling up or down
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        // scrolling down. Let's hide the navbar
        setTop("-100px");
      } else {
        // scrolling up. Let's show the navbar
        setTop("0");
      }
      lastScrollTop = st <= 0 ? 0 : st;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const bgColor1 = useColorModeValue("white", "gray.800");
  const boxShadow1 = useColorModeValue(
    "0px 2px 4px rgba(0, 0, 0, 0.2)",
    "0px 2px 4px rgba(255, 255, 255, 0.1)"
  );
  const bg = useColorModeValue("gray.200", "gray.700");

  return (
    <Flex
      // h={height}
      as="nav"
      w="100%"
      px="4"
      pt="4"
      pb="6"
      // display="flex"
      // display={router.pathname.includes("/courses") ? "none" : "flex"}
      alignItems="center"
      pos="sticky"
      top={top}
      zIndex={10}
      bgColor={router.pathname === "/" ? bgColor : bgColor1}
    //   boxShadow={boxShadow && boxShadow1}
      transition="top .5s ease-in-out"
    >
      <NextLink href="/" passHref>
        <Button
          as="a"
          variant="ghost"
          p={[1, 2, 4]}
          _hover={{ transform: "scale(1.05)" }}
          aria-label="Home"
          fontWeight="normal"
          color="brand_one.500"
        >
          <Icon fontSize="2xl" as={FiCoffee} mr={[0, 0, 0, 0, 0, 2]} />
          <Heading
            size="lg"
            display={["none", "none", "none", "none", "none", "inherit"]}
          >
            coffeeclass.io
          </Heading>
        </Button>
      </NextLink>
      <Flex flexGrow={1}>
        <Search />
      </Flex>
      {/* <Box flexGrow="1" display={["inherit", "inherit", "inherit", "inherit", "inherit", "none"]}></Box> */}
      <Box display={["none", "none", "none", "none", "inherit", "inherit"]}>
        <NextLink href="/articles" passHref>
          <Button
            as="a"
            variant="ghost"
            mx={1}
            p={[1, 2, 4]}
            _hover={{ backgroundColor: bg }}
            aria-label="Articles"
            fontWeight="normal"
            // bgColor={router.pathname.includes("/articles") && bg}
          >
            Articles
          </Button>
        </NextLink>
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
            // bgColor={router.pathname.includes("/courses") && bg}
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
          >
            Courses {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
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
                              bgColor={useColorModeValue(
                                "gray.100",
                                "gray.900"
                              )}
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
                              bgColor={useColorModeValue(
                                "gray.100",
                                "gray.900"
                              )}
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
                              bgColor={useColorModeValue(
                                "gray.100",
                                "gray.900"
                              )}
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
        <Tags />
        <Tooltip label="Subscribe to our YouTube channel!" placement="bottom">
          <Link href="https://youtube.com/benjamincarlson" isExternal>
            <IconButton
              isExternal
              target="_blank"
              borderRadius={5}
              icon={<FiYoutube />}
              fontSize="20px"
              aria-label="YouTube"
              href="https://youtube.com/benjamincarlson"
              bgColor="transparent"
              _hover={{ backgroundColor: "transparent", opacity: 0.8 }}
              p={[1, 2, 4]}
              ml={1}
              w={50}
            />
          </Link>
        </Tooltip>
        <Tooltip label="View this website's code!" placement="bottom">
          <Link
            href="https://github.com/carlson-technologies/coffeeclass.io"
            isExternal
          >
            <IconButton
              isExternal
              target="_blank"
              borderRadius={5}
              icon={<FiGithub />}
              fontSize="20px"
              aria-label="YouTube"
              href="https://github.com/carlson-technologies/coffeeclass.io"
              bgColor="transparent"
              _hover={{ backgroundColor: "transparent", opacity: 0.8 }}
              p={[1, 2, 4]}
              ml={1}
              w={50}
            />
          </Link>
        </Tooltip>
        <NextLink href="/accounts-waitlist" passHref>
          <IconButton
            w={50}
            borderRadius={5}
            icon={<FiUser />}
            fontSize="20px"
            aria-label="Join Accounts Wait-List"
            href="/accounts-waitlist"
            variant="ghost"
            _hover={{ backgroundColor: bg }}
            p={[1, 2, 4]}
            ml={1}
            // bgColor={router.pathname.includes("/accounts-waitlist") && bg}
          />
        </NextLink>
        <DarkModeSwitch />
      </Box>
      <NavBarDrawer />
    </Flex>
  );
}

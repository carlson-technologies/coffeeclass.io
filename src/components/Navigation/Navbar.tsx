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
  Link,
  Tooltip,
} from "@chakra-ui/react";
import { FiCoffee, FiYoutube, FiGithub, FiStar } from "react-icons/fi";
import NextLink from "next/link";
import NextImage from "next/image";
import { FiUser } from "react-icons/fi";
import { useRouter } from "next/router";
import DarkModeSwitch from "./DarkModeSwitch";
import NavBarDrawer from "./NavbarDrawer";
import Search from "./Search";
import NavItem from "./NavItem";
import CourseNavDropdown from "./CourseNavDropdown";

export default function Navbar() {
  const router = useRouter();
  const [top, setTop] = useState("0");

  // on scroll get the users scroll position
  // if the user has scrolled 100px, change boxShadow to true
  const [boxShadow, setBoxShadow] = useState(false);

  let lastScrollTop = 0;

  useEffect(() => {
    onmousemove = function (e) {
      if (e.clientY < 30) setTop("0");
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
        setTop("-60px");
      } else {
        // scrolling up. Let's show the navbar
        // setTop("0");
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
    "0px 2px 4px rgba(0, 0, 0, 0.4)"
  );
  const bg = useColorModeValue("gray.200", "gray.700");

  return (
    <Flex
      as="nav"
      w="100%"
      px="4"
      pt="4"
      pb="6"
      alignItems="center"
      pos="sticky"
      top={top}
      zIndex={10}
      bgColor={router.pathname === "/" ? bgColor : bgColor1}
      boxShadow={boxShadow && boxShadow1}
      transition="top .5s ease-in-out, box-shadow .2s ease-in-out"
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
          title="Home"
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
      <Box display={["none", "none", "none", "none", "inherit", "inherit"]}>
        <NavItem title="Articles" href="/articles" />
        <CourseNavDropdown />
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
            bgColor={router.pathname.includes("/accounts-waitlist") && bg}
          />
        </NextLink>
        <DarkModeSwitch />
      </Box>
      <NavBarDrawer />
    </Flex>
  );
}

import {
  Flex,
  Text,
  Divider,
  useColorModeValue,
  Link,
  Image,
  SimpleGrid,
  Box,
  Wrap,
  Badge,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { year } from "../../scripts/get-year";
import ThanksBox from "./ThanksBox";
import useSWR from "swr";
import fetcher from "../../scripts/fetcher";

interface PropsFooterNavItem {
  text: string;
  href: string;
}

interface PropsFooterHeading {
  title: string;
}

interface PropsFooter {
  data?: any;
  error?: any;
}

const FooterNavItem = ({ text, href }: PropsFooterNavItem) => {
  return (
    <Text textAlign="left">
      <NextLink href={href} passHref>
        <Link href={href} _hover={{ textDecor: "underline" }}>
          {text}
        </Link>
      </NextLink>
    </Text>
  );
};

const FooterNavItemExternal = ({ text, href }: PropsFooterNavItem) => {
  return (
    <Text textAlign="left">
      <Link href={href} _hover={{ textDecor: "underline" }} isExternal>
        {text}
      </Link>
    </Text>
  );
};

const FooterHeading = ({ title }: PropsFooterHeading) => {
  return (
    <Text
      as="h3"
      textTransform="uppercase"
      marginBottom={6}
      marginTop={8}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize="sm"
      fontWeight="semibold"
      letterSpacing="wider"
      textAlign="left"
    >
      {title}
    </Text>
  );
};

const Footer = () => {
  const { data, error }: PropsFooter = useSWR("/api/getTags", fetcher);

  const bgColor = useColorModeValue("brand_one.500", "brand_one.800");

  return (
    <Box bgColor={useColorModeValue("gray.100", "gray.700")}>
      <Flex
        flexDir="column"
        align={["left", "left", "left", "left", "center", "center"]}
        my={6}
        px={4}
        as="footer"
      >
        {!error && (
          <Wrap maxW={1200} justify="center" mx="auto">
            {data?.tags.map((tag: string, index: number) => (
              <NextLink href={`/tags/${tag}`} key={index} passHref>
                <Link href={`/tags/${tag}`}>
                  <Badge
                    colorScheme="brand_one"
                    fontSize={["sm", "sm", "sm", "md", "lg", "lg"]}
                    p={2}
                    borderRadius={5}
                    _hover={{ bgColor: bgColor }}
                  >
                    #{tag}
                  </Badge>
                </Link>
              </NextLink>
            ))}
          </Wrap>
        )}
        <SimpleGrid
          columns={[1, 1, 1, 2, 4, 4]}
          w="100%"
          maxW={[320, 320, 320, 1000, 1000, 1000]}
          mt={4}
          mb={6}
        >
          <Box>
            <FooterHeading title="Legal" />
            <Box>
              <FooterNavItem text="Terms" href="/legal/terms" />
              <FooterNavItem text="Disclaimer" href="/legal/disclaimer" />
              <FooterNavItem text="Privacy Policy" href="/legal/privacy" />
            </Box>
          </Box>

          <Box>
            <FooterHeading title="Content" />
            <Box>
              <FooterNavItem text="Courses" href="/courses" />
              <FooterNavItem text="Articles" href="/articles" />
              <FooterNavItem text="Authors" href="/authors" />
              <FooterNavItem text="Tags" href="/tags" />
            </Box>
          </Box>

          <Box>
            <FooterHeading title="Company" />
            <FooterNavItem text="About" href="/about" />
            <FooterNavItemExternal
              text="Carlson Technologies"
              href="https://carlsontechnologies.dev/"
            />
            <FooterNavItemExternal
              text="Write For Us"
              href="https://benjamincarlson.notion.site/Contributing-to-Coffeeclass-io-27ab5e894368424a9c86a7f11555514b"
            />
            <FooterNavItemExternal
              text="Advertise With Us"
              href="https://benjamincarlson.notion.site/Advertising-with-Coffeeclass-io-3a049a1af6914c47944ce45f9893a115"
            />
          </Box>

          <Box>
            <FooterHeading title="Open Source" />
            <FooterNavItemExternal
              text="Code"
              href="https://github.com/carlson-technologies/coffeeclass.io"
            />
            <FooterNavItemExternal
              text="Roadmap"
              href="https://benjamincarlson.notion.site/609b8bb171844146a9bcd9fbabd171a8?v=341de17fff6149bea36dbafbe2f2cf88"
            />
            <FooterNavItemExternal
              text="Engineering Blog"
              href="https://engineering.coffeeclass.io"
            />
          </Box>
        </SimpleGrid>

        <Wrap
          w="100%"
          justify={["left", "left", "left", "left", "center", "center"]}
        >
          <ThanksBox
            src="/logos/splitbee.png"
            alt="splitbee"
            intro="Insights By"
            title="Splitbee"
            width={10}
            href="https://splitbee.io"
          />
          <ThanksBox
            src="/logos/vercel.png"
            alt="Vercel"
            intro="Powered By"
            title="Vercel"
            width={6}
            href="https://vercel.com/?utm_source=carlson-technologies&utm_campaign=oss"
          />
        </Wrap>

        <Divider
          borderColor={useColorModeValue("gray.300", "gray.800")}
          my={8}
          w={["100%", "100%", "100%", "100%", "80%", "80%"]}
        />

        <Image
          src="/carlson-technologies-logo.png"
          alt="Carlson Technologies Logo"
          w={50}
        />
        <Text as="small" mt={4}>
          &copy; Copyright 2021 - {year},{" "}
          <Link
            href="https://carlsontechnologies.dev/"
            textDecor="underline"
            isExternal
          >
            Carlson Technologies LLC
          </Link>
          . All Rights Reserved.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;

import { Button, useColorModeValue, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

type Props = {
  href: string;
  title: string;
};

export default function NavItem({ href, title }: Props) {
  const router = useRouter();
  const bg = useColorModeValue("gray.200", "gray.700");
  return (
    <NextLink href={href} passHref>
      <Button
        as="a"
        variant="ghost"
        mx={1}
        p={[1, 2, 4]}
        _hover={{ backgroundColor: bg }}
        aria-label={title}
        fontWeight="normal"
        display={["none", "none", "none", "none", "none", "inherit"]}
      >
        <Text borderBottom={router.pathname.includes(href) && "2px solid"}>
          {title}
        </Text>
      </Button>
    </NextLink>
  );
}

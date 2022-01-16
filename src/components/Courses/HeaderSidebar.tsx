import {
  Heading,
  Text,
  Box,
  useColorModeValue,
  useColorMode,
  Link,
} from "@chakra-ui/react";
import { activeHeader } from "../../hooks/useActiveHeader";

export default function HeaderSidebar({ headers }: any) {
  const { colorMode } = useColorMode();
  const color = {
    light: "gray.600",
    dark: "gray.400",
  };

  const activeId = activeHeader(
    headers.map(({ text }: any) => `[id="${text}"]`),
    {
      rootMargin: "0% 0% -24% 0%",
    }
  );

  type OptionProps = {
    root: any;
    rootMargin: string;
    threshold: number;
  };

  return (
    <Box px={2}>
      <Heading
        as="h1"
        size="sm"
        letterSpacing="tight"
        mb={2}
        color={useColorModeValue("gray.700", "gray.300")}
      >
        In This Module
      </Heading>
      {headers?.map((h: any, index: number) => {
        return (
          <Link href={`#${h.text}`} key={index} _hover={{ textDecor: "none" }}>
            <Heading
              as="h4"
              fontSize="16px"
              fontWeight={activeId === h.text ? "bold" : "normal"}
              color={color[colorMode]}
              my={2}
              ml={(h.level - 2) * 6}
              _hover={{ opacity: 0.7 }}
            >
              {h.text}
            </Heading>
          </Link>
        );
      })}
    </Box>
  );
}

import {
  Heading,
  Text,
  Box,
  useColorModeValue,
  useColorMode,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

export default function HeadersAccordion({ headers }: any) {
  const { colorMode } = useColorMode();
  const color = {
    light: "gray.600",
    dark: "gray.400",
  };
  const bgColor1 = useColorModeValue("gray.100", "gray.700");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Accordion allowMultiple mt={4}>
      <AccordionItem>
        <h2>
          <AccordionButton _hover={{ bgColor: hoverBg }}>
            <Box flex="1" textAlign="left">
              On this page
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          {headers?.map((h: any, i: number) => {
            return (
              <Link href={`#${h.text}`} key={i}>
                <Box
                  p={1}
                  _hover={{
                    bgColor: bgColor1,
                    cursor: "pointer",
                  }}
                  my={1}
                  borderRadius={2}
                >
                  <Heading as="h4" size="sm" color={color[colorMode]} my={1}>
                    <Text ml={(h.level - 2) * 6} _hover={{ textDecor: "none" }}>
                      {h.text}
                    </Text>
                  </Heading>
                </Box>
              </Link>
            );
          })}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

import { Text, Tooltip, useColorModeValue } from "@chakra-ui/react";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function DefinitionPopup({ title, children }: Props) {
  const h1ColorGradient = useColorModeValue(
    "linear(to-r, purple.600, pink.500)",
    "linear(to-r, purple.400, pink.500)"
  );

  return (
    <Tooltip label={children} placement="top" fontSize="lg" p={5} hasArrow>
      <Text as="span" mx="1px" bgGradient={h1ColorGradient} bgClip="text">
        {title}
        <Text as="span" color="pink.500">
          *
        </Text>
      </Text>
    </Tooltip>
  );
}

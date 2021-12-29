import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";

export default function AuthorCard({ author }: any) {
  const router = useRouter();
  return (
    <Center py={6}>
      <Box
        w={"full"}
        h={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          alt=""
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={`/authors/${author.data.image}`}
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading
              fontSize={"2xl"}
              fontWeight={500}
              mb={2}
              textAlign="center"
            >
              {author.data.name}
            </Heading>
            <Text color={"gray.500"} textAlign="center">
              {author.content}
            </Text>
          </Stack>

          {/* <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Followers
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Followers
              </Text>
            </Stack>
          </Stack> */}

          <NextLink
            href={`/authors/${author.filePath.replace(".mdx", "")}`}
            passHref
          >
            <Button
              w={"full"}
              mt={8}
              bg={useColorModeValue("#151f21", "gray.900")}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              onClick={() => {
                router.push(
                  "/authors/[author]",
                  `/authors/${author.filePath.replace(".mdx", "")}`
                );
              }}
            >
              View {author.data.name.split(" ")[0]}&apos;s Articles
            </Button>
          </NextLink>
        </Box>
      </Box>
    </Center>
  );
}

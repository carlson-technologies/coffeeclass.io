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
import useSWR, { SWRResponse } from "swr";
import fetcher from "../../scripts/fetcher";
import { FiBook } from "react-icons/fi";

export default function CourseCard({ course }: any) {
  const bg = useColorModeValue("#151f21", "gray.900");
  const router = useRouter();
  const { data }: SWRResponse<any, any> = useSWR(
    `/api/getModules?course=${course.path.split("/").pop()}`,
    fetcher
  );

  return (
    <Center py={6}>
      <Box
        w={"full"}
        maxW={"500px"}
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
            src={`/logos/${course.image}`}
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
            icon={<FiBook />}
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
              {course.title}
            </Heading>
            <Text color={"gray.500"} textAlign="center">
              {course.description}
            </Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{data?.moduleCount || 0}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Modules
              </Text>
            </Stack>
            {/* <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Followers
              </Text>
            </Stack> */}
          </Stack>

          {course.path && (
            <NextLink href={course.path} passHref>
              <Button
                w={"full"}
                mt={8}
                bg={bg}
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                onClick={() => {
                  router.push("/courses/[course]", `${course.path}`);
                }}
              >
                View Course Roadmap
              </Button>
            </NextLink>
          )}
        </Box>
      </Box>
    </Center>
  );
}

import { useState } from "react";
import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
  AspectRatio,
  Skeleton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import useSWR, { SWRResponse } from "swr";
import fetcher from "../../scripts/fetcher";
import NextImage from "next/image";

const CourseImage = ({ course }: any) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Skeleton isLoaded={loaded}>
      <NextImage
        src={`/logos/${course.image}`}
        alt={course.title}
        layout="fill"
        onLoad={() => setLoaded(true)}
      />
    </Skeleton>
  );
};

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
        <Box
          bgColor={useColorModeValue(
            `${course.colorLight}`,
            `${course.colorDark}`
          )}
          h={"120px"}
        />
        <Box
          w={100}
          h={100}
          mx="auto"
          mt={-10}
          css={{
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
          }}
          borderRadius={5}
          p={2}
          bgColor={useColorModeValue(
            "rgba(255, 255, 255, .2)",
            "rgba(26, 32, 44, .2)"
          )}
        >
          <AspectRatio ratio={1}>
            <CourseImage course={course} />
          </AspectRatio>
        </Box>

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

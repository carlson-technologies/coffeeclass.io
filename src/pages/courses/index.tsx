import { Heading, Flex, Stack, Box, SimpleGrid } from "@chakra-ui/react";
import Container from "../../components/Container";
import courses from "../../configs/courses.json";
import CourseCard from "../../components/Courses/CourseCard";

const url = "https://www.coffeeclass.io/courses";
const title = "Courses";
const description =
  "Learn programming languages and frameworks through our easy to follow, interactive courses.";

export default function Index() {
  const data = courses.routes;

  return (
    <Container title={title} description={description} url={url}>
      <Stack spacing={8} px={4}>
        <Flex flexDir="column">
          <Heading mt={4} as="h1" size="2xl" color="brand_one.500">
            Courses 🎒
          </Heading>

          <Box
            bgColor="brand_one.500"
            h={2}
            w={150}
            borderRadius={5}
            mb={4}
            mt={2}
          />
          <SimpleGrid
            minChildWidth={["100%", "100%", "100%", "100%", "600px", "600px"]}
            gap={6}
          >
            {data.map((course, index) => {
              return <CourseCard course={course} key={index} />;
            })}
          </SimpleGrid>
        </Flex>
      </Stack>
    </Container>
  );
}

// export function getStaticProps() {
//   // gets a string array of all folders in the courses folder. These are the courses
//   let courses = getCourseFolders(COURSE_PATH);

//   return { props: { courses } };
// }

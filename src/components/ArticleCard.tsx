import { useState } from "react";
import {
  Heading,
  Flex,
  Box,
  Text,
  AspectRatio,
  Skeleton,
  useColorModeValue,
  Link,
  Icon,
  Avatar,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import TimeAgo from "../scripts/time-ago";
import NextImage from "next/image";
import useSWR from "swr";
import fetcher from "../scripts/fetcher";

type Props = {
  article: any;
};

export default function Card({ article }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [margin, setMargin] = useState(0);
  const color = useColorModeValue("gray.500", "gray.400");
  const color1 = useColorModeValue("gray.700", "gray.300");

  const { data, error }: any = useSWR(
    `/api/getAuthor?authorSlug=${article.data.author.replace(".mdx", "")}`,
    fetcher
  );

  return (
    <>
      <NextLink
        href={`/articles/${article.filePath.replace(".mdx", "")}`}
        passHref
      >
        <Link
          className="gradient"
          href={`/articles/${article.filePath.replace(".mdx", "")}`}
          _hover={{
            textDecor: "none",
          }}
          my={6}
          mr={[0, 0, 0, 0, 0, 2]}
          borderRadius={15}
          onMouseEnter={() => setMargin(1)}
          onMouseLeave={() => setMargin(0)}
        >
          <Flex
            borderRadius={15}
          >
            {article?.data?.logoImage && (
              <Box p={4} borderRadius={5}>
                <Box w={50} h={50} my={2} mx="auto">
                  <AspectRatio ratio={1}>
                    <Skeleton isLoaded={loaded}>
                      <NextImage
                        src={`/logos/${article.data.logoImage[0]}`}
                        alt={article?.data?.logoImage[0]}
                        layout="fill"
                        onLoad={() => setLoaded(true)}
                      />
                    </Skeleton>
                  </AspectRatio>
                </Box>
              </Box>
            )}
            <Flex
              h="100%"
              w="100%"
              p={[0, 0, 0, 2, 4, 5]}
              flexDir="column"
              maxW={1000}
            >
              <Flex align="center">
                <Avatar
                  size="sm"
                  name={data?.data?.data?.name}
                  src={`/authors/${data?.data?.data?.image}`}
                  mr={2}
                />
                <Text fontSize="md">
                  <NextLink
                    href={`/authors/${article.data.author.replace(".mdx", "")}`}
                    passHref
                  >
                    <Link color="blue.500">{data?.data?.data?.name}</Link>
                  </NextLink>{" "}
                  <Text as="span" color="gray.500">
                    shared
                  </Text>
                </Text>
              </Flex>
              <Heading as="h2" size="lg" fontWeight="normal" mt={1} mb={2}>
                {article.data.title}
              </Heading>
              <Text>
                <Text as="span" color={color} fontSize="lg" fontStyle="italic">
                  {TimeAgo(new Date(article.data.publishedAt))}
                </Text>{" "}
                <Text as="span" color="gray">
                  &middot;
                </Text>{" "}
                <Text as="span" color={color1} fontSize="xl">
                  {article.data.description}
                </Text>
                <Flex
                  align="center"
                  mt={4}
                  textDecor="underline"
                  color="blue.500"
                  onMouseEnter={() => setMargin(2)}
                  onMouseLeave={() => setMargin(1)}
                >
                  <Text>Read More</Text>
                  <Icon
                    as={ChevronRightIcon}
                    fontSize="24px"
                    ml={margin}
                    transition=".3s margin ease-out"
                  />
                </Flex>
              </Text>
            </Flex>
          </Flex>
        </Link>
      </NextLink>
    </>
  );
}

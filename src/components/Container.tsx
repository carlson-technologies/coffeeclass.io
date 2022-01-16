import React, { ReactChild } from "react";
import { Flex } from "@chakra-ui/react";
import Footer from "./Navigation/Footer";
import Navbar from "./Navigation/Navbar";
import { NextSeo } from "next-seo";
// import FeedBackFish from "./Navigation/FeedBackFish";
import { useRouter } from "next/router";

interface Props {
  title: string;
  description?: string; // optional because we have the default SEO description
  url: string;
  children: ReactChild[] | ReactChild;
}

const Container = ({ title, description, url, children }: Props) => {
  const router = useRouter();
  const { query } = router;
  return (
    <>
      {/* <FeedBackFish /> */}
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
        }}
      />
      {!query.module && <Navbar />}
      <Flex flexDirection="column">
        <Flex display="block" minH="100vh" as="main">
          {children}
        </Flex>
        <Footer />
      </Flex>
    </>
  );
};

export default Container;

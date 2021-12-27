import React, { ReactChild } from "react";
import { Flex } from "@chakra-ui/react";
import Footer from "./Navigation/Footer";
import Navbar from "./Navigation/Navbar";
import { NextSeo } from "next-seo";
import FeedBackFish from "./Navigation/FeedBackFish";

interface Props {
  title: string;
  description: string;
  url: string;
  children: ReactChild[] | ReactChild;
}

const Container = ({ title, description, url, children }: Props) => {
  return (
    <>
      <FeedBackFish />
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
      <Navbar />
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

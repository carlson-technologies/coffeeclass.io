import { Flex } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import React from 'react'

import Footer from './navigation/Footer'
import Navbar from './navigation/Navbar'

export type ISelected = 'home' | 'course' | 'article'

interface Props {
  title?: string
  description?: string
  url?: string
  selected?: ISelected
  children: React.ReactNode
}

const Container = ({ title, description, url, selected, children }: Props) => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description
        }}
      />
      <Navbar selected={selected} />
      <div className="flex flex-col">
        <Flex display="block" minH="100vh" as="main">
          {children}
        </Flex>
        <Footer />
      </div>
    </>
  )
}

export default Container

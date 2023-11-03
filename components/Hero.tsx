import { Box, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextLink from 'next/link'

const MotionBox = motion(Box)

export default function Hero() {
  const mode = useColorModeValue('', 'dark')
  return (
    <div className={`bg-gradient-radial${mode} pt-12`}>
      <div className="max-w-[1000px] px-4 my-0 md:my-8 mx-auto">
        <div className="flex flex-col space-y-4 text-center">
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <h1
              className="text-3xl tracking-normal md:tracking-wide font-recursive leading-normal md:leading-relaxed sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mt-12 md:mt-20"
              id="hero-title"
            >
              By 2032, over 450k Software Engineering jobs will be added with a median annual pay of
              $124,200
              <small className="text-xs font-thin ml-1 tracking-tight">
                -
                <a
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm"
                >
                  bls.gov
                </a>
              </small>
            </h1>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h2
              className="text-blue-500 dark:text-blue-400 font-semibold text-xl sm:text-2xl mt-2"
              id="hero-subtitle"
            >
              Join more than 1 million coders who learned to code for free on coffeeclass.io and
              secure one of these jobs!
            </h2>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <div className="w-full md:w-[200px] mx-auto">
              <NextLink href="/courses" passHref className="w-fit mt-4">
                <p
                  id="main-cta"
                  className="transition text-white text-center p-2 md:p-3 text-md md:text-xl rounded my-8 ease-in-out bg-brand_one-500 hover:-translate-y-1 hover:scale-105 md:hover:scale-110 hover:bg-brand_one-800 duration-300 w-full md:w-[200px]"
                >
                  Learn Now!
                </p>
              </NextLink>
            </div>
          </MotionBox>
        </div>
      </div>
    </div>
  )
}

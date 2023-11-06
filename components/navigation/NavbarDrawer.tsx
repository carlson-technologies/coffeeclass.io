import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Flex,
  Box,
  IconButton,
  Heading,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Link,
  Text,
  useColorModeValue,
  ButtonGroup,
  Button,
  Badge
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { FiYoutube, FiGithub } from 'react-icons/fi'

import { getMessage } from '../../lib/scripts/get-message'

import DarkModeSwitch from './DarkModeSwitch'

interface Props {
  placement?: any
}

const NavBarDrawer = ({ placement }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  let d = new Date()
  let hour = d.getHours()

  return (
    <>
      <Box
        display={['inherit', 'inherit', 'inherit', 'inherit', 'none', 'none']}
        aria-label="Open navigation menu"
      >
        <IconButton
          aria-label="Open Menu"
          bgColor="transparent"
          _hover={{
            textDecoration: 'none',
            bgColor: useColorModeValue('gray.200', 'gray.700')
          }}
          icon={<HamburgerIcon fontSize="20px" />}
          onClick={onOpen}
          borderRadius={5}
        />
      </Box>

      <Drawer
        onClose={onClose}
        isOpen={isOpen}
        size="sm"
        placement={placement ? placement : 'right'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Flex justify="space-between">
              <Heading as="h4" size="lg">
                {getMessage(hour)}
              </Heading>
              <IconButton
                aria-label="Close Menu"
                size="md"
                onClick={onClose}
                icon={<CloseIcon fontSize="xs" />}
                borderRadius={5}
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody as="nav">
            <ButtonGroup spacing="4" justifyContent="space-around" w="100%" size="sm">
              <NextLink href="/courses" passHref>
                <Button colorScheme="brand_one" minW={[null, null, 110, 110, 110, 110]}>
                  Courses
                </Button>
              </NextLink>
              <NextLink href="/articles" passHref>
                <Button colorScheme="brand_one" minW={[null, null, 110, 110, 110, 110]}>
                  Articles
                </Button>
              </NextLink>
              <NextLink href="/tags" passHref>
                <Button colorScheme="brand_one" minW={[null, null, 110, 110, 110, 110]}>
                  Tags
                </Button>
              </NextLink>
            </ButtonGroup>
            <Heading
              as="h3"
              textTransform="uppercase"
              marginBottom={2}
              marginTop={6}
              color={useColorModeValue('gray.600', 'gray.400')}
              fontSize="sm"
              fontWeight="semibold"
              letterSpacing="wider"
              textAlign="left"
            >
              Content
            </Heading>
            <Flex flexDir="column" fontSize="lg">
              <Text>
                <Link
                  as={NextLink}
                  href="/"
                  _hover={{ textDecor: 'none', ml: '4' }}
                  aria-label="Home"
                  color="gray.500"
                  transition="margin .3s ease-in-out"
                >
                  Home
                </Link>
              </Text>

              <Text>
                <Link
                  as={NextLink}
                  href="/articles"
                  _hover={{ textDecor: 'none', ml: '2' }}
                  aria-label="Articles"
                  color="gray.500"
                  transition="margin .3s ease-in-out"
                >
                  Articles
                </Link>
              </Text>

              <Text>
                <Link
                  as={NextLink}
                  href="/courses"
                  _hover={{ textDecor: 'none', ml: '2' }}
                  aria-label="Courses"
                  color="gray.500"
                  transition="margin .3s ease-in-out"
                >
                  Courses
                </Link>
              </Text>

              <Text>
                <Link
                  as={NextLink}
                  href="/tags"
                  _hover={{ textDecor: 'none', ml: '2' }}
                  aria-label="Tags"
                  color="gray.500"
                  transition="margin .3s ease-in-out"
                >
                  Tags
                </Link>
              </Text>

              <Text>
                <Link
                  as={NextLink}
                  href="/authors"
                  _hover={{ textDecor: 'none', ml: '2' }}
                  aria-label="Authors"
                  color="gray.500"
                  transition="margin .3s ease-in-out"
                >
                  Authors
                </Link>
              </Text>
            </Flex>

            <Heading
              as="h3"
              textTransform="uppercase"
              marginBottom={2}
              marginTop={8}
              color={useColorModeValue('gray.600', 'gray.400')}
              fontSize="sm"
              fontWeight="semibold"
              letterSpacing="wider"
              textAlign="left"
            >
              Write For Us!
            </Heading>
            <Flex flexDir="column" fontSize="lg">
              <Text>
                <Link
                  isExternal
                  href="https://benjamincarlson.notion.site/Contributing-to-Coffeeclass-io-27ab5e894368424a9c86a7f11555514b"
                  _hover={{ textDecor: 'none', ml: '2' }}
                  aria-label="Getting Started"
                  color="gray.500"
                  transition="margin .3s ease-in-out"
                >
                  Getting Started
                </Link>
              </Text>
            </Flex>

            <Heading
              as="h3"
              textTransform="uppercase"
              marginBottom={2}
              marginTop={8}
              color={useColorModeValue('gray.600', 'gray.400')}
              fontSize="sm"
              fontWeight="semibold"
              letterSpacing="wider"
              textAlign="left"
            >
              Company
            </Heading>
            <Flex flexDir="column" fontSize="lg">
              <Text>
                <Link
                  as={NextLink}
                  href="/about"
                  _hover={{ textDecor: 'none', ml: '2' }}
                  aria-label="About"
                  color="gray.500"
                  transition="margin .3s ease-in-out"
                >
                  About
                </Link>
              </Text>

              <Text>
                <Link
                  as={NextLink}
                  href="/legal/terms"
                  _hover={{ textDecor: 'none', ml: '2' }}
                  aria-label="Terms And Conditions"
                  color="gray.500"
                  transition="margin .3s ease-in-out"
                >
                  Terms And Conditions
                </Link>
              </Text>

              <Text>
                <Link
                  as={NextLink}
                  href="/legal/privacy"
                  _hover={{ textDecor: 'none', ml: '2' }}
                  aria-label="Privacy Policy"
                  color="gray.500"
                  transition="margin .3s ease-in-out"
                >
                  Privacy Policy
                </Link>
              </Text>

              <Text>
                <Link
                  as={NextLink}
                  href="/legal/disclaimer"
                  _hover={{ textDecor: 'none', ml: '2' }}
                  aria-label="Disclaimer"
                  color="gray.500"
                  transition="margin .3s ease-in-out"
                >
                  Disclaimer
                </Link>
              </Text>
            </Flex>

            <Heading
              as="h3"
              textTransform="uppercase"
              marginBottom={2}
              marginTop={8}
              color={useColorModeValue('gray.600', 'gray.400')}
              fontSize="sm"
              fontWeight="semibold"
              letterSpacing="wider"
              textAlign="left"
            >
              Open Source
            </Heading>
            <Flex flexDir="column" fontSize="lg">
              <Text>
                <Link
                  isExternal
                  href="https://github.com/carlson-technologies/coffeeclass.io"
                  _hover={{ textDecor: 'none', ml: '2' }}
                  aria-label="Code"
                  color="gray.500"
                  transition="margin .3s ease-in-out"
                >
                  Code
                </Link>
              </Text>

              <Text>
                <Link
                  isExternal
                  href="https://benjamincarlson.notion.site/609b8bb171844146a9bcd9fbabd171a8?v=341de17fff6149bea36dbafbe2f2cf88"
                  _hover={{ textDecor: 'none', ml: '2' }}
                  aria-label="Roadmap"
                  color="gray.500"
                  transition="margin .3s ease-in-out"
                >
                  Roadmap
                </Link>
              </Text>

              <Text>
                <Link
                  isExternal
                  href="https://engineering.coffeeclass.io"
                  _hover={{ textDecor: 'none', ml: '2' }}
                  aria-label="Developer Blog"
                  color="gray.500"
                  transition="margin .3s ease-in-out"
                >
                  Engineering Blog
                </Link>
              </Text>
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <Box>
              <Link
                href="https://youtube.com/benjamincarlson"
                target="_blank"
                rel="noopener noreferrer"
                isExternal
              >
                <IconButton
                  borderRadius={5}
                  icon={<FiYoutube />}
                  fontSize="20px"
                  aria-label="YouTube"
                  bgColor="transparent"
                  _hover={{ backgroundColor: 'transparent', opacity: 0.8 }}
                  p={[1, 2, 4]}
                  ml={1}
                  w={65}
                />
              </Link>
              <Link
                href="https://github.com/carlson-technologies/coffeeclass.io"
                target="_blank"
                rel="noopener noreferrer"
                isExternal
              >
                <IconButton
                  borderRadius={5}
                  icon={<FiGithub />}
                  fontSize="20px"
                  aria-label="YouTube"
                  bgColor="transparent"
                  _hover={{ backgroundColor: 'transparent', opacity: 0.8 }}
                  p={[1, 2, 4]}
                  ml={1}
                  w={65}
                />
              </Link>
              <DarkModeSwitch />
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default NavBarDrawer

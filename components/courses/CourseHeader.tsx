import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Flex,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Badge
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { FiCoffee } from 'react-icons/fi'

export default function CourseHeader({ title, course }: any) {
  const courseTitle =
    course === 'chakra-ui'
      ? 'Chakra UI'
      : course === 'data-structures'
      ? 'Data Structures'
      : course === 'algorithms'
      ? 'Algorithms'
      : course === 'nextjs-algolia-instantsearch'
      ? 'Algolia InstantSearch'
      : ''

  return (
    <Flex align="center" justify="center" py={1}>
      <Breadcrumb spacing="0px" separator={<ChevronRightIcon color="gray.500" />}>
        <BreadcrumbItem display={['none', 'none', 'none', 'none', 'inline-flex', 'inline-flex']}>
          <BreadcrumbLink
            as={NextLink}
            href="/"
            px={2}
            py={1}
            borderRadius={5}
            transition="background-color 0.2s ease-in-out"
            _hover={{
              textDecor: 'none'
            }}
            className="hover:opacity-80 cursor-pointer text-sm dark:text-gray-300 font-normal text-gray-700"
          >
            coffeeclass.io
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem
          display={['inline-flex', 'inline-flex', 'inline-flex', 'inline-flex', 'none', 'none']}
        >
          <BreadcrumbLink
            as={NextLink}
            href="/"
            px={2}
            py={1}
            borderRadius={5}
            transition="background-color 0.2s ease-in-out"
            _hover={{
              textDecor: 'none'
            }}
            className="hover:opacity-80 cursor-pointer text-sm dark:text-gray-300 font-normal text-gray-700"
          >
            <Icon fontSize="lg" as={FiCoffee} />
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem display={['none', 'none', 'none', 'none', 'inline-flex', 'inline-flex']}>
          <BreadcrumbLink
            as={NextLink}
            href="/courses"
            px={2}
            py={1}
            borderRadius={5}
            transition="background-color 0.2s ease-in-out"
            _hover={{
              textDecor: 'none'
            }}
            className="hover:opacity-80 cursor-pointer text-sm dark:text-gray-300 font-normal text-gray-700"
          >
            Courses
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem display={['none', 'none', 'none', 'none', 'inline-flex', 'inline-flex']}>
          <BreadcrumbLink
            as={NextLink}
            href={`/courses/${course}`}
            px={2}
            py={1}
            borderRadius={5}
            transition="background-color 0.2s ease-in-out"
            _hover={{
              textDecor: 'none'
            }}
            className="hover:opacity-80 cursor-pointer text-sm dark:text-gray-300 font-normal text-gray-700"
          >
            {courseTitle}
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem
          display={['inline-flex', 'inline-flex', 'inline-flex', 'inline-flex', 'none', 'none']}
        >
          <BreadcrumbLink
            href="#"
            px={2}
            py={1}
            borderRadius={5}
            transition="background-color 0.2s ease-in-out"
            _hover={{
              textDecor: 'none'
            }}
          >
            <Menu>
              <MenuButton>...</MenuButton>
              <MenuList>
                <NextLink href="/courses" passHref>
                  <MenuItem>Courses</MenuItem>
                </NextLink>
                <NextLink href={`/courses/${course}`} passHref>
                  <MenuItem>{courseTitle}</MenuItem>
                </NextLink>
              </MenuList>
            </Menu>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink
            as={NextLink}
            href="#"
            px={2}
            py={1}
            borderRadius={5}
            transition="background-color 0.2s ease-in-out"
            _hover={{
              textDecor: 'none'
            }}
            isCurrentPage
            className="hover:opacity-80 cursor-pointer text-sm dark:text-gray-300 font-normal text-gray-700"
          >
            {title}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  )
}

import { useColorModeValue, Heading, Icon, Flex, IconButton, Link, Tooltip } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { FiCoffee, FiYoutube, FiGithub } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'

import { ISelected } from '../Container'

import DarkModeSwitch from './DarkModeSwitch'
import NavBarDrawer from './NavbarDrawer'
import NavItem from './NavItem'
import Search from './Search'

interface Props {
  selected: ISelected
}

export default function Navbar({ selected }: Props) {
  const router = useRouter()
  const { query } = router
  const bgColor1 = useColorModeValue('white', 'gray.800')

  return (
    <div className={twMerge('w-full', selected === 'home' && 'absolute top-0')}>
      <Flex
        as="nav"
        w="100%"
        px="4"
        pt="4"
        pb={2}
        zIndex={10}
        bgColor={router.pathname === '/' ? 'transparent' : bgColor1}
        borderBottom="1px solid"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <div className="flex items-center justify-between max-w-[2000px] w-full mx-auto">
          <div className="max-w-[300px] w-full hidden md:block">
            <Search />
          </div>
          <NextLink
            href="/"
            className="flex space-x-2 transition duration-300 ease-in-out text-brand_one-500 transform hover:scale-105"
            aria-label="Home"
            title="Home"
          >
            <Icon
              fontSize="2xl"
              as={FiCoffee}
              display={['inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'none']}
            />
            <Heading size="lg" display={['none', 'none', 'none', 'none', 'none', 'inherit']}>
              CoffeeClass.io
            </Heading>
          </NextLink>
          <div className="flex items-center justify-end hidden md:flex space-x-4 max-w-[300px] w-full">
            <NavItem title="Articles" href="/articles" isSelected={selected === 'article'} />
            <NavItem title="Courses" href="/courses" isSelected={selected === 'course'} />
            <Link href="https://youtube.com/benjamincarlson" isExternal>
              <FiYoutube className="hover:opacity-80 text-lg" aria-label="YouTube" />
            </Link>
            <Link href="https://github.com/carlson-technologies/coffeeclass.io" isExternal>
              <FiGithub className="hover:opacity-80 text-lg" aria-label="GitHub" />
            </Link>
            <DarkModeSwitch />
          </div>
          <NavBarDrawer />
        </div>
      </Flex>
      {!query.module && (
        <div className="justify-center py-2 space-x-4 border-b border-gray-200 dark:border-gray-700 hidden md:flex">
          <NavItem title="Chakra UI" href="/tags/chakra-ui" />
          <NavItem title="Flutter" href="/tags/flutter" />
          <NavItem title="Next.js" href="/tags/nextjs" />
          <NavItem title="React" href="/tags/react" />
          <NavItem title="JavaScript" href="/tags/javascript" />
          <NavItem title="About" href="/about" />
          <NavItem
            isExternal
            title="Write For Us"
            href="https://benjamincarlson.notion.site/Contributing-to-Coffeeclass-io-27ab5e894368424a9c86a7f11555514b"
          />
        </div>
      )}
    </div>
  )
}

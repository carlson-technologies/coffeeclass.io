import NextLink from 'next/link'
import { twMerge } from 'tailwind-merge'

type Props = {
  isExternal?: boolean
  href: string
  title: string
  isSelected?: boolean
}

export default function NavItem({ isExternal = false, href, title, isSelected }: Props) {
  return (
    <NextLink href={href} target={isExternal ? '_blank' : '_self'}>
      <p
        className={twMerge(
          'hover:opacity-80 text-sm dark:text-gray-300 font-normal text-gray-700 cursor-pointer',
          isSelected && 'font-extrabold'
        )}
        aria-label={title}
      >
        {title}
      </p>
    </NextLink>
  )
}

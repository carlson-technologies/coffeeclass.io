import { Kbd } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function KeyboardKey({ children }: Props) {
  return (
    <span>
      <Kbd mx={1}>{children}</Kbd>
    </span>
  )
}

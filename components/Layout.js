import Container from '../components/Container'
import {
  Flex,
} from '@chakra-ui/react'

export default function Layout({ children }) {
  return (
    <Container>
      <Flex flexDir="column" m={5}>
        {children}
      </Flex>
    </Container>
  )
}
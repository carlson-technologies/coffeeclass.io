import { Heading, Text } from '@chakra-ui/react'

const MDXComponents = {
    h1: (props) => <Heading as="h1" style={{ fontSize: '30px' }} {...props} />,
    p: (props) => <Text style={{ fontSize: '20px' }} {...props} />,
}

export default MDXComponents
import {
    Heading,
    Flex
} from '@chakra-ui/react'

type StepProps = {
    number: number,
    title: string,
};

const Step = ({ number, title }: StepProps) => {
    for (let i = 0; i < title.length; i++) {
        if (title[i] == '`') {
            title = title.replace('`', '')
        }
    }

    return (
        <Flex align="center" mt={12} mb={1}>
            <Flex borderRadius="50%" border="1px solid" w={35} h={35} alignItems="center" justifyContent="center" mr={2}>
                {number}
            </Flex>
            <Heading as="h2" size="md" id={title}>{title}</Heading>
        </Flex>
    )
}

export default Step
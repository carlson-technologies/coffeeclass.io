import { Text, Tooltip } from '@chakra-ui/react'

interface Props {
  title: string
  children: React.ReactNode
}

export default function DefinitionPopup({ title, children }: Props) {
  return (
    <Tooltip label={children} placement="top" fontSize="lg" p={5} hasArrow>
      <Text as="span" mx="1px" color="pink.500">
        {title}
        <Text as="span" color="pink.500">
          *
        </Text>
      </Text>
    </Tooltip>
  )
}

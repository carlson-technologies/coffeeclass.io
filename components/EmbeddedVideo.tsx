import { AspectRatio, Box } from '@chakra-ui/react'

interface Props {
  src: string
  ratio?: number
  maxW?: string | number
}

export default function EmbeddedVideo({ src, ratio = 16 / 9, maxW }: Props) {
  return (
    <Box my={2} w="100%" maxW={maxW}>
      <AspectRatio ratio={ratio}>
        <iframe src={src} allowFullScreen={true} />
      </AspectRatio>
    </Box>
  )
}

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Flex, Button, IconButton, Text } from '@chakra-ui/react'

type PaginationProps = {
  total: number
  sliceStart: number
  sliceEnd: number
  setSliceStart: (start: number) => void
  setSliceEnd: (end: number) => void
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Pagination({
  total,
  sliceStart,
  sliceEnd,
  setSliceStart,
  setSliceEnd
}: PaginationProps) {
  let pages: any = Math.ceil(total / 10)
  return (
    <>
      <Flex justify="center" my={4}>
        <IconButton
          m={1}
          icon={<ChevronLeftIcon />}
          aria-label="Previous"
          onClick={() => {
            if (sliceStart > 0) {
              setSliceStart(sliceStart - 10)
              setSliceEnd(sliceEnd - 10)
              scrollToTop()
            }
          }}
          _hover={{
            bg: 'brand_one.500'
          }}
          disabled={sliceStart === 0}
          display={sliceStart === 0 ? 'none' : 'inline'}
        />
        {Array.from(Array(pages).keys()).map(page => (
          <Button
            m={1}
            key={page}
            onClick={() => {
              setSliceStart(page * 10)
              setSliceEnd((page + 1) * 10)
              scrollToTop()
            }}
            disabled={page === sliceStart / 10}
            _disabled={{
              bg: 'brand_one.500'
            }}
            _hover={{
              bg: 'brand_one.500'
            }}
            bg={page === sliceStart / 10 ? 'brand_one.500' : 'transparent'}
            borderRadius="50%"
          >
            {page + 1}
          </Button>
        ))}
        <IconButton
          m={1}
          icon={<ChevronRightIcon />}
          aria-label="Next"
          onClick={() => {
            if (sliceEnd < total) {
              setSliceStart(sliceStart + 10)
              setSliceEnd(sliceEnd + 10)
              scrollToTop()
            }
          }}
          _hover={{
            bg: 'brand_one.500'
          }}
          disabled={sliceEnd >= total}
          display={sliceEnd >= total ? 'none' : 'inline'}
        />
      </Flex>
      <Flex justify="center" mx="auto" mb={2}>
        <Text color="gray.500" justifySelf="center" textAlign="center">
          Viewing articles {sliceStart + 1} - {total > sliceEnd ? sliceEnd : total} of {total}
        </Text>
      </Flex>
    </>
  )
}

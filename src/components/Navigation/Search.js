import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import SearchBox from "./SearchBox";
import Hits from "./Hits";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Button,
    useDisclosure,
    InputLeftElement,
    InputGroup,
    useColorModeValue,
    Text,
} from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons"
import ThanksBox from "./ThanksBox";

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
);

export default function Search({ is404 }) {
    // for search modal
    const { isOpen, onOpen, onClose } = useDisclosure()
    const bgColor = useColorModeValue("gray.100", "gray.800")
    const color1 = useColorModeValue("gray.300", "gray.600")
    const bgColor1 = useColorModeValue("gray.200", "gray.700")

    if (is404) {
        return (
            <>
                <Text onClick={onOpen} display="inline" color="gray.500" _hover={{ cursor: 'pointer' }} textDecor="underline">search</Text>
                <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" size="md">
                    <ModalOverlay />
                    <ModalContent bgColor={bgColor}>
                        <ModalHeader>Search</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <InstantSearch
                                searchClient={searchClient}
                                indexName="dev_content">
                                <SearchBox />
                                <Hits />
                            </InstantSearch>
                        </ModalBody>
                        <ModalFooter>
                            <ThanksBox src="/logos/algolia.png" alt="Algolia" intro="Search By" title="Algolia" width={8} href="https://www.algolia.com" />
                            <Button variant="ghost" onClick={onClose} ml={2}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }

    return (
        <>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    color={color1}
                    fontSize="1em"
                >
                    <Search2Icon />
                </InputLeftElement>
                <Input placeholder="Search coffeeclass.io" onClick={onOpen} />
            </InputGroup>

            <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" size="md">
                <ModalOverlay />
                <ModalContent bgColor={bgColor}>
                    <ModalHeader>Search</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <InstantSearch
                            searchClient={searchClient}
                            indexName="dev_content">
                            <SearchBox />
                            <Hits />
                        </InstantSearch>
                    </ModalBody>
                    <ModalFooter>
                        <ThanksBox src="/logos/algolia.png" alt="Algolia" intro="Search By" title="Algolia" width={8} href="https://www.algolia.com" />
                        <Button variant="ghost" onClick={onClose} ml={2} _hover={{ bgColor: bgColor1 }}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
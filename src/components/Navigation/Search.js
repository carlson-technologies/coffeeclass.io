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
} from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons"
import ThanksBox from "./ThanksBox";

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
);

export default function Search() {
    // for search modal
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <InputGroup mx={2}>
                <InputLeftElement
                    pointerEvents="none"
                    color={useColorModeValue("gray.500", "gray.400")}
                    fontSize="1em"
                    children={<Search2Icon />}
                />
                <Input placeholder="Search Articles" onClick={onOpen} />
            </InputGroup>

            <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" size="md">
                <ModalOverlay />
                <ModalContent bgColor={useColorModeValue("gray.100", "gray.800")}>
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
                        <ThanksBox src="/logos/algolia.png" intro="Search By" title="Algolia" width={8} href="https://www.algolia.com" />
                        <Button variant="ghost" onClick={onClose} ml={2}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
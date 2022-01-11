import { useEffect, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  RefinementList,
  VoiceSearch,
} from "react-instantsearch-dom";
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
  Box,
  useDisclosure,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  useColorModeValue,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import ThanksBox from "./ThanksBox";
import KeyboardKey from "../Content/KeyboardKey";

interface Props {
  is404?: boolean;
}

// declare global {
//   interface Window {
//     ga: any;
//   }
// }

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

export default function Search({ is404 }: Props) {
  // for search modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const color1 = useColorModeValue("gray.300", "gray.600");
  const color2 = useColorModeValue("gray.500", "gray.400");

  const KEY_WINDOWS = "Ctrl";
  const KEY_APPLE = "⌘";

  const [key, setKey] = useState(KEY_WINDOWS);
  const [isMobile, setIsMobile] = useState(false);
  const [placeholderText, setPlaceholderText] = useState(
    "Search coffeeclass.io"
  );

  const handleKeyPress = (e: any) => {
    // if key is "command + k" or "ctrl + k" then open the search modal
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      isOpen ? onClose() : onOpen();
    }
  };

  const ButtonText = ({ isListening, isBrowserSupported }: any) => (
    <Button
      as="div"
      disabled={!isBrowserSupported || isListening}
      my={2}
      isLoading={isListening}
      loadingText="⏹ Listening..."
      w={"full"}
      colorScheme="brand_one"
    >
      🎙 Click to search with voice
    </Button>
  );

  const Status = ({ status, transcript }: any) => {
    console.log(status);
    return (
      <Flex my={2}>
        {(status === "finished" ||
          status === "waiting" ||
          status === "recognizing") && (
          <Text>
            {status === "waiting" ? "Waiting..." : "Your search:"}{" "}
            <b>{transcript}</b>
          </Text>
        )}
      </Flex>
    );
  };

  useEffect(() => {
    // check if the user is using a mobile device
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setIsMobile(true);
      setPlaceholderText("Search")
    }
  }, []);

  useEffect(() => {
    if (navigator.platform.indexOf("Mac") > -1) setKey(KEY_APPLE);
  }, []);

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  });

  return (
    <>
      {is404 ? (
        <Text
          onClick={onOpen}
          display="inline"
          color="gray.500"
          _hover={{ cursor: "pointer" }}
          textDecor="underline"
        >
          search
        </Text>
      ) : (
        <InputGroup>
          <InputLeftElement pointerEvents="none" color={color1} fontSize="1em">
            <Search2Icon />
          </InputLeftElement>
          <Input
            as="button"
            title="Search coffeeclass.io"
            onClick={onOpen}
            data-splitbee-event="Button Click"
            data-splitbee-event-type="Algolia Search"
          >
            <Text textAlign="left" color={color2}>
              {placeholderText}
            </Text>
          </Input>
          {!isMobile && (
            <InputRightElement
              pointerEvents="none"
              fontSize="2xl"
              w="fit-content"
              mr={2}
            >
              <KeyboardKey>{key}</KeyboardKey>
              <KeyboardKey>k</KeyboardKey>
            </InputRightElement>
          )}
        </InputGroup>
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        size="md"
      >
        <ModalOverlay />
        <ModalContent bgColor={bgColor}>
          <ModalHeader>Search coffeeclass.io</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InstantSearch
              searchClient={searchClient}
              indexName="dev_content"
              // onSearchStateChange={(searchState) => {
              //   const page = `?query=${searchState.query}`;
              //   window.ga("send", "pageView", page);
              // }}
            >
              {/* <Configure hitsPerPage={5} /> */}
              <SearchBox />
              <Box align="center">
                <VoiceSearch
                  searchAsYouSpeak={false}
                  buttonTextComponent={ButtonText}
                  statusComponent={Status}
                  translations={{
                    buttonTitle: "Voice Search",
                    disabledButtonTitle: "Voice Search Disabled",
                  }}
                />
              </Box>
              {/* <RefinementList attribute="title" limit={10} /> */}
              <Hits />
              {/* <Flex mt={2} justify="center">
                <Pagination defaultRefinement={2} />
              </Flex> */}
            </InstantSearch>
          </ModalBody>
          <ModalFooter>
            <ThanksBox
              src="/logos/algolia.png"
              alt="Algolia"
              intro="Search By"
              title="Algolia"
              width={8}
              href="https://www.algolia.com"
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

import { connectSearchBox } from "react-instantsearch-dom";
import { Input, Box } from "@chakra-ui/react";

let placeHolderArray = [
  "How to use Next/Image component",
  "Add Firebase to a React Native app",
  "Chakra UI",
];

function SearchBox({ refine }: any) {
  return (
    <Box>
      <Input
        w="100%"
        id="algolia_search"
        type="search"
        placeholder={
          placeHolderArray[Math.floor(Math.random() * placeHolderArray.length)]
        }
        onChange={(e) => refine(e.currentTarget.value)}
        autoFocus
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        autoComplete="off"
      />
    </Box>
  );
}

export default connectSearchBox(SearchBox);

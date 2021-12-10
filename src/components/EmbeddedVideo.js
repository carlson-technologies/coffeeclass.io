// This component allows a video to be embedded in the page.
// It takes a video src, alt, and ratio
// ratio is optional and defaults to 16:9

import {
    AspectRatio,
    Box,
} from "@chakra-ui/react"

export default function EmbeddedVideo({src, alt, ratio, maxW}) {
    return (
        <Box my={2} w="100%" maxW={maxW}>
            <AspectRatio ratio={`${ratio || 16 / 9}`}>
                <iframe
                    src={src || ""}
                    alt={alt}
                    allowFullScreen={true}
                />
            </AspectRatio>
        </Box>
    )
}

import { Kbd } from "@chakra-ui/react"

export default function KeyboardKey({ children }) {
    return (
        <span>
            <Kbd mx={1}>{children}</Kbd>
        </span>
    )
}

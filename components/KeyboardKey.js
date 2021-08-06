import { Kbd } from "@chakra-ui/react"

export default function KeyboardKey({ children }) {
    return (
        <span>
            <Kbd>{children}</Kbd>
        </span>
    )
}

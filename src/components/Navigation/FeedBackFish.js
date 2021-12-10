import { FeedbackFish } from '@feedback-fish/react'
import {
    Icon,
    useColorModeValue,
} from "@chakra-ui/react"
import { FiInfo } from "react-icons/fi"

import React from 'react'

export default function FeedBackFish() {
    return (
        <FeedbackFish projectId="f699bbf3354f3d">
            <Icon
                color="gray.500"
                zIndex={100}
                position="fixed"
                icon={<FiInfo />}
                borderRadius="50%"
                bottom="4"
                right="4"
                fontSize="35px"
                variant="ghost"
                cursor="pointer"
                overflow="hidden"
                size="sm"
                _hover={{
                    backgroundColor: useColorModeValue('gray.200', 'gray.700'),
                }}
            />
        </FeedbackFish>
    )
}

import {
    Heading,
    Flex,
    Stack,
    Text,
    UnorderedList,
    ListItem,
    Box,
    useColorModeValue,
    Link,
} from '@chakra-ui/react'
import Container from '../../components/Container'

const title = 'Disclaimer'
const description = 'The coffeeclass.io legal disclaimer.'
const url = 'https://www.coffeeclass.io/legal/disclaimer/'

export default function Privacy() {
    return (
        <Container title={title} description={description} url={url}>
            <Stack
                spacing={8}
                px={4}
                maxW="100em"
            >
                <Flex
                    flexDir="column"
                    mx={5}
                    as="section"
                    maxW="100em"
                >
                    <Heading mt={4} as="h1" size="2xl" color="brand_one.500">Disclaimer</Heading>
                    <Box bgColor="brand_one.500" h={2} w={150} borderRadius={5} mb={4} mt={2} />
                    <Text color={useColorModeValue("gray.600", "gray.400")}>Last updated: June 30, 2021</Text>
                    <Heading mt={4} as="h2">Interpretation and Definitions</Heading>
                    <Heading mt={4} as="h2">Interpretation</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The words of which the initial letter is capitalized have meanings defined under the following conditions.
                        The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</Text>
                    <Heading mt={4} as="h2">Definitions</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>For the purposes of this Disclaimer:</Text>
                    <UnorderedList listStylePos="inside" color={useColorModeValue("gray.600", "gray.400")}>
                        <ListItem><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Disclaimer) refers to Carlson Technologies LLC, 224 Briarwood Lane, Middletown, CT 06457.</ListItem>
                        <ListItem><strong>Service</strong> refers to the Website.</ListItem>
                        <ListItem><strong>You</strong> means the individual accessing the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</ListItem>
                        <ListItem><strong>Website</strong> refers to coffeeclass.io, accessible from <a href="https://www.coffeeclass.io/" rel="external nofollow noopener" target="_blank">https://www.coffeeclass.io/</a></ListItem>
                    </UnorderedList>
                    <Heading mt={4} as="h2">Disclaimer</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The information contained on the Service is for general information purposes only.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The Company assumes no responsibility for errors or omissions in the contents of the Service.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>In no event shall the Company be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. The Company reserves the right to make additions, deletions, or modifications to the contents on the Service at any time without prior notice. This Disclaimer has been created with the help of the <a href="https://www.termsfeed.com/disclaimer-generator/" target="_blank">Disclaimer Generator</a>.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The Company does not warrant that the Service is free of viruses or other harmful components.</Text>
                    <Heading mt={4} as="h2">External Links Disclaimer</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The Service may contain links to external websites that are not provided or maintained by or in any way affiliated with the Company.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>Please note that the Company does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</Text>
                    <Heading mt={4} as="h2">Errors and Omissions Disclaimer</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The information given by the Service is for general guidance on matters of interest only. Even if the Company takes every precaution to insure that the content of the Service is both current and accurate, errors can occur. Plus, given the changing nature of laws, rules and regulations, there may be delays, omissions or inaccuracies in the information contained on the Service.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The Company is not responsible for any errors or omissions, or for the results obtained from the use of this information.</Text>
                    <Heading mt={4} as="h2">Fair Use Disclaimer</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The Company may use copyrighted material which has not always been specifically authorized by the copyright owner. The Company is making such material available for criticism, comment, news reporting, teaching, scholarship, or research.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The Company believes this constitutes a &quot;fair use&quot; of any such copyrighted material as provided for in section 107 of the United States Copyright law.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>If You wish to use copyrighted material from the Service for your own purposes that go beyond fair use, You must obtain permission from the copyright owner.</Text>
                    <Heading mt={4} as="h2">Views Expressed Disclaimer</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The Service may contain views and opinions which are those of the authors and do not necessarily reflect the official policy or position of any other author, agency, organization, employer or company, including the Company.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>Comments published by users are their sole responsibility and the users will take full responsibility, liability and blame for any libel or litigation that results from something written in or as a direct result of something written in a comment. The Company is not liable for any comment published by users and reserve the right to delete any comment for any reason whatsoever.</Text>
                    <Heading mt={4} as="h2">No Responsibility Disclaimer</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The information on the Service is provided with the understanding that the Company is not herein engaged in rendering legal, accounting, tax, or other professional advice and services. As such, it should not be used as a substitute for consultation with professional accounting, tax, legal or other competent advisers.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>In no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever arising out of or in connection with your access or use or inability to access or use the Service.</Text>
                    <Heading mt={4} as="h2">&quot;Use at Your Own Risk&quot; Disclaimer</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>All information in the Service is provided &quot;as is&quot;, with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied, including, but not limited to warranties of performance, merchantability and fitness for a particular purpose.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The Company will not be liable to You or anyone else for any decision made or action taken in reliance on the information given by the Service or for any consequential, special or similar damages, even if advised of the possibility of such damages.</Text>
                    <Heading mt={4} as="h2">Contact Us</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>If you have any questions about this Disclaimer, You can contact Us:</Text>
                    <UnorderedList listStylePos="inside" color={useColorModeValue("gray.600", "gray.400")}>
                        <ListItem>By email: <Link color="brand_one.500" href="mailto:ben@carlsontechnologies.dev">ben@carlsontechnologies.dev</Link></ListItem>
                    </UnorderedList>
                </Flex>
            </Stack>
        </Container>
    )
}
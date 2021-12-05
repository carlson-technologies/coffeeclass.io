import {
    Heading,
    Flex,
    Stack,
    Text,
    UnorderedList,
    ListItem,
    useColorModeValue,
    Link,
    Box,
} from '@chakra-ui/react'
import Container from '../../components/Container'

const title = 'Privacy Policy'
const description = 'The coffeeclass.io legal privacy policy.'
const url = 'https:www.coffeeclass.io/legal/privacy/'

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
                    <Heading mt={4} as="h1" size="2xl" color="brand_one.500">Privacy Policy</Heading>
                    <Box bgColor="brand_one.500" h={2} w={150} borderRadius={5} mb={4} mt={2} />
                    <Text color={useColorModeValue("gray.600", "gray.400")}>Last updated: June 30, 2021</Text>
                    <Text my={2} color={useColorModeValue("gray.600", "gray.400")}>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the <a href="https://www.termsfeed.com/privacy-policy-generator/" target="_blank">Privacy Policy Generator</a>.</Text>
                    <Heading mt={4} as="h2">Interpretation and Definitions</Heading>
                    <Heading mt={4} as="h2">Interpretation</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</Text>
                    <Heading mt={4} as="h2">Definitions</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>For the purposes of this Privacy Policy:</Text>
                    <UnorderedList listStylePos="inside" color={useColorModeValue("gray.600", "gray.400")}>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Carlson Technologies LLC, 224 Briarwood Lane, Middletown, CT 06457.</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>Country</strong> refers to: Connecticut,  United States</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>Service</strong> refers to the Website.</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>Website</strong> refers to coffeeclass.io, accessible from <a href="https://www.coffeeclass.io/" rel="external nofollow noopener" target="_blank">https://www.coffeeclass.io/</a></Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</Text>
                        </ListItem>
                    </UnorderedList>
                    <Heading mt={4} as="h2">Collecting and Using Your Personal Data</Heading>
                    <Heading mt={4} as="h2">Types of Data Collected</Heading>
                    <Heading mt={4} as="h3">Personal Data</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</Text>
                    <UnorderedList listStylePos="inside" color={useColorModeValue("gray.600", "gray.400")}>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}>Address, State, Province, ZIP/Postal code, City</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}>Usage Data</Text>
                        </ListItem>
                    </UnorderedList>
                    <Heading mt={4} as="h3">Usage Data</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>Usage Data is collected automatically when using the Service.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</Text>
                    <Heading mt={4} as="h3">Tracking Technologies and Cookies</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:</Text>
                    <UnorderedList listStylePos="inside">
                        <ListItem><strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.</ListItem>
                        <ListItem><strong>Flash Cookies.</strong> Certain features of our Service may use local stored objects (or Flash Cookies) to collect and store information about Your preferences or Your activity on our Service. Flash Cookies are not managed by the same browser settings as those used for Browser Cookies. For more information on how You can delete Flash Cookies, please read &quot;Where can I change the settings for disabling, or deleting local shared objects?&quot; available at <a href="https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_" rel="external nofollow noopener" target="_blank">https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_</a></ListItem>
                        <ListItem><strong>Web Beacons.</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).</ListItem>
                    </UnorderedList>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. You can learn more about cookies here: <a href="https://www.termsfeed.com/blog/cookies/" target="_blank">All About Cookies by TermsFeed</a>.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>We use both Session and Persistent Cookies for the purposes set out below:</Text>
                    <UnorderedList listStylePos="inside" color={useColorModeValue("gray.600", "gray.400")}>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>Necessary / Essential Cookies</strong></Text>
                            <Text color={useColorModeValue("gray.600", "gray.400")}>Type: Session Cookies</Text>
                            <Text color={useColorModeValue("gray.600", "gray.400")}>Administered by: Us</Text>
                            <Text color={useColorModeValue("gray.600", "gray.400")}>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>Cookies Policy / Notice Acceptance Cookies</strong></Text>
                            <Text color={useColorModeValue("gray.600", "gray.400")}>Type: Persistent Cookies</Text>
                            <Text color={useColorModeValue("gray.600", "gray.400")}>Administered by: Us</Text>
                            <Text color={useColorModeValue("gray.600", "gray.400")}>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>Functionality Cookies</strong></Text>
                            <Text color={useColorModeValue("gray.600", "gray.400")}>Type: Persistent Cookies</Text>
                            <Text color={useColorModeValue("gray.600", "gray.400")}>Administered by: Us</Text>
                            <Text color={useColorModeValue("gray.600", "gray.400")}>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</Text>
                        </ListItem>
                    </UnorderedList>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.</Text>
                    <Heading mt={4} as="h2">Use of Your Personal Data</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The Company may use Personal Data for the following purposes:</Text>
                    <UnorderedList listStylePos="inside" color={useColorModeValue("gray.600", "gray.400")}>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</Text>
                        </ListItem>
                        <ListItem>
                            <Text color={useColorModeValue("gray.600", "gray.400")}><strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</Text>
                        </ListItem>
                    </UnorderedList>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>We may share Your personal information in the following situations:</Text>
                    <UnorderedList listStylePos="inside" color={useColorModeValue("gray.600", "gray.400")}>
                        <ListItem><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service,  to contact You.</ListItem>
                        <ListItem><strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</ListItem>
                        <ListItem><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</ListItem>
                        <ListItem><strong>With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</ListItem>
                        <ListItem><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</ListItem>
                        <ListItem><strong>With Your consent</strong>: We may disclose Your personal information for any other purpose with Your consent.</ListItem>
                    </UnorderedList>
                    <Heading mt={4} as="h2">Retention of Your Personal Data</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</Text>
                    <Heading mt={4} as="h2">Transfer of Your Personal Data</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</Text>
                    <Heading mt={4} as="h2">Disclosure of Your Personal Data</Heading>
                    <Heading mt={4} as="h3">Business Transactions</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</Text>
                    <Heading mt={4} as="h3">Law enforcement</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</Text>
                    <Heading mt={4} as="h3">Other legal requirements</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</Text>
                    <UnorderedList listStylePos="inside" color={useColorModeValue("gray.600", "gray.400")}>
                        <ListItem>Comply with a legal obligation</ListItem>
                        <ListItem>Protect and defend the rights or property of the Company</ListItem>
                        <ListItem>Prevent or investigate possible wrongdoing in connection with the Service</ListItem>
                        <ListItem>Protect the personal safety of Users of the Service or the public</ListItem>
                        <ListItem>Protect against legal liability</ListItem>
                    </UnorderedList>
                    <Heading mt={4} as="h2">Security of Your Personal Data</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</Text>
                    <Heading mt={4} as="h2">Children's Privacy</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.</Text>
                    <Heading mt={4} as="h2">Children and COPPA</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>coffeeclass.io is committed to complying with the Children’s Online Privacy Protection Act (COPPA). We do not use our services to intentionally solicit data from or market to children under the age of 13. We encourage parents and guardians to report any suspicions that a child has provided us with information without their consent. We will take reasonable action to remove this information.</Text>
                    <Heading mt={4} as="h2">Links to Other Websites</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</Text>
                    <Heading mt={4} as="h2">Changes to this Privacy Policy</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</Text>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</Text>
                    <Heading mt={4} as="h2">Contact Us</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")}>If you have any questions about this Privacy Policy, You can contact us:</Text>
                    <UnorderedList listStylePos="inside" color={useColorModeValue("gray.600", "gray.400")}>
                        <ListItem>By email: <Link href="mailto:ben@carlsontechnologies.dev" color="brand_one.500">ben@carlsontechnologies.dev</Link></ListItem>
                    </UnorderedList>
                </Flex>
            </Stack>
        </Container>
    )
}
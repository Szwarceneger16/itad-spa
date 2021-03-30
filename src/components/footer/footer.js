import { 
    Box, 
    Flex, 
    Text,
} from "@chakra-ui/react";
import LanguageSelector from "./languagePopover.tsx";

const flexChildreenStyle = {
    p: 4,
}

const FooterContainer = ({ children, ...props }) => {
    return (

        <Flex
        justify='center'
        w="100%"
        h='5vh'
        align="center"
        justify="center"
        mb={0}
        p={2}
        bg={["green.500", "green.500", "orange.400", "orange.400"]}
        color={["white", "white", "green.700", "green.700"]}
        {...props}
        >
            {children}
        </Flex>
    );
};

const supportedLanguage = [
{ 
    countryCode:"US",
    languageCode: "en",
    countryTitle: 'English (USA)'
},
{ 
    countryCode:"pl",
    countryTitle: 'Polski'
},
{ 
    countryCode:"DE",
    countryTitle: 'Deutsche'
},
]

function Footer(params) {
    return (
        <FooterContainer>
            <Box {...flexChildreenStyle}/>
            <Box {...flexChildreenStyle}>
                <Text >Page Created By Grzegorz Szwarc</Text>
            </Box>
            <Box {...flexChildreenStyle}>
                <LanguageSelector supportedLanguage={supportedLanguage} />
            </Box>
            
        </FooterContainer>
    )
}

export default Footer;
import { 
    Box, 
    Flex, 
    Text,
} from "@chakra-ui/react";
import LanguageSelector from "./languagePopover.js";
import { useTranslation } from 'react-i18next';

const flexChildreenStyle = {
    p: 0,
    m: 1,
}

const FooterContainer = ({ children, ...props }) => {
    return (

        <Flex
        justify='center'
        flexWrap="wrap"
        w="100%"
        align="center"
        m={0}
        p={0}
        h={"6vh"}
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
    countryTitle: 'English US'
},
{ 
    countryCode:"pl",
    countryTitle: 'Polski'
},
// { 
//     countryCode:"DE",
//     countryTitle: 'Deutsche'
// },
]

function Footer(params) {
    const {t} = useTranslation(["common"]);
    
    return (
        <FooterContainer>
            
            <Box {...flexChildreenStyle}>
                <LanguageSelector supportedLanguage={supportedLanguage} />
            </Box>
            
        </FooterContainer>
    )
}

export default Footer;

/*
<Box {...flexChildreenStyle}>
    <Text >{t('common:footer.title', { author: ".NET"})}</Text>
</Box>
*/
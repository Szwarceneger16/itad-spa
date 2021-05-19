
import { 
    Link,
    Box, 
    Text,
    Button, 
    Image,  
    Input,
    Popover,
    PopoverTrigger,
    PopoverArrow,
    PopoverContent,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    Portal,
} from "@chakra-ui/react";
import { useRef, useState,createContext } from "react";
import ReactCountryFlag from "react-country-flag"
import { useTranslation } from 'react-i18next';

const { Provider, Consumer } = createContext();

function prepareChildreen(searchValue,children) {
    if (searchValue !== '') {
        const filterRegex = new RegExp(searchValue,'i');
        children = children.filter(element => {
            //debugger;
           return !!element.key.match(filterRegex);
        });
    }
    return children;
}

function PopoverWithScroll( { menuTitle,h,w,firstGroupTitle,secondGroupTitle,children,...props} ) {
    const [ searchValue , setSearchValue] = useState('');
    const popoverRef = useRef()
    const ref = useRef();
    const { t, i18n } = useTranslation(["common"]);
    children = prepareChildreen(searchValue,children);

    function handleSearchChange(event) {
        event.preventDefault();
        setSearchValue(event.target.value);
        
    }
    function handleKeyPress(event) {
        event.preventDefault();
        if ( event.code === 'Backspace' ) {
            setSearchValue(searchValue.slice(0,-1));
        } else if ( event.code === 'Escape' ) {
            setSearchValue('')
        } else if ( event.code.includes('Key') ) {
            setSearchValue( searchValue + event.key);
        }
        
    }

    return (
        <>
        <Portal containerRef={ref}>
            <Box >
                <Input type='text' 
                    value={searchValue} 
                    onChange={handleSearchChange} 
                    id='languagePopoverSearchInput' 
                    placeholder={t("common:language.popover.country")} 
                />
            </Box>
        </Portal>
        <Popover initialFocusRef={popoverRef} placement='bottom'>
        {({ isOpen, onClose }) => (
            <>
            <PopoverTrigger>
                <Button>{menuTitle}</Button>
            </PopoverTrigger>
            <PopoverContent 
                h='30vh' w='200px' 
                value={searchValue}
                onKeyDown={handleKeyPress}
            
            >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>{firstGroupTitle}</PopoverHeader>
                <PopoverBody ref={ref}></PopoverBody>
                <PopoverHeader>{secondGroupTitle}</PopoverHeader>
                <PopoverBody 
                    overflow="hidden" 
                    overflowY='scroll' 
                    h='100%'
                    p='0'
                
                >
                    <Provider value={onClose}>
                    {children}
                    </Provider>
                    
                </PopoverBody>
            </PopoverContent>
            </>
        )}
        </Popover>
        </>
    )
}

function PopoverCountryButton( {languageCode,countryCode,countryTitle}) {
    const { i18n } = useTranslation();

    return (
        <Consumer>
            {consumerValue => (
            <Box as="button" 
                w='100%' py='' px='2'
                textAlign='left' 
                _hover={{
                    background: "gray.100",
                }}
                onClick={ () => {
                    i18n.changeLanguage(languageCode || countryCode);
                    consumerValue();
                }}
            > 
                <Text>
                    <ReactCountryFlag countryCode={countryCode} svg />
                    {" "+countryTitle}
                </Text>
            </Box>
            )}
            
    </Consumer>
    )
}

export default function LanguagePopover({supportedLanguage}) {
    const { t, i18n } = useTranslation(["common"]);

    return (
        <PopoverWithScroll
            menuTitle={t("common:language.popover.selectLanguage")}
            firstGroupTitle={t("common:language.popover.search")}
            secondGroupTitle={t("common:language.popover.orSelectFromList")}
        >
            {supportedLanguage.map( e => {
                return <PopoverCountryButton 
                        key={e.countryTitle} 
                        {...e} 
                        />
            })}
        </PopoverWithScroll>
    )
}

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
    PortalProps,
} from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import React , { useRef, useState,createContext, ReactFragment, ChangeEvent } from "react";
import ReactCountryFlag from "react-country-flag"
import { useTranslation } from 'react-i18next';
import { JsxChild } from "typescript";

const { Provider, Consumer } = createContext({});

function prepareChildreen(searchValue:string,children:ReactJSXElement) {
    if (searchValue !== '') {
        const filterRegex = new RegExp(searchValue,'i');
        children = children.filter(element => {
            //debugger;
           return !!element.key.match(filterRegex);
        });
    }
    return children;
}
interface PopoverWithScrollArguments {}
function PopoverWithScroll( 
    { menuTitle,firstGroupTitle,secondGroupTitle,children,...props} :
     { menuTitle: string, firstGroupTitle:string,secondGroupTitle:string,children:ReactJSXElement}
    ) {
    const [ searchValue , setSearchValue] : [searchValue:string, setSearchValue:Function] = useState('');
    const popoverRef:any = useRef()
    const ref = useRef();

    children = prepareChildreen(searchValue,children);

    function handleSearchChange(event : React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setSearchValue(event.currentTarget.value);
        
    }
    function handleKeyPress(event : React.KeyboardEvent) {
        event.preventDefault();
        if ( event.code === 'Backspace' ) {
            setSearchValue(searchValue.slice(0,-1));
        } else if ( event.code === 'Escape' ) {
            setSearchValue('')
        } else if ( event.code.includes('Key') ) {
            setSearchValue( searchValue + event.key);
        }
        
    }

    return (<React.Fragment>
        <Portal containerRef={ref}>
            <Box >
                <Input type='text' 
                    value={searchValue} 
                    onChange={handleSearchChange} 
                    id='languagePopoverSearchInput' 
                    placeholder="country" 
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
        </React.Fragment>
    )
}

function PopoverCountryButton( 
        {languageCode,countryCode,countryTitle} :
        {languageCode? : string,countryCode: string,countryTitle: string}
        ) {
    const { i18n } = useTranslation();

    return (
        <Consumer>
            { (consumerValue : {consumerValue :React.ConsumerProps}):React.ReactChild (
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
    

    return (
        <PopoverWithScroll
            menuTitle="Select language"
            firstGroupTitle="Search"
            secondGroupTitle="or select from list"
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
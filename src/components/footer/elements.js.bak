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
import { useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag"

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

export function PopoverWithScroll( { menuTitle,h,w,firstGroupTitle,secondGroupTitle,children,...props} ) {
    const [ searchValue , setSearchValue] = useState('');
    const ref = useRef();

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
                    placeholder="country" 
                />
            </Box>
        </Portal>
        <Popover placement='bottom'>
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
                    {children}
                </PopoverBody>
            </PopoverContent>
        </Popover>
        </>
    )
}

export function PopoverCountryButton( {countryCode,countryTitle}) {

    return (
        <Box as="button" 
        w='100%' py='' px='2'
        textAlign='left' 
        _hover={{
            background: "gray.100",
        }}
    > 
        <Text>
            <ReactCountryFlag countryCode={countryCode} svg />
            {" "+countryTitle}
        </Text>
    </Box>
    )
}
import { 
    Link,
    Box, 
    Flex, 
    Text,
    Divider, 
    Button, 
    Stack,
    MenuItem,
    Menu,
    MenuButton,
    ChevronDownIcon ,
    MenuDivider,
    MenuList,
    MenuGroup,
    FormControl,
    Editable,
    EditableInput,
    EditablePreview,
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
import { EmailIcon } from '@chakra-ui/icons';
import { useRef, useState } from "react";
import { Field } from 'formik';
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

function Footer(params) {
    return (
        <FooterContainer>
            <Box {...flexChildreenStyle}/>
            <Box {...flexChildreenStyle}>
                <Text >Page Created By Grzegorz Szwarc</Text>
            </Box>
            <Box {...flexChildreenStyle}>
                <PopoverWithScroll
                    menuTitle="Select language"
                    firstGroupTitle="Search"
                    secondGroupTitle="or select from list"
                >
                    <><EmailIcon mr='2' />abc</>
                    <><EmailIcon mr='2' />aaa</>
                    <>bbb</>
                    <>ccc</>
                    <>aab</>
                    <Text>aac</Text>
                    <Text>abb</Text>
                </PopoverWithScroll>
            </Box>
            
        </FooterContainer>
    )
}

function prepareChildreen(searchValue,children) {
    if (searchValue !== '') {
        const filterRegex = new RegExp(searchValue,'i');
        children = children.filter(element => {
           return !!element.props.children.match(filterRegex);
        });
    }
    return children;
}

const fieldName = 'abcd';
function MenuWithScroll( { menuTitle,h,w,firstGroupTitle,secondGroupTitle,children,...props} ) {
    const [ searchValue , setSearchValue] = useState('');
    const ref = useRef();

    children = prepareChildreen(searchValue,children);

    children = children.map( (e,index) => {
        return (
            <MenuItem key={index}>
                {e}
            </MenuItem>
        )
    })

    function handleSearch(event) {
        setSearchValue(event.target.value);
        // event.preventDefault();
    }

    return (
        <>
        <Portal containerRef={ref}>
            <Box m={2}>
                <Input type='text' 
                    value={searchValue} 
                    onChange={handleSearch} 
                    id={fieldName} 
                    placeholder="country" 
                />
            </Box>

        </Portal>
        <Menu p={4} > 
            <MenuButton as={Button} >
                {menuTitle}
                
            </MenuButton>
            <MenuList 
                h={h ? h : '35vh'}
                w={w ? w : '15vw'}
                overflowY='scroll'
                overflowX='hidden'
            >
                {/* <MenuGroup title={firstGroupTitle} ref={ref} >
                </MenuGroup> */}
                {/* <MenuDivider /> */}
                <MenuGroup title={secondGroupTitle}>
                    {children}  
                </MenuGroup>
                
            </MenuList>
        </Menu>
        </>
    )
}

function PopoverWithScroll( { menuTitle,h,w,firstGroupTitle,secondGroupTitle,children,...props} ) {
    const [ searchValue , setSearchValue] = useState('');
    const ref = useRef();

    children = prepareChildreen(searchValue,children);
    children = children.map( (e,index) => {
        //debugger;
        return (
            <Box as="button" key={index}
                w='100%' py='' px='2'
                textAlign='left' 
                _hover={{
                    background: "gray.100",
                }}
            > 
            
                {e}
            </Box>
            // <Button w='100%' textAlign='left' key={index} colorScheme="teal" variant="ghost">
            //      {e}
            // </Button>
        )
    })

    function handleSearchChange(event) {
        setSearchValue(event.target.value);
        event.preventDefault();
    }
    function handleKeyPress(event) {
        setSearchValue(String.fromCharCode(event.charCode));
        event.preventDefault();
    }

    return (
        <>
        <Portal containerRef={ref}>
            <Box >
                <Input type='text' 
                    value={searchValue} 
                    onChange={handleSearchChange} 
                    id={fieldName} 
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
                onKeyPress={handleKeyPress}
            
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
                
                >{children}</PopoverBody>
            </PopoverContent>
        </Popover>
        </>
    )
}

export default Footer;
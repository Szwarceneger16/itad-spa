
import {
    Avatar,
    Drawer,
    Input,
    Button,
    useDisclosure,
    Link,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    AvatarBadge,
    DrawerContent,
    DrawerCloseButton,
  } from "@chakra-ui/react"
import React from 'react';

export function UserAvatar( {userData}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        
        <>
        <Link ref={btnRef} onClick={onOpen}>
            <Avatar name="Oshigaki Kisame" src={"https://bit.ly/"+userData.avatarSrc}>
              <AvatarBadge border color="yellow" bg="grey" boxSize="1.25em">{userData.eventsCount}</AvatarBadge>
            </Avatar>
        </Link>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Create your account</DrawerHeader>
  
              <DrawerBody>
                <Input placeholder="Type here..." />
              </DrawerBody>
  
              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button color="blue">Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </>
    )
}
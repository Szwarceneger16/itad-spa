
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
import UserDashboard from '../user/dashboard';

export function UserAvatar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        
        <>
        <Link ref={btnRef} onClick={onOpen}>
            <Avatar name="Oshigaki Kisame" /* src={"https://bit.ly/"+userData.avatarSrc} */ src="https://bit.ly/dan-abramov">
              <AvatarBadge border color="yellow" bg="grey" boxSize="1.25em">4{/* userData.eventsCount */}</AvatarBadge>
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
                <UserDashboard />
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
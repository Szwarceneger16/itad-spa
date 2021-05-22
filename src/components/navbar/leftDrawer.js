
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
import { useTranslation } from "react-i18next";

export function UserAvatar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const { t, i18n } = useTranslation(["common", "auth"]);

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
          transitionDuration={{ enter: 500, exit: 1000 }}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>
                {
                  t("auth:edit.leftDrawer.account")
                }     
              </DrawerHeader>
  
              <DrawerBody>
                <UserDashboard />
              </DrawerBody>
              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  {
                    t("auth:edit.leftDrawer.cancel")
                  }                  
                </Button>
                {/*<Button color="blue">Save</Button>*/}
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </>
    )
}
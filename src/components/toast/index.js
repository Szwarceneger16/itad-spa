import { useToast } from "@chakra-ui/react"
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function () {
    const toast = useToast();
    const messagePayload = useSelector(state => state.message )

    useEffect(()=> {
        if (messagePayload) {
            toast({
                title: messagePayload.title,
                status: messagePayload.status,
                duration: 5000,
                isClosable: true, 
            })
        }

    }, [messagePayload]);

    return (null);

}


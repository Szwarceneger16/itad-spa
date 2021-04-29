import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function () {
  const toast = useToast();
  const { message, status } = useSelector((state) => state.message);

  useEffect(() => {
    if (message) {
      toast({
        title: message,
        status: status,
        duration: 5000,
        isClosable: true,
      });
    }
  }, [message]);

  return null;
}

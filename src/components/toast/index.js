import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "src/actions/message";

export default function () {
  const toast = useToast();
  const { message, status } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      toast({
        title: message,
        status: status,
        duration: 5000,
        isClosable: true,
        onCloseComplete: () => {
          
        }
      });
      dispatch(clearMessage());
    }
  }, [message]);

  return null;
}

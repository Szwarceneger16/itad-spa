import { Button, IconButton } from "@chakra-ui/react";
import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

export function DeleteIconButton({ onClick }) {
  const { t } = useTranslation();
  return (
    <IconButton
      variant="solid"
      colorScheme="red"
      icon={<DeleteIcon />}
      onClick={onClick}
    ></IconButton>
  );
}

export function SubmitButton({ isDisabled, isSubmitting }) {
  const { t } = useTranslation();
  return (
    <Button isLoading={isSubmitting} isDisabled={isDisabled} type="submit">
      {t("common:buttons.submit.title")}
    </Button>
  );
}

export function DeleteButton({ onClick }) {
  const { t } = useTranslation();
  return (
    <Button
      variant="solid"
      colorScheme="red"
      rightIcon={<DeleteIcon />}
      onClick={onClick}
    >
      {t("common:buttons.remove.title")}
    </Button>
  );
}

export function CloseIconButton({ onClick }) {
  const { t } = useTranslation();
  return (
    <IconButton
      variant="solid"
      icon={<CloseIcon />}
      onClick={onClick}
    ></IconButton>
  );
}

export function CloseButton({ onClick }) {
  const { t } = useTranslation();
  return (
    <Button variant="solid" rightIcon={<CloseIcon />} onClick={onClick}>
      {t("common:buttons.cancel.title")}
    </Button>
  );
}

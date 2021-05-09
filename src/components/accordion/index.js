import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

export default function ({ labels, children }) {
  return (
    <Accordion allowToggle>
      {children.map((child, index_child) => (
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {labels[index_child]}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={1}>{child}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
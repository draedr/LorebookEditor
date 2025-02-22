import { useContext, useState } from "react";
import { HooksContext } from "../hooks";
import { Accordion, AccordionControl, Container, ScrollArea } from "@mantine/core";
import { CodeHighlight } from '@mantine/code-highlight';

export default function JsonPreview() {
    const { jsonData } = useContext(HooksContext);

    return (
        <Accordion variant="contained" chevronPosition="left" mx="auto">
          <Accordion.Item value="item-1" px={0} py={0}>
            <AccordionControl>JSON</AccordionControl>
            <Accordion.Panel>
              <ScrollArea h={300}>
                {jsonData != null ? (
                  <CodeHighlight
                    code={JSON.stringify(jsonData, null, 2)}
                    language="json"
                    withCopyButton={false}
                  />
                ) : (
                  <span>No data available</span>
                )}
              </ScrollArea>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
    );
}
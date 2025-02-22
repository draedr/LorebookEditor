import { Card, Container, MantineProvider, Tabs, Title } from '@mantine/core';
import '@mantine/code-highlight/styles.css';

import { useHooks, HooksContext } from './hooks.ts';

import Homepage from './pages/Homepage.tsx';
import ExportPage from './pages/ExportPage.tsx';
import EntryForm from './pages/EntryForm.tsx';
import OriginalForm from './pages/OriginalForm.tsx';
import AboutPage from './pages/AboutPage.tsx';
import JsonPreview from './components/JsonPreview.tsx';

import '@mantine/core/styles.css';

function App() {
  const hooks = useHooks();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <MantineProvider>
        <HooksContext.Provider value={hooks}>
          <div className="max-w-6xl mx-auto">
            <Container mb={24}>
              <Title>SillyTavern Lorebook Editor</Title>
            </Container>
            <Card mb={24} withBorder shadow="sm" radius="md">
              <Tabs
                defaultValue={"loadjson"}
                value={hooks.tabIndex}
                onChange={hooks.setTabIndex}
              >
                <Card.Section>
                  <Tabs.List grow justify="center">
                    <Tabs.Tab py="md" value="loadjson">Load JSON</Tabs.Tab>
                    <Tabs.Tab py="md" value="editentries">Edit Entries</Tabs.Tab>
                    <Tabs.Tab py="md" value="edotpriginaldata">Edit Original Data</Tabs.Tab>
                    <Tabs.Tab py="md" value="export">Export</Tabs.Tab>
                    <Tabs.Tab py="md" value="about">About</Tabs.Tab>
                  </Tabs.List>
                </Card.Section>

                <Tabs.Panel value="loadjson">
                  <Homepage />
                </Tabs.Panel>
                <Tabs.Panel value="editentries">
                  <EntryForm />
                </Tabs.Panel>
                <Tabs.Panel value="edotpriginaldata">
                  <OriginalForm />
                </Tabs.Panel>
                <Tabs.Panel value="export">
                  <ExportPage />
                </Tabs.Panel>
                <Tabs.Panel value="about">
                  <AboutPage />
                </Tabs.Panel>
              </Tabs>
            </Card >
            <JsonPreview />
          </div>
        </HooksContext.Provider>
      </MantineProvider>
    </div>
  );
}

export default App;

import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { useHooks, HooksContext } from './hooks.ts';

import Homepage from './pages/Homepage.tsx';
import ExportPage from './pages/ExportPage.tsx';
import EntryForm from './pages/EntryForm.tsx';
import OriginalForm from './pages/OriginalForm.tsx';
import AboutPage from './pages/AboutPage.tsx';
import JsonPreview from './components/JsonPreview.tsx';

function App() {
  const hooks = useHooks();

  const [fieldsetState, setFieldsetState] = useState<boolean>(false);

  const toggleFieldset = () => {
    if (fieldsetState) {
      setFieldsetState(false);
    } else {
      setFieldsetState(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <HooksContext.Provider value={hooks}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-semibold mb-8">
            SillyTavern Lorebook Editor
          </h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Tabs
              selectedIndex={hooks.tabIndex}
              onSelect={(index) => hooks.setTabIndex(index)}
            >
              <TabList>
                <Tab>Load JSON</Tab>
                <Tab>Edit Entries</Tab>
                <Tab>Edit Original Data</Tab>
                <Tab>Export</Tab>
                <Tab>About</Tab>
              </TabList>

              <TabPanel>
                <Homepage />
              </TabPanel>
              <TabPanel>
                <EntryForm />
              </TabPanel>
              <TabPanel>
                <OriginalForm />
              </TabPanel>
              <TabPanel>
                <ExportPage />
              </TabPanel>
              <TabPanel>
                <AboutPage />
              </TabPanel>
            </Tabs>
          </div>
          <JsonPreview />
        </div>
      </HooksContext.Provider>
    </div>
  );
}

export default App;

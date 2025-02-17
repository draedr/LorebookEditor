import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { useHooks, HooksContext } from './hooks.ts';

import Homepage from './pages/Homepage.tsx';
import ExportPage from './pages/ExportPage.tsx';
import EntryForm from './pages/EntryForm.tsx';
import OriginalForm from './pages/OriginalForm.tsx';
import AboutPage from './pages/AboutPage.tsx';


function App() {
  const hooks = useHooks();

  console.log(hooks.jsonData);

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
          <fieldset
            className={`overflow-x-auto max-w-6xl my-4 border-solid border-grey rounded-lg p-4 pt-2 ${hooks.jsonData != null && fieldsetState
                ? 'border-2 rounded-lg'
                : 'border-t-2'
              }`}
          >
            <legend>
              <button
                //disabled={!(hooks.jsonData != null && fieldsetState)}
                onClick={() => toggleFieldset()}
                className={`mx-2 py-1 px-2 rounded-lg opacity-100 transition-opacity"
              title="Remove entry ${hooks.jsonData != null && fieldsetState
                    ? 'hover:bg-white group-hover:opacity-100'
                    : ''
                  }`}
              >
                JSON
              </button>
            </legend>
            {hooks.jsonData != null && fieldsetState ? (
              <div>
                <pre className="max-w-6xl">{JSON.stringify(hooks.jsonData, null, 2)}</pre>
              </div>
            ) : (
              fieldsetState && <span>No data available</span>
            )}
          </fieldset>
        </div>
      </HooksContext.Provider>
    </div>
  );
}

export default App;

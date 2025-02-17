import { useContext } from 'react';
import { Save, Trash2 } from 'lucide-react';
import { HooksContext, storageItems } from '../hooks';


export default function ExportPage() {
  const { jsonData, setJsonData, setSelectedEntry, setTabIndex, loadedLorebook, setLoadedLorebook, SyncFromStorage, handleFileUpload } = useContext(HooksContext);

  const handleExport = () => {
    if (!jsonData) return;
    const dataStr = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearLorebook = () => {
    if (confirm('Are you sure you want to clear all data?')) {
      setJsonData(null);
      setSelectedEntry(null);
      setTabIndex(0);
    }
  };

  const handleClearStorage = () => {
    localStorage.removeItem(storageItems.jsonData);
    localStorage.removeItem(storageItems.loadedLorebook);
  }

  const handleSyncToStorage = () => {
    const oldLoadedLorebook = loadedLorebook;
    const oldJsonData = jsonData;
    handleClearStorage();
    setLoadedLorebook(oldLoadedLorebook);
    setJsonData(oldJsonData);
  }

  return (
      <div className="p-4 space-y-4">
        
        <fieldset className="my-4 border-solid border-grey p-4 border-t-2">
          <legend className='flex flex-col flex-gap-0 mx-2 py-1 px-2'>
            <h2 className="text-xl font-semibold">Export Lorebook</h2>
          </legend>
          <div className="flex space-x-4">
            {/* Export Lorebook */}
            <div>
              <button
                onClick={handleExport}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="mr-2 h-4 w-4" />
                Export Lorebook
              </button>
            </div>
            {/* Clear Lorebook */}
            <div>
              <button
                onClick={handleClearLorebook}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Lorebook
              </button>
            </div>
            {/* Choose File */}
            <div>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="my-4 border-solid border-grey px-4 pb-4 pt-0 border-t-2">
          <legend className='flex flex-col flex-gap-0 mx-2 py-1 px-2'>
            <div>
              <h2 className="text-xl font-semibold">Local Storage Options</h2>
              {/* <b className="text-xs text-gray-400 font-semibold">(Debug Options, You shouldn't need these.)</b> */}
            </div>
          </legend>
          <div className="mx-2 mb-4 px-2">
            <b className="text-xs text-gray-400 font-semibold">(Debug Options, You shouldn't need these.)</b>
          </div>
          <div className="flex space-x-4">
            {/* Sync to Storage */}
            <div>
              <button
                onClick={handleSyncToStorage}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="mr-2 h-4 w-4" />
                Sync To Storage
              </button>
            </div>
            {/* Sync From Storage */}
            <div>
              <button
                onClick={SyncFromStorage}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <Save className="mr-2 h-4 w-4" />
                Sync From Storage
              </button>
            </div>
            {/* Clear Storage */}
            <div>
              <button
                onClick={handleClearStorage}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Storage
              </button>
            </div>
          </div>
        </fieldset>
      </div>
  );
}

import { useContext } from 'react';
import { HooksContext } from '../hooks';

export default function Homepage() {
  const { setJsonData, setTabIndex, loadedLorebook, setLoadedLorebook, handleFileUpload } = useContext(HooksContext);


  return (
    <div className="p-4">
      {loadedLorebook && (
        <div>
          <h3 className="text-2xl font-bold">Loaded Lorebook: {loadedLorebook}</h3>
          <hr className="my-4"/>
        </div>
      )}
      {/* <h2 className="text-lg font-semibold mb-4">Load JSON File</h2> */}
      <div className="max-w-md mx-auto border-4 border-dashed border-blue-300 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 flex justify-content text-center">
        <div className="mx-auto py-4">
          <label htmlFor="files" className="border-0 text-md font-semibold text-blue-500">Load JSON File</label>
          <input
            type="file"
            id="files"
            accept=".json"
            onChange={handleFileUpload}
            className="flex-grow block w-full text-sm text-gray-500 file:hidden file:text-center hidden text-center"
          />
        </div>
      </div>
    </div>
  );
}

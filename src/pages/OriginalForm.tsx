import { useContext } from 'react';
import { HooksContext } from '../hooks';

import { OriginalData } from '/src/hooks.ts';
import { isOriginalData } from '/src/types.ts';

export default function OriginalForm() {
  const { jsonData, setJsonData } = useContext(HooksContext);

  const updateEntry = (field: keyof OriginalData, value: any) => {
    if (!jsonData) return;
    setJsonData({
      ...jsonData,
      originalData: {
        ...jsonData.originalData,
        [field]: value,
      },
    });
  };

  const oData = () => {
    return jsonData.originalData;
  };

  const ExtendedOriginalData = () => {
    var o = oData();
    if (o == null) return false;
    if (o == undefined) return false;
    if (!isOriginalData(jsonData.originalData)) return false;

    try {
      let a = oData().scan_depth;
      return true;
    } catch (e: unknown) {
      return false;
    }
  };

  return (
    <div>
      {ExtendedOriginalData() ? (
        <div>
          <div className="grid grid-cols-6 gap-4 p-4">
            {/* Name */}
            <div className="col-span-2">
              <div className="space-y-4">
                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={oData().name}
                    onChange={(e) => updateEntry('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  />
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="col-span-4">
              {jsonData.originalData != null ? (
                <div className="space-y-4">
                  {/* Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <input
                      type="text"
                      value={oData().description}
                      onChange={(e) =>
                        updateEntry('description', e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No Original Data present
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 p-4">
            {/* Scan Depth */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Scan Depth
              </label>
              <input
                type="number"
                value={oData().scan_depth}
                onChange={(e) => updateEntry('scan_depth', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2"
              />
            </div>
            {/* Token Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Token Budget
              </label>
              <input
                type="number"
                value={oData().token_budget}
                onChange={(e) => updateEntry('token_budget', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2"
              />
            </div>
            {/* Recursive Scanning */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={oData().recursive_scanning}
                  onChange={(e) =>
                    updateEntry('recursive_scanning', e.target.value)
                  }
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50  px-2"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Recursive Scanning
                </span>
              </label>
            </div>
            {/* Extensions */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Extensions
              </label>
              <input
                type="number"
                disabled={false}
                value={Object.keys(oData().extensions).length}
                onChange={(e) =>
                  console.log(
                    'Editing of the extensions field is not supported at the time.'
                  )
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2"
              />
            </div>
            {/* Entries */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Entries
              </label>
              <input
                type="number"
                value={oData().entries.length}
                disabled={false}
                onChange={(e) =>
                  console.log(
                    'Editing of the original entries field is not supported at the time.'
                  )
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          No Original Data present
        </div>
      )}
    </div>
  );
}

import { useContext } from 'react';
import { HooksContext } from '../hooks';
import { Plus, X } from 'lucide-react';

import { Entry } from '/src/hooks.ts';
import { UseGlobalOptions } from '/src/types.ts';

export default function EntryForm() {
  const { jsonData, selectedEntry, setSelectedEntry, setJsonData } =
    useContext(HooksContext);

  const updateEntry = (entryId: string, field: keyof Entry, value: any) => {
    if (!jsonData) return;
    setJsonData({
      ...jsonData,
      entries: {
        ...jsonData.entries,
        [entryId]: {
          ...jsonData.entries[entryId],
          [field]: value,
        },
      },
    });
  };

  const addNewEntry = () => {
    if (!jsonData) return;
    var newId = String(
      Math.max(...Object.keys(jsonData.entries).map(Number)) + 1
    );

    if (newId == '-Infinity') {
      newId = '0';
    }

    const newEntry: Entry = {
      uid: parseInt(newId),
      key: [],
      keysecondary: [],
      comment: `New Entry ${newId}`,
      content: '',
      constant: false,
      vectorized: false,
      selective: false,
      selectiveLogic: 0,
      addMemo: false,
      order: 100,
      position: 0,
      disable: false,
      excludeRecursion: false,
      preventRecursion: false,
      delayUntilRecursion: false,
      probability: 100,
      useProbability: true,
      depth: 4,
      group: '',
      groupOverride: false,
      groupWeight: 100,
      displayIndex: parseInt(newId),
      characterFilter: {
        isExclude: false,
        names: [],
        tags: [],
      },
    };

    setJsonData({
      ...jsonData,
      entries: {
        ...jsonData.entries,
        [newId]: newEntry,
      },
    });
    setSelectedEntry(newId);
  };

  const removeEntry = (entryId: string) => {
    if (!jsonData || !confirm('Are you sure you want to remove this entry?'))
      return;
    const newEntries = { ...jsonData.entries };
    delete newEntries[entryId];
    setJsonData({
      ...jsonData,
      entries: newEntries,
    });
    setSelectedEntry(null);
  };

  const currentEntry = () => {
    return jsonData.entries[selectedEntry];
  };

  const filters = () => {
    var t = currentEntry().characterFilter?.tags ?? [];
    var n = currentEntry().characterFilter?.names ?? [];
    return [...t, ...n].join(', ');
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {/* Sidebar */}
      <div className="col-span-1 border-r pr-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Entries</h3>
          <button
            onClick={addNewEntry}
            className="p-1 rounded-full hover:bg-gray-100"
            title="Add new entry"
          >
            <Plus className="h-5 w-5 text-blue-600" />
          </button>
        </div>
        <div className="space-y-2">
          {jsonData &&
            Object.entries(jsonData.entries).map(([id, entry]) => (
              <div key={id} className="flex items-center group">
                <button
                  onClick={() => setSelectedEntry(id)}
                  className={`flex-grow text-left p-2 rounded ${
                    selectedEntry === id ? 'bg-blue-100' : 'hover:bg-gray-100'
                  }`}
                >
                  {entry.comment || `Entry ${id}`}
                </button>
                <button
                  onClick={() => removeEntry(id)}
                  className="p-1 rounded-full hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove entry"
                >
                  <X className="h-4 w-4 text-red-600" />
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Content */}
      <div className="col-span-3">
        {selectedEntry != null && jsonData ? (
          <div className="space-y-4">
            {/* Top Row */}
            <div className="flex grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold">Edit Entry</h3>
              </div>
              {/* Disabled */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={currentEntry().disable}
                  onChange={(e) =>
                    updateEntry(selectedEntry, 'disable', e.target.checked)
                  }
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-2"
                />
                <span className="ml-2 text-sm text-gray-600">Disabled</span>
              </label>
              <div className="flex-grow">
                <input
                  type="text"
                  value={currentEntry().comment}
                  onChange={(e) =>
                    updateEntry(selectedEntry, 'comment', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 flex-grow"
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">
                  Keys
                </label>
                <input
                  type="text"
                  value={currentEntry().key.join(', ')}
                  onChange={(e) =>
                    updateEntry(
                      selectedEntry,
                      'key',
                      e.target.value.split(',').map((k) => k.trim())
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Order
                </label>
                <input
                  type="number"
                  value={currentEntry().order}
                  onChange={(e) =>
                    updateEntry(
                      selectedEntry,
                      'order',
                      parseInt(e.target.value)
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2"
                />
              </div>

              {/* Logic */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Logic
                </label>
                <select
                  value={currentEntry().selectiveLogic}
                  onChange={(e) =>
                    updateEntry(
                      selectedEntry,
                      'selectiveLogic',
                      parseInt(e.target.value)
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2"
                >
                  {Object.entries(UseGlobalOptions).map(([i, obj]) => (
                    <option value={obj.value}>{obj.label}</option>
                  ))}
                </select>
              </div>

              {/* Probability */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Probability
                </label>
                <input
                  type="number"
                  value={currentEntry().probability}
                  onChange={(e) =>
                    updateEntry(
                      selectedEntry,
                      'probability',
                      parseInt(e.target.value)
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-8 gap-4">
              {/* Optional Filter */}
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">
                  Optional Filter
                </label>
                <input
                  type="text"
                  value={currentEntry().keysecondary.join(', ')}
                  onChange={(e) =>
                    updateEntry(
                      selectedEntry,
                      'keysecondary',
                      e.target.value.split(',').map((k) => k.trim())
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {/* Scan Depth */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Scan Depth
                </label>
                <input
                  type="number"
                  value={currentEntry().depth}
                  onChange={(e) =>
                    updateEntry(
                      selectedEntry,
                      'depth',
                      parseInt(e.target.value)
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                value={currentEntry().content}
                onChange={(e) =>
                  updateEntry(selectedEntry, 'content', e.target.value)
                }
                rows={10}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              />
            </div>

            <div className="grid grid-cols-12 gap-4">
              {/* Inclusion Group */}
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">
                  Inclusion Group
                </label>
                <input
                  type="text"
                  value={currentEntry().group}
                  onChange={(e) =>
                    updateEntry(
                      selectedEntry,
                      'group',
                      e.target.value.split(',').map((k) => k.trim())
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {/* Scan Depth */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Group Weight
                </label>
                <input
                  type="number"
                  value={currentEntry().groupWeight}
                  onChange={(e) =>
                    updateEntry(
                      selectedEntry,
                      'groupWeight',
                      parseInt(e.target.value)
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2"
                />
              </div>
              {/* Sticky  */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Sticky
                </label>
                <input
                  type="number"
                  value={currentEntry().sticky}
                  onChange={(e) =>
                    updateEntry(
                      selectedEntry,
                      'sticky',
                      parseInt(e.target.value)
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2"
                />
              </div>
              {/* Cooldown  */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Cooldown
                </label>
                <input
                  type="number"
                  value={currentEntry().cooldown}
                  onChange={(e) =>
                    updateEntry(
                      selectedEntry,
                      'cooldown',
                      parseInt(e.target.value)
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2"
                />
              </div>
              {/* Delay  */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Delay
                </label>
                <input
                  type="number"
                  value={currentEntry().delay}
                  onChange={(e) =>
                    updateEntry(
                      selectedEntry,
                      'delay',
                      parseInt(e.target.value)
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2"
                />
              </div>
            </div>

            {/* Fourth Row */}
            <div className="grid grid-cols-6 space-x-4">
              {/* Filter to Character */}
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">
                  Filter to Character or Tags
                </label>
                <input
                  type="text"
                  value={filters()}
                  disabled="true"
                  onChange={(e) =>
                    // updateEntry(selectedEntry,'characterFilter.names',e.target.value.split(',').map((k) => k.trim()))
                    console.log(
                      'Editing of the characterFilter field is not supported at the time.'
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {/* Constant */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={currentEntry().constant}
                  onChange={(e) =>
                    updateEntry(selectedEntry, 'constant', e.target.checked)
                  }
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50  px-2"
                />
                <span className="ml-2 text-sm text-gray-600">Constant</span>
              </label>
              {/* Selective */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={currentEntry().selective}
                  onChange={(e) =>
                    updateEntry(selectedEntry, 'selective', e.target.checked)
                  }
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-2"
                />
                <span className="ml-2 text-sm text-gray-600">Selective</span>
              </label>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select an entry to edit
          </div>
        )}
      </div>
    </div>
  );
}

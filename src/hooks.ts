import { createContext, useState } from 'react';

import { Entry, JsonData } from './types.ts';

export type { Entry, JsonData };

export const storageItems = {
  jsonData: "jsonData",
  loadedLorebook: "loadedLorebook",
  originalLorebook: "originalLorebook"
}

export function useHooks() {
  var emptyData: JsonData;
  emptyData = {
    entries: [],
    originalData: {
      name: '',
      description: '',
      scan_depth: 0,
      token_budget: 0,
      recursive_scanning: false,
      extensions: {},
      entries: [],
    },
  };
  
  const getJsonDataState = () => {
    const selectedOption: JsonData = <JsonData>JSON.parse(localStorage.getItem(storageItems.jsonData) || "null") || emptyData;
    return selectedOption;
  };
  const getOriginalDataState = () => {
    const selectedOption: JsonData = <JsonData>JSON.parse(localStorage.getItem(storageItems.originalLorebook) || "null") || null;
    return selectedOption;
  };
  const getLoadedLorebookState = () => {
    const selectedOption: string | null = localStorage.getItem(storageItems.loadedLorebook) || null
    return selectedOption;
  };

  const [jsonData, setJsonDataSimple] = useState<JsonData | null>(getJsonDataState());
  const [loadedLorebook, setLoadedLorebookSimple] = useState<string | null>(getLoadedLorebookState());
  const [originalData, setOriginalDataSimple] = useState<JsonData | null>(getOriginalDataState());
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [tabIndex, setTabIndex] = useState(0);

  const setJsonData = ( d: JsonData ) => {
      localStorage.setItem( storageItems.jsonData, JSON.stringify(d) );
      setJsonDataSimple({...d});
  }

  const setLoadedLorebook = ( f: string ) => {
      localStorage.setItem( storageItems.loadedLorebook, f );
      setLoadedLorebookSimple(f);
  }

  const setOriginalData = (d: JsonData) => {
    localStorage.setItem( storageItems.originalLorebook, JSON.stringify(d) );
    setOriginalDataSimple({...d});
  }

  const SyncFromStorage = () => {
    const jsonDataInStorage = getJsonDataState();
    const lodadedLorebookInStorage = getLoadedLorebookState();
    setJsonDataSimple(jsonDataInStorage);
    setLoadedLorebookSimple(lodadedLorebookInStorage);
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = <JsonData>JSON.parse(e.target?.result as string);
          setJsonData(data);
          setTabIndex(1); // Switch to Edit Entries tab
          setLoadedLorebook(file.name);
          setOriginalData(data);
        } catch (error) {
          alert('Error parsing JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  
  return {
    jsonData,
    setJsonData,
    selectedEntry,
    setSelectedEntry,
    tabIndex,
    setTabIndex,
    loadedLorebook,
    setLoadedLorebook,
    SyncFromStorage,
    handleFileUpload,
    originalData,
    setOriginalData
  };
}

export const HooksContext = createContext(null);

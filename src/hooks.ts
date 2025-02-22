import { createContext, useState } from 'react';

import { Entry, JsonData } from './types.ts';

export type { Entry, JsonData };

export const storageItems = {
  jsonData: "jsonData",
  loadedLorebook: "loadedLorebook",
  originalLorebook: "originalLorebook",
  tabIndex: "tabIndex",
  tags: "tags"
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
  const getTabIndexState = () => {
    const selectedOption: string = localStorage.getItem(storageItems.tabIndex) || '0';
    return selectedOption;
  };
  // const getTagsState = () => {
  //   var selectedOption: string[] = JSON.parse(localStorage.getItem(storageItems.tags) || 'null') || [];
  //   if(!Array.isArray(selectedOption) || typeof selectedOption === 'string') selectedOption = [selectedOption];
  //   return selectedOption;
  // };

  const loadTagsFromJsonData = () => {
    if(jsonData?.entries === null || jsonData?.entries === undefined) return [];

    var t: string[] = Object.keys( jsonData.entries|| {}).map((e: number) => {
      var entry = jsonData.entries[e];
      return (entry?.key || []);
    }).flat().filter((value, index, array) => {
      return array.indexOf(value) === index;
    });
    return t;
  }

  const [jsonData, setJsonDataSimple] = useState<JsonData | null>(getJsonDataState());
  const [loadedLorebook, setLoadedLorebookSimple] = useState<string | null>(getLoadedLorebookState());
  const [originalData, setOriginalDataSimple] = useState<JsonData | null>(getOriginalDataState());
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [tabIndex, setTabIndexSimple] = useState(getTabIndexState() || null);
  const [tags, setTags] = useState<string[]>(loadTagsFromJsonData());

  const reset = () => {
    resetStorage();
    setJsonData(getJsonDataState());
    setLoadedLorebook(getLoadedLorebookState());
    setSelectedEntry(null);
    setTabIndex(getTabIndexState());
    setTags(loadTagsFromJsonData());
    setTabIndex('loadjson')
  }
  const resetStorage = () => {
    setOriginalDataSimple(null);
    localStorage.removeItem(storageItems.jsonData);
    localStorage.removeItem(storageItems.loadedLorebook);
    localStorage.removeItem(storageItems.originalLorebook); 
    localStorage.removeItem(storageItems.tabIndex); 
    localStorage.removeItem(storageItems.tags); 
  }

  const setJsonData = ( d: JsonData ) => {
      localStorage.setItem( storageItems.jsonData, JSON.stringify(d) );
      setJsonDataSimple({...d});
  }

  const setTabIndex = ( i: string | null ) => {
    localStorage.setItem( storageItems.tabIndex, i || 'null');
    setTabIndexSimple(i);
  }

  const setLoadedLorebook = ( f: string | null) => {
      localStorage.setItem( storageItems.loadedLorebook, typeof f !== 'string' ? JSON.stringify(f) : f );
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
    setSelectedEntry(null);
  }

  const handleFileUpload = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = <JsonData>JSON.parse(e.target?.result as string);
          setJsonData(data);
          setTabIndex('editentries'); // Switch to Edit Entries tab
          setLoadedLorebook(file.name);
          setOriginalData(data);
          setTags(loadTagsFromJsonData());
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
    setOriginalData,
    tags,
    setTags,
    loadTagsFromJsonData,
    reset,
    resetStorage
  };
}

export const HooksContext = createContext(null);

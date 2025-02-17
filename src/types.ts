export interface CharacterFilter {
  isExclude: boolean;
  names: string[];
  tags: string[];
}

export interface Entry {
  uid: number;
  key: string[];
  keysecondary: string[];
  characterFilter: CharacterFilter;
  comment: string;
  content: string;
  constant: boolean;
  vectorized: boolean;
  selective: boolean;
  selectiveLogic: number;
  addMemo: boolean;
  order: number;
  position: number;
  disable: boolean;
  excludeRecursion: boolean;
  preventRecursion: boolean;
  delayUntilRecursion: boolean;
  probability: number;
  useProbability: boolean;
  depth: number;
  group: string;
  groupOverride: boolean;
  groupWeight: number;
  displayIndex: number;
  sticky: number;
  cooldown: number;
  delay: number;
  scanDepth: number;
  caseSensitive: boolean;
  matchWholeWords: boolean;
  useGroupScoring: boolean;
  automationId: string;
  role: any;
}

export interface OriginalData {
  name: string;
  description: string;
  scan_depth: number;
  token_budget: number;
  recursive_scanning: false;
  extensions: {};
  entries: Entry[];
}

export function isEntry(data: Entry | object | null): data is Entry {
  return (<Entry>data).comment !== undefined;
}
export function isOriginalData(data: OriginalData | object | null): data is OriginalData {
  return (<OriginalData>data).name !== undefined;
}

export interface JsonData {
  entries: { [key: string]: Entry };
  originalData: OriginalData;
}

export interface Option {
  value: string | number;
  label: string;
}

export const UseGlobalOptions = [
  { value: 0, label: 'AND ANY' },
  { value: 1, label: 'AND ALL' },
  { value: 2, label: 'NOT ANY' },
  { value: 3, label: 'NOT ALL' },
];

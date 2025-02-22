import { useContext, useState } from 'react';
import { HooksContext } from '../hooks';
import { PlusIcon, X } from 'lucide-react';

import { Entry } from '/src/hooks.ts';
import { UseGlobalOptionsArray, mapUseGlobalOptions } from '/src/types.ts';
import { Button, Checkbox, Container, Flex, Grid, Input, NumberInput, Select, Switch, Textarea, TextInput, Title } from '@mantine/core';


export default function EntryForm() {
  const { jsonData, selectedEntry, setSelectedEntry, setJsonData } =
    useContext(HooksContext);

  const [filter, setFilter] = useState<string | null>('');

  const filterEntries = () => {
    if(jsonData.entries === null || jsonData.entries === undefined) return [];
    var final;

    if(filter !== null || filter !== ' ' || filter !== '' || typeof filter !== 'string')
      final = Object.entries(jsonData.entries);

    final =  Object.entries(jsonData.entries).filter(([id, entry]) => {
      if((entry as Entry).comment.toLowerCase().includes(filter.toLowerCase())) {
        return true;
      }

      if((entry as Entry).content.toLowerCase().includes(filter.toLowerCase())) {
        return true;
      }

      if((entry as Entry).key.join(', ').toLowerCase().includes(filter.toLowerCase())) {
        return true;
      }

      if((entry as Entry).keysecondary.join(', ').toLowerCase().includes(filter.toLowerCase())) {
        return true;
      }

      if ((entry as Entry).key.filter((k) => {if(k.toLowerCase().includes(filter.toLowerCase())) { return true; }}).length > 0) {
        return true;
      }

      return false;
    });

    return final;
  }
  
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
    if(jsonData.entries === null || jsonData.entries === undefined) {
      jsonData.entries = {};
    };
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

  console.log();

  return (
    <Grid columns={24}>
      {/* Sidebar */}
      <Grid.Col span={6} className="border-r">
        <Container px={12} py={24}>
          <div className="flex justify-between items-center mb-3">
            <Title order={4}>Entries</Title>
            <Button title="Add new entry" onClick={addNewEntry} className="rounded-full" px="10"><PlusIcon  size={14} /></Button>
          </div>
        
          {/* Search */}
          <div className="mb-4">
            <TextInput
              value={filter || ''}
              onChange={(e) =>setFilter(e.target.value)}
              rightSection={filter !== '' ? <Input.ClearButton onClick={() => setFilter('')} /> : undefined}
              rightSectionPointerEvents="auto"
              placeholder='Search...'
              mb="8"
            />
            {/* <Switch
              type="checkbox"
              checked={filterContent ||  false}
              title="Search inside content and keys of Entry."
              onChange={(e) =>setFilterContent(e.target.checked)}
              label="Search in Content"
              mx="4"
            /> */}
          </div>

          {/* Entry List */}
          <div className="space-y-2">
            {jsonData && filter !== undefined && jsonData.entries !== undefined &&
              filterEntries().map(([id, entry]) => (
                <div key={id} className="flex items-center group">
                  <Button 
                  fullWidth 
                  onClick={() => setSelectedEntry(id)} variant={selectedEntry === id ? 'light' : 'white'} 
                  >{entry.comment || `Entry ${id}`}</Button>
                  {selectedEntry === id && (
                    <Button ml="4" onClick={() => removeEntry(id)} variant="light" color="red"><X className="h-4 w-4"/></Button>
                  )}
                </div>
              ))}
          </div>
        </Container>
      </Grid.Col>

      {/* Content */}
      <Grid.Col span={"auto"}>
        {selectedEntry != null && 
        jsonData && 
        jsonData.entries !== undefined && 
        jsonData.entries !== null ? (
          <Container  px={12} py={24}>
            {/* Top Row */}
            <Grid columns={6}>
              <Grid.Col span={1}>
                <Title order={4}>Edit Entry</Title>
              </Grid.Col>
              {/* Comment */}
              <Grid.Col span={4}>
                <TextInput
                  type="text"
                  value={currentEntry().comment}
                  onChange={(e) =>
                    updateEntry(selectedEntry, 'comment', e)
                  }
                  placeholder='Comment'
                  className="flex-grow"
                />
              </Grid.Col>
              {/* Disabled */}
              <Grid.Col span={1}>
              <Switch
                  type="checkbox"
                  checked={!currentEntry().disable}
                  onChange={(e) =>
                    updateEntry(selectedEntry, 'disable', !e.currentTarget.checked)
                  }
                  mx="4"
                /> 
              </Grid.Col>
            </Grid>

            {/* Keys Row */}
            <Grid columns={2}>
              {/* Keys */}
              <Grid.Col span={2}>
                <TextInput
                  type="text"
                  label="Keys"
                  value={currentEntry().key.join(', ')}
                  onChange={(e) =>
                    updateEntry(
                      selectedEntry,
                      'key',
                      e.target.value.split(',').map((k) => k.trim())
                    )
                  }
                  placeholder='Key, Key...'
                />
              </Grid.Col>
            </Grid>

            {/* Third Row */}
            <Grid columns={4}>
              {/* Order */}
              <Grid.Col span={1}>
              <NumberInput
                  value={currentEntry().order}
                  onChange={(e) =>
                    updateEntry(
                      selectedEntry,
                      'order',
                      typeof e === 'number' ? e : parseInt(e) || 0
                    )
                  }
                  max={100}
                  min={0}
                  placeholder='100'
                  label="Order"
                />
              </Grid.Col>

              {/* Logic */}
              <Grid.Col span={1}>
                <Select
                  value={UseGlobalOptionsArray[currentEntry().selectiveLogic]}
                  onChange={(e) =>
                    updateEntry(
                      selectedEntry,
                      'selectiveLogic',
                      mapUseGlobalOptions(e)
                    )
                  }
                  searchable
                  label="Logic"
                  placeholder="Pick value"
                  data={[...UseGlobalOptionsArray]}
                />
              </Grid.Col>

              {/* Probability */}
              <Grid.Col span={1}>
              <NumberInput
                  value={currentEntry().probability}
                  onChange={(e) =>
                    updateEntry(
                      selectedEntry,
                      'probability',
                      typeof e === 'number' ? e : parseInt(e) || 0
                    )
                  }
                  max={100}
                  min={0}
                  placeholder='100'
                  label="Probability"
                />
              </Grid.Col>
              {/* Scan Depth */}
              <Grid.Col span={1}>
                <NumberInput
                    value={currentEntry().depth}
                    onChange={(e) =>
                      updateEntry(
                        selectedEntry,
                        'depth',
                        typeof e === 'number' ? e : parseInt(e) || 0
                      )
                    }
                    max={100}
                    min={0}
                    placeholder='100'
                    label="Scan Depth"
                  />
              </Grid.Col>
            </Grid>

            {/* Content */}
            <div>
              <Textarea 
                variant="filled"
                label="Content"
                value={currentEntry().content}
                onChange={(e) =>
                  updateEntry(selectedEntry, 'content', e.currentTarget.value)
                }
                autosize
                minRows={4}
                maxRows={8}
              />
            </div>

            {/* Fifth Row */}
            <Grid columns={4}>
              {/* Group Weight  */}
              <Grid.Col span={1}>
                <NumberInput
                    value={currentEntry().groupWeight}
                    onChange={(e) =>
                      updateEntry(
                        selectedEntry,
                        'groupWeight',
                        typeof e === 'number' ? e : parseInt(e) || 0
                      )
                    }
                    max={100}
                    min={0}
                    placeholder='100'
                    label="Group Weight"
                  />
              </Grid.Col>
              {/* Sticky  */}
              <Grid.Col span={1}>
                  <NumberInput
                      value={currentEntry().sticky}
                      onChange={(e) =>
                        updateEntry(
                          selectedEntry,
                          'sticky',
                          typeof e === 'number' ? e : parseInt(e) || 0
                        )
                      }
                      max={100}
                      min={0}
                      placeholder='100'
                      label="Sticky"
                    />
              </Grid.Col>
              {/* Cooldown  */}
              <Grid.Col span={1}>
                  <NumberInput
                      value={currentEntry().cooldown}
                      onChange={(e) =>
                        updateEntry(
                          selectedEntry,
                          'cooldown',
                          typeof e === 'number' ? e : parseInt(e) || 0
                        )
                      }
                      max={100}
                      min={0}
                      placeholder='100'
                      label="Cooldown"
                    />
              </Grid.Col>
              {/* Delay  */}
              <Grid.Col span={1}>
                  <NumberInput
                      value={currentEntry().delay}
                      onChange={(e) =>
                        updateEntry(
                          selectedEntry,
                          'delay',
                          typeof e === 'number' ? e : parseInt(e) || 0
                        )
                      }
                      max={100}
                      min={0}
                      placeholder='100'
                      label="Delay"
                    />
              </Grid.Col>
            </Grid>

            {/* Optional Filter */}
            <div>
              {/* Optional Filter */}
                <TextInput
                  type="text"
                  label="Optional Filter"
                  value={currentEntry().keysecondary.join(', ')}
                  onChange={(e) =>
                    updateEntry(
                      selectedEntry,
                      'keysecondary',
                      e.target.value.split(',').map((k) => k.trim())
                    )
                  }
                  placeholder='Key, Key...'
                />
            </div>
            {/* Inclusion Filter */}
            <div>
              {/* Inclusion Group */}
                <TextInput
                  type="text"
                  label="Inclusion Group"
                  disabled={true}
                  value={currentEntry().group}
                  onChange={(e) =>
                    updateEntry(
                      selectedEntry,
                      'group',
                      e.target.value
                    )
                  }
                  placeholder='Key, Key...'
                />
            </div>

            {/* Sixth Row */}
            <Grid columns={6}>
              {/* Filter to Character */}
              <Grid.Col span={6}>
                <TextInput
                  type="text"
                  label="Filter to Character or Tags"
                  disabled={true}
                  value={filters()}
                  onChange={() =>alert('Editing of the characterFilter field is not supported at the time.')}
                  placeholder='Key, Key...'
                />
              </Grid.Col>
              {/* Constant */}
              <Grid.Col span={1}>
              <Checkbox
                  label="Constant"
                  checked={currentEntry().constant}
                  onChange={(e) =>
                    updateEntry(selectedEntry, 'constant', e.target.checked)
                  }
                />
              </Grid.Col>
              {/* Selective */}
              <Grid.Col span={1}>
              <Checkbox
                  label="Selective"
                  checked={currentEntry().selective}
                  onChange={(e) =>
                    updateEntry(selectedEntry, 'selective', e.target.checked)
                  }
                />
              </Grid.Col>
            </Grid>
          </Container>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select an entry to edit
          </div>
        )}
      </Grid.Col>
    </Grid>
  );
}

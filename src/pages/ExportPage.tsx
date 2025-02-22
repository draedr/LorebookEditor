import { useContext, useState } from 'react';
import { Download, Eraser, RefreshCcw, Save, Trash2 } from 'lucide-react';
import { HooksContext, storageItems } from '../hooks';

import { JsonData } from '../types';
import { Button, Card, Container, Fieldset, Flex, Grid, Title } from '@mantine/core';

export default function ExportPage() {
  const { jsonData, setJsonData, setSelectedEntry, setTabIndex, loadedLorebook, setLoadedLorebook, SyncFromStorage, handleFileUpload, originalData, setOriginalData, loadTagsFromJsonData, reset, resetStorage } = useContext(HooksContext);


  const handleExportOriginal = () => {
    handleExportGeneric(originalData, 'original_');
  }
  
  const handleExportModified = () => {
    handleExportGeneric(jsonData);
  }

  const handleExportGeneric = (data: any, prefix: string | null = null) => {
    if (!data) return;

    var filename = loadedLorebook || 'world.json';
    if(prefix !== null && prefix !== '' && prefix !== undefined && filename !== ' ') {
      filename = prefix + filename;
    }
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const handleClearLorebook = () => {
    if (confirm('Are you sure you want to clear all data?')) {
      setJsonData(null);
      setSelectedEntry(null);
      setTabIndex(0);
    }
  };

  const handleSyncToStorage = () => {
    const oldLoadedLorebook = loadedLorebook;
    const oldJsonData = jsonData;
    resetStorage();
    setLoadedLorebook(oldLoadedLorebook);
    setJsonData(oldJsonData);
  }


  return (
      <Container px={12} py={24}>
        
        <Card radius="md" mb="24" withBorder>
          <Card.Section withBorder px={16} py={8}>
            <Title order={4}>Export Lorebook</Title>
          </Card.Section>
          <Flex px={12} py={12}
              gap="md"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="nowrap">
            {/* Export Lorebook */}
              <Button
                onClick={handleExportModified}
                variant="filled"
              >
                <Save className="mr-2 h-4 w-4" />
                Export Lorebook
              </Button>
            {/* Clear Lorebook */}
              <Button
                onClick={handleClearLorebook}
                variant="filled"
                color="red"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Lorebook
              </Button>
            {/* Export Original Lorebook */}
            { originalData !== null && originalData !== undefined && (
                <Button
                  onClick={handleExportOriginal}
                  variant="filled"
                  color="green"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Original Lorebook
                </Button>
            )}
          </Flex>
        </Card >

        <Card radius="md" withBorder>
          <Card.Section withBorder px={16} py={8}>
            <Title order={4}>Advanced Options</Title>
          </Card.Section>
          
          <Flex px={12} pt={12}
              gap="md"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="nowrap">
            {/* Sync to Storage */}
              <Button
                onClick={handleSyncToStorage}
                variant="filled"
              >
                <Save className="mr-2 h-4 w-4" />
                Sync To Storage
              </Button>
            {/* Sync From Storage */}
              <Button
                onClick={SyncFromStorage}
                variant="filled"
                color="orange"
              >
                <Save className="mr-2 h-4 w-4" />
                Sync From Storage
              </Button>
            {/* Clear Storage */}
              <Button
                onClick={resetStorage}
                variant="filled"
                color="red"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Storage
              </Button>
            {/* Reset App */}
              <Button
                onClick={reset}
                variant="filled"
                color="red"
              >
                <Eraser className="mr-2 h-4 w-4" />
                Reset App
              </Button>
            {/* Reload Tags */}
              <Button
                variant="filled"
                color="green"
                onClick={loadTagsFromJsonData}
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Reload Tags
              </Button>
          </Flex>
        </Card>
      </Container>
      
  );
}

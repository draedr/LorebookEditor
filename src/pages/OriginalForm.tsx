import { useContext } from 'react';
import { HooksContext } from '../hooks';

import { OriginalData } from '/src/hooks.ts';
import { isOriginalData } from '/src/types.ts';
import { Checkbox, Container, Grid, NumberInput, TextInput } from '@mantine/core';

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
        <Container px={12} py={24}>
          <Grid columns={2}>
            {/* Name */}
            <Grid.Col span={1}>
              <div className="space-y-4">
                {/* Content */}
                <div>
                  <TextInput
                    label="Name"
                    value={oData().name}
                    onChange={(e) => updateEntry('name', e.currentTarget.value)}
                  />
                </div>
              </div>
            </Grid.Col>
            {/* Description */}
            <Grid.Col span={1}>
              {jsonData.originalData != null ? (
                <div className="space-y-4">
                  {/* Content */}
                  <div>
                    <TextInput
                      label="Description"
                      value={oData().description}
                      onChange={(e) => updateEntry('description', e.currentTarget.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No Original Data present
                </div>
              )}
            </Grid.Col>
          </Grid>
          <Grid columns={5}>
            {/* Scan Depth */}
            <Grid.Col span={1}>
              <NumberInput 
                label="Scan Depth"
                value={oData().scan_depth}
                onChange={(e) => updateEntry('scan_depth', e)}
              />
            </Grid.Col>
            {/* Token Budget */}
            <Grid.Col span={1}>
              <NumberInput 
                label="Token Budget"
                value={oData().token_budget}
                onChange={(e) => updateEntry('token_budget', e)}
              />
            </Grid.Col>
            {/* Extensions */}
            <Grid.Col span={1}>
              <NumberInput 
                label="Extensions"
                value={Object.keys(oData().extensions).length}
                disabled={true}
                onChange={(e) => alert('Editing of the extensions field is not supported at the time.')}
              />
            </Grid.Col>
            {/* Entries */}
            <Grid.Col span={1}>
              <NumberInput 
                label="Entries"
                value={oData().entries.length}
                disabled={true}
                onChange={(e) => alert('Editing of the original entries field is not supported at the time.')}
              />
            </Grid.Col>
            {/* Recursive Scanning */}
            <Grid.Col span={1}>
                          <Checkbox
                              label="Recursive Scanning"
                              checked={oData().recursive_scanning}
                              onChange={(e) =>
                                updateEntry('recursive_scanning', e.target.checked)
                              }
                            />
            </Grid.Col>
          </Grid>
        </Container>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          No Original Data present
        </div>
      )}
    </div>
  );
}

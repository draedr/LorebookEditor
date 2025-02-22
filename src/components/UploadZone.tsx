import { Group, Text } from '@mantine/core';
import { Dropzone, DropzoneProps } from '@mantine/dropzone';
import { FileJson, Image, Upload, X } from 'lucide-react';

export function UploadZone(props: Partial<DropzoneProps>) {
    var acceptJson = {'application/json': ['.json']};
  return (
    <Dropzone
      onDrop={props.onDrop}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={acceptJson}
      {...props}
      border
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>

        <FileJson size={52} color="black" strokeWidth={1}/>
        
        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
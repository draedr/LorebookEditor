import { useContext } from 'react';
import { HooksContext } from '../hooks';
import { Divider, Title } from '@mantine/core';

import { UploadZone } from './../components/UploadZone.tsx';
import { FileWithPath } from '@mantine/dropzone';

export default function Homepage() {
  const { loadedLorebook, handleFileUpload } = useContext(HooksContext);

  const onDrop = (e: FileWithPath[]) => {
    console.log(e);
    handleFileUpload(e[0])
  }

  return (
    <div className="p-4">
      {loadedLorebook && (
        <div>
          <Title order={2}>Loaded Lorebook: {loadedLorebook}</Title>
          <Divider my="md" />
        </div>
      )}
      <UploadZone onDrop={onDrop}/>
    </div>
  );
}

import React, {useEffect} from 'react';
import UploadModern from './UploadModern';
import Box from '@mui/material/Box';
import {useDropzone} from 'react-dropzone';
import FileRow from './FileRow';
import {AppList} from '@crema';
import {Alert, Snackbar} from '@mui/material';
import {useCallback} from 'react';
import PropsTypes from 'prop-types';

const CDropZone = ({files, setFiles}) => {
  const dropzone = useDropzone({
    accept: ['image/*'],
    onDropRejected: useCallback(() => (
      <Snackbar autoHideDuration={6000}>
        <Alert severity='success' xs={{width: '100%'}}>
          This is a success message!
        </Alert>
      </Snackbar>
    )),
  });

  useEffect(() => {
    setFiles([...files, ...dropzone.acceptedFiles]);
  }, [dropzone.acceptedFiles]);

  const onDeleteUploadFile = (file) => {
    setFiles(files.filter((fileitem) => file != fileitem));
  };

  return (
    <Box xs={{position: 'relative'}}>
      <UploadModern
        uploadText='Drag n drop some files here, or click to select files'
        dropzone={dropzone}
      />
      <aside>
        <AppList
          data={files}
          renderRow={(file, index) => (
            <FileRow
              key={index + file.path}
              file={file}
              onDeleteUploadFile={onDeleteUploadFile}
            />
          )}
        />
      </aside>
    </Box>
  );
};

export default CDropZone;
CDropZone.propTypes = {
  files: PropsTypes.array,
  setFiles: PropsTypes.func,
};

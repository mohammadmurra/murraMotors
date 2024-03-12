import React from 'react';
import Box from '@mui/material/Box';
import {IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropsTypes from 'prop-types';

const FileRow = ({file, onDeleteUploadFile}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: (theme) => `solid 1px ${theme.palette.divider}`,
        mb: 2.5,
        borderRadius: 2.5,
        p: 2.5,
      }}
    >
      <Box
        sx={{
          mr: {sm: 5},
          mb: 4,
          '.crUserImage': {
            width: {sx: '100%', sm: 60},
            height: {sx: 110, sm: 60},
          },
        }}
      >
      {  file.webkitRelativePath!==''
        ?<> <img src={file.path}  alt='prod'  className='crUserImage' key={file.path} /></>:
        <img
          src={URL.createObjectURL(file)}
          alt='prod'
          className='crUserImage'
        />}
      </Box>
      <Box sx={{flex: 1}}>
        {file.webkitRelativePath!==''
        ?  <Typography>{"website Product.pic"}</Typography>:
        <Typography>{file.name}</Typography>}
        <Box
          component='span'
          sx={{
            color: 'text.secondary',
          }}
        >
          {file.size} bytes
        </Box>
      </Box>
      <IconButton
        sx={{
          padding: 1.5,
          fontSize: 16,
        }}
        onClick={() => onDeleteUploadFile(file)}
      >
        <CloseIcon sx={{fontSize: 18}} />
      </IconButton>
    </Box>
  );
};

export default FileRow;
FileRow.propTypes = {
  file: PropsTypes.object,
  onDeleteUploadFile: PropsTypes.func,
};

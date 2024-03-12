import React from 'react';
import {useThemeContext} from '../../../../utility/AppContextProvider/ThemeContextProvider';
import {Box} from '@mui/material';
import {ReactComponent as Logo} from '../../../../../assets/icon/logo.svg';

const AppLogo = () => {
  const {theme} = useThemeContext();

  return (
    <Box
      sx={{
        height: {xs: 56, sm: 70},
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
          height: {xs: 12, sm: 12},
        },
      }}
      className='app-logo'
    >
      <Logo fill={theme.palette.primary.main} />
    </Box>
  );
};

export default AppLogo;

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onGetECommerceData } from '../../../redux/actions';
import AppAnimate from '@crema/core/AppAnimate';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import logo from '../../../assets/logo.png';

const ECommerce = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(onGetECommerceData());
  }, [dispatch]);

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='100vh'
      >
    
        <Box
          component='img'
          src={logo}
          alt='Morra Mutors Logo'
          sx={{ width: isXsScreen ? 120 : 200, margin: '0 auto' }} // Center the logo
        />
      </Box>
    </AppAnimate>
  );
};

export default ECommerce;

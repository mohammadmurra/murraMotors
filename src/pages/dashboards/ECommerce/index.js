import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {onGetECommerceData} from '../../../redux/actions';
// import AppGridContainer from '@crema/core/AppGridContainer';
import AppAnimate from '@crema/core/AppAnimate';
import {Box, Typography, useTheme, useMediaQuery} from '@mui/material';
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
        <Box>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            minHeight='100vh'
          >
            <Typography
              variant={isXsScreen ? 'h5' : 'h3'}
              component='h1'
              gutterBottom
            >
              Welcome to Morra Constructions
            </Typography>
            <Box
              component='img'
              src={logo}
              alt='Morra Constructions Logo'
              sx={{width: isXsScreen ? 120 : 200}} // Responsive size
            />
          </Box>
        </Box>

    </AppAnimate>
  );
};

export default ECommerce;

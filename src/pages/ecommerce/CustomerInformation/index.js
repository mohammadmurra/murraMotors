import React from 'react';
// import AppCard from '../../../@crema/core/AppCard';
import {Box, Divider} from '@mui/material';
import {Fonts} from '../../../shared/constants/AppEnums';
import {useIntl} from 'react-intl';
// import AppAnimate from '../../../@crema/core/AppAnimate';
import PropTypes from 'prop-types';

const CustomerInformation = (data) => {
  const CustomerData = data.data;
  const {messages} = useIntl();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 14,
          fontWeight: Fonts.MEDIUM,
          mt: 2,
          mb: 4,
        }}
      >
        <Box sx={{color: 'text.secondary'}}>{messages['ClinetName']}: </Box>
        <Box> {CustomerData.firstName + ' ' + CustomerData.lastName}</Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 14,
          fontWeight: Fonts.MEDIUM,
          mb: 4,
        }}
      >
        <Box sx={{color: 'text.secondary'}}>{messages['common.email']} : </Box>
        <Box>{CustomerData.email}</Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 14,
          fontWeight: Fonts.MEDIUM,
          mb: 4,
        }}
      >
        <Box sx={{color: 'text.secondary'}}>
          {messages['common.phoneNumber']}:{' '}
        </Box>
        <Box>
          <Box>{CustomerData.phoneNumber.replace(/^970|^972/, '0')}</Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 14,
          fontWeight: Fonts.MEDIUM,
          mb: 4,
        }}
      >
        <Box sx={{color: 'text.secondary'}}>{messages['Rank']}: </Box>
        <Box>
          <Box>{CustomerData.useRating + ' ' + CustomerData.Rank}</Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 14,
          fontWeight: Fonts.MEDIUM,
          mb: 4,
        }}
      >
        <Box sx={{color: 'text.secondary'}}>{messages['JoinDate']}: </Box>
        <Box>
          <Box>{CustomerData.joinDate}</Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 14,
          fontWeight: Fonts.MEDIUM,
          my: 4,
        }}
      >
        <Box sx={{color: 'text.secondary'}}>
          {messages['common.ordercount']}:{' '}
        </Box>
        <Box>{CustomerData.myOrder.length}</Box>
      </Box>
      <Divider />
    </>
  );
};

export default CustomerInformation;

CustomerInformation.propTypes = {
  customerData: PropTypes.object,
};

import React from 'react';
import {Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../shared/constants/AppEnums';
import PropTypes from 'prop-types';
const Header = ({data}) => {
  return (
    <Box
      sx={{
        pt: 2,
      }}
    >
      <Box
        sx={{
          mx: -3,
          color: 'text.secondary',
          display: 'flex',
          flexDirection: {xs: 'column', sm: 'row'},
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <Box
          sx={{
            px: 3,
            mb: 3,
            textAlign: 'center',
            minWidth: 200,
          }}
        >
          <Box
            component='h3'
            sx={{
              fontSize: 16,
              color: 'text.secondary',
              mb: 1,
              fontWeight: Fonts.BOLD,
            }}
          >
            <IntlMessages id='invoice.client' />
          </Box>
          <Typography component='p' sx={{mb: 1}}>
            Mr.{' '}
            {data.BilingInformtion.firstname +
              ' ' +
              data.BilingInformtion.lastname}
          </Typography>
          <Typography component='p' sx={{mb: 1}}>
            + {data.BilingInformtion.phone}
          </Typography>
          <Typography component='p' sx={{mb: 1}}>
            {data.BilingInformtion.email}
          </Typography>
        </Box>

        <Box
          sx={{
            px: 3,
            mb: 3,
            textAlign: {xs: 'center', sm: 'right'},
            minWidth: 200,
          }}
        >
          <Box
            component='h3'
            sx={{
              mb: 1,
              color: 'text.secondary',
              fontWeight: Fonts.BOLD,
              fontSize: 16,
            }}
          >
            <IntlMessages id='invoice.invoice' />
          </Box>
          <Typography component='p' sx={{mb: 1, fontWeight: Fonts.MEDIUM}}>
            <IntlMessages id='invoice.id' />: {data.orderId}
          </Typography>
          <Typography component='p' sx={{mb: 1}}>
            <IntlMessages id='invoice.issued' />: {data.Date}
          </Typography>
          <Typography component='p' sx={{mb: 1, fontWeight: Fonts.MEDIUM}}>
            <IntlMessages id='invoice.dueOn' />: {Date.now()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
Header.propTypes = {
  data: PropTypes.object.isRequired,
};
export default Header;

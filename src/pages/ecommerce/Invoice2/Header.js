import React from 'react';
import {Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../shared/constants/AppEnums';
import {ReactComponent as Logo} from '../../../assets/icon/Blogo.svg';
import {useThemeContext} from '../../../@crema/utility/AppContextProvider/ThemeContextProvider';
import PropTypes from 'prop-types';

const Header = ({data}) => {
  const {theme} = useThemeContext();
  const dateOptions = {year: 'numeric', month: 'short', day: 'numeric'};
  const today = new Date().toLocaleDateString('en-US', dateOptions);
  let phoneNumber = data.BilingInformtion.phone;
  if (phoneNumber.startsWith('972')) {
    phoneNumber = '0' + phoneNumber.slice(3);
  } else if (phoneNumber.startsWith('970')) {
    phoneNumber = '0' + phoneNumber.slice(3);
  }

  return (
    <Box
      sx={{
        pt: 2,
      }}
    >
      <Box
        sx={{
          mb: 0,
          textAlign: 'center',
          '& svg': {
            height: 200,
            width: {
              xs: 50,
              sm: 50,
            },
          },
        }}
      >
        <Logo fill={theme.palette.primary.main} />
      </Box>

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
            textAlign: {xs: 'center', sm: 'left'},
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
            <IntlMessages id='common.userName' />
            {':'}
            Mr/Ms.{' '}
            {data.BilingInformtion.firstname +
              ' ' +
              data.BilingInformtion.lastname}
          </Typography>
          <Typography component='p' sx={{mb: 1}}>
            <IntlMessages id='sidebar.phone.orderDetials' />
            {':'}
            {phoneNumber}
          </Typography>
          <Typography component='p' sx={{mb: 1}}>
            <IntlMessages id='common.email' />
            {':'}
            {data.BilingInformtion.email}
          </Typography>
          <Typography component='p' sx={{mb: 1}}>
            <IntlMessages id='sidebar.order.orderDetials' />
            {':'}
            {data.BilingInformtion.Region +
              ',' +
              data.BilingInformtion.city +
              ',' +
              data.BilingInformtion.house +
              ',' +
              data.BilingInformtion.houseType}
          </Typography>
          <Typography component='p' sx={{mb: 1, fontWeight: Fonts.MEDIUM}}>
            <IntlMessages id='common.invoice.total' />: {data.totalPrice} ₪
          </Typography>
        </Box>
        <Box
          sx={{
            px: 3,
            mb: 3,
            textAlign: 'center',
            minWidth: 200,
          }}
        >
          <Box
            sx={{
              color: 'text.secondary',
              mb: 1,
              mr: 10,
              fontWeight: Fonts.BOLD,
              fontSize: 16,
            }}
          >
            Murra
          </Box>
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
            <IntlMessages id='invoice.dueOn' />: {data.Date}
          </Typography>
          <Typography component='p' sx={{mb: 1, fontWeight: Fonts.MEDIUM}}>
            <IntlMessages id='invoice.issued' />: {today}
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

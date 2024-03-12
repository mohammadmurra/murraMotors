import React, {useState} from 'react';
import AppCard from '../../../@crema/core/AppCard';
import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {Fonts} from '../../../shared/constants/AppEnums';
import {useIntl} from 'react-intl';
import AppAnimate from '../../../@crema/core/AppAnimate';
import PropTypes from 'prop-types';

const ClinetInformation = ({data}) => {

  const [state, setState] = React.useState(data.status);
  const {messages} = useIntl();
  const [adress, setAdress] = useState(
    JSON.parse(sessionStorage.getItem('Informition')),
  );
  // const [newEmpNotes, setnewEmpNotes] = useState('');
  const isdisabled = !(data.status === 'Pending');
  const handleChange = (e) => {
    e.preventDefault();
    setAdress({
      ...adress,

      [e.target.name]: e.target.value.trim(),
    });
  };
  // const handleSetEmpNotes = (e) => {
  //   e.preventDefault();
  //   setnewEmpNotes(e.target.value.trim());
 
  //   setAdress({
  //     ...adress,
  //     Empnotes: newEmpNotes,
  //   });
  //   console.log(adress);
  // };
  window.sessionStorage.setItem('Informition', JSON.stringify(adress));
  const handleChangeState = (e) => {
    e.preventDefault();

    console.log(e.target.value);
    setState(e.target.value);
    window.sessionStorage.setItem(
      'orderStatus',
      JSON.stringify(e.target.value),
    );
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    let name = [];

    name = e.target.value.trim().split(' ');

    if (name.length > 1) {
      adress.firstname = name[0];
      adress.lastname = name[1];
    } else {
      adress.firstname = name[0];
    }

    console.log(adress);
  };

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <AppCard
        title={
          <Box fontSize={16} fontWeight={Fonts.BOLD}>
            {messages['sidebar.order.userInformation']}
          </Box>
        }
      >
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
            {messages['OrderId']}:{' '}
          </Box>
          <Box>{data.id.replace("#", "")}</Box>
        </Box>

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
          {!isdisabled ? (
            <Box>
              <TextField
                defaultValue={
                  data.BilingInformtion.firstname +
                  ' ' +
                  data.BilingInformtion.lastname
                }
                onChange={(e) => handleNameChange(e)}
                name='firstname'
                id='formatted-numberformat-input'
                variant='standard'
              />
            </Box>
          ) : (
            <Box>
              {data.BilingInformtion.firstname +
                ' ' +
                data.BilingInformtion.lastname}
            </Box>
          )}
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
            {messages['common.email']} :{' '}
          </Box>
          <Box>{data.BilingInformtion.email}</Box>
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
            {!isdisabled ? (
              <TextField
                defaultValue={'+' + adress.phone}
                onChange={(e) => handleChange(e)}
                name='phone'
                id='formatted-numberformat-input'
                variant='standard'
              />
            ) : (
              <Box>{'+' + adress.phone}</Box>
            )}
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
          <Box sx={{color: 'text.secondary'}}>
            {messages['paymentMethod']}:{' '}
          </Box>
          <Box>{data.payedType}</Box>
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
          <Box sx={{color: 'text.secondary'}}>{messages['PaymentState']}: </Box>

          <Box>{data.isPayed}</Box>
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
          <Box sx={{color: 'text.secondary'}}>{messages['OrderState']}: </Box>

          <Grid item textAlign={'start'} xs={6} sm={1.5}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>
                {messages['State']}{' '}
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='state'
                name='state'
                value={state}
                label={['State']}
                onChange={(e) => handleChangeState(e)}
              >
                <MenuItem value={'Pending'}>
                  {messages['common.pending']}
                </MenuItem>
                <MenuItem value={'InProgress'}>
                  {messages['InProgress']}
                </MenuItem>
                <MenuItem value={'InDelivery'}>
                  {messages['InDelivery']}
                </MenuItem>
                <MenuItem value={'Completed'}>{messages['Completed']}</MenuItem>
                <MenuItem value={'Canceled'}>{messages['Canceled']}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Box>
        <Divider />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 14,
            fontWeight: Fonts.MEDIUM,
            my: 4,
          }}
        >
          <Box sx={{color: 'text.secondary'}}>{messages['common.notes']}: </Box>
          <Box>{adress.notes}</Box>
        </Box>
        <Divider />

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
            {messages['common.Empnotes']}:{' '}
          </Box>
          <Box>
            <TextField
              defaultValue={adress.empNotes}
              onChange={(e) => handleChange(e)}
              name='empNotes'
              id='formatted-numberformat-input'
              variant='standard'
            />
          </Box>
        </Box>
      </AppCard>
    </AppAnimate>
  );
};

export default ClinetInformation;

ClinetInformation.propTypes = {
  cartItems: PropTypes.array,
  data: PropTypes.object,
  stat: PropTypes.func,
};

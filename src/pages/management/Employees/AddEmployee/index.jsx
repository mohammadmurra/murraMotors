import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CodeIcon from '@mui/icons-material/Code';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AppAnimate from '../../../../@crema/core/AppAnimate';
import TextField from '@mui/material/TextField';
import { Fonts } from '../../../../shared/constants/AppEnums';

import {
  addEmployees,
  generateEID,
} from '../../../../@crema/services/auth/firebase/firebase';
import { LoadingButton } from '@mui/lab';
import { AppConfirmDialog } from '@crema';
const AddEmployee = ({
  // title,
  description,
  source,
}) => {
  const [formData, updateFormData] = useState();
  const [viewSource, setToggleViewSource] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [EmployeeId, setEmployeeId] = useState();
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState();
  const [role, setRole] = React.useState('');

  useEffect(async () => {
    let id = await generateEID();
    setEmployeeId(id);
  }, [EmployeeId]);

  const handleChangeRole = (e) => {
    console.log(e.target.value);
    setRole(e.target.value);
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value.trim(),
    });
  };

  const addEmployee = (e) => {
    e.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    const form = {
      id: EmployeeId,
      name: formData.name,
      role: role,
      phone_Number: formData.Phone_Number,

      email: formData.email.toLowerCase(),
      address: formData.address,
      password: formData.password,
      time: Date.now(),
      addDate: today,
    };
    console.log(form);
    setIsAdding(true);
    addEmployees(EmployeeId, form).catch((e) => {
      setError(e);
      console.log(e);
      setIsAdding(false);
    });
  };

  return (
    <form onSubmit={(e) => addEmployee(e)}>
      {console.log(error)}
      <AppConfirmDialog open={error} title={error?.message} onConfirm={() => setError()} onDeny={() => setError()} />
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <Card>
          <CardHeader
            sx={{
              py: 4,

              pb: 1,
              px: 5,
              display: 'flex',
              alignItems: 'center',
              minHeight: 50,
              boxSizing: 'border-box',
              '& .MuiTypography-h5': {
                fontSize: 14,
                fontWeight: Fonts.BOLD,
                marginBottom: 0.25,
              },
            }}
            // title={title}
            subheader={description}
            root={{
              subheader: {
                fontSize: 13,
              },
            }}
            action={
              source ? (
                <Box>
                  <IconButton
                    aria-label='view code'
                    onClick={() => {
                      if (animation) {
                        setAnimation(!animation);
                        setTimeout(() => setToggleViewSource(!viewSource), 400);
                      } else {
                        setAnimation(!animation);
                        setToggleViewSource(!viewSource);
                      }
                    }}
                    size='large'
                  >
                    <CodeIcon />
                  </IconButton>
                </Box>
              ) : null
            }
          />

          <CardContent sx={{ px: 10, pt: 1 }}>
            <Grid container item xs={12} sm={5} spacing={4} textAlign={'start'}>
              <Grid item textAlign={'start'} xs={12} lg={6}>
                <TextField
                  id='outlined-basic'
                  name='name'
                  label={['Full Name']}
                  variant='outlined'
                  onChange={handleChange}
                  required
                />
              </Grid>

          

              <Grid item textAlign={'start'} xs={9} lg={5} mr={11}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Role</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='role'
                    name='role'
                    value={role}
                    label={['Role']}
                    onChange={handleChangeRole}
                  >
                    <MenuItem value={'admin'}>Admin</MenuItem>
                    <MenuItem value={'accounting_manager'}>Accounting Manager</MenuItem>
                    <MenuItem value={'call_support'}>Call Support</MenuItem>
                    <MenuItem value={'warehouse_employee'}>Warehose Empoyee</MenuItem>
                    <MenuItem value={'sales_man'}>Sales Man</MenuItem>
                    <MenuItem value={'desginer'}>Desginer</MenuItem>
                    <MenuItem value={'data_entry'}>Data Entry</MenuItem>
                    <MenuItem value={'delivery_employee'}>Delivery Employee</MenuItem>
                    <MenuItem value={'developer'}>Developer</MenuItem>
                    <MenuItem value={'human_resources'}>Human Resources</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item textAlign={'start'} xs={12} lg={6}>
                <TextField
                  type='number'
                  id='Phone_Number'
                  name='Phone_Number'
                  label={['Phone Number']}
                  variant='outlined'
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item textAlign={'start'} xs={12} lg={6}>
                <TextField
                  id='email'
                  name='email'
                  label={['Email']}
                  variant='outlined'
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item textAlign={'start'} xs={12} lg={6}>
                <TextField
                  id='password'
                  name='password'
                  label={['Password']}
                  type='password'
                  variant='outlined'
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} style={{ minHeight: '100px' }}>
                <TextField
                  style={{ width: '100%' }}
                  id='address'
                  name='address'
                  label={['Address']}
                  variant='outlined'
                  size='large'
                  inputProps={{ style: { minHeight: 70 } }}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item sx={0} sm={1}>
                <Divider
                  orientation='horizontal'
                  style={{
                    marginRight: '50%',
                    marginLeft: '50%',
                    height: '100%',
                    width: '2px',
                  }}
                />
              </Grid>

              <Grid container xs={12} sm={6} item spacing={2}>
                <Grid
                  item
                  maxHeight={{ xs: '170px', lg: '250px' }}
                  overflow={'auto'}
                  xs={12}
                ></Grid>
              </Grid>
            </Grid>
            {
              isAdding ?
                <LoadingButton loading variant='outlined'>
                  Add Employee
                </LoadingButton> :
                <Button type='submit' variant='contained' color='primary'>
                  Add Employee
                </Button>
            }
          </CardContent>
        </Card>
      </AppAnimate>
    </form>
  );
};

AddEmployee.propTypes = {
  source: PropTypes.any,
  // title: PropTypes.node.isRequired,
  description: PropTypes.node,
  // buttonCompMethod:  PropTypes.any.isRequired,
};

export default AddEmployee;

import React, {useEffect, useState} from 'react';
import {
  Card,
  Button,
  Grid,
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
import {Fonts} from '../../../../shared/constants/AppEnums';

import {
  addEmployees,
  generateEID,
} from '../../../../@crema/services/auth/firebase/firebase';
import {LoadingButton} from '@mui/lab';
import {AppConfirmDialog} from '@crema';
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
      <AppConfirmDialog
        open={!!error}
        title={error?.message || ''}
        onConfirm={() => setError(null)}
        onDeny={() => setError(null)}
      />
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
            subheader={description}
            action={
              source ? (
                <Box>
                  <IconButton
                    aria-label='view code'
                    onClick={() => {
                      setAnimation(!animation);
                      setTimeout(() => setToggleViewSource(!viewSource), 400);
                    }}
                    size='large'
                  >
                    <CodeIcon />
                  </IconButton>
                </Box>
              ) : null
            }
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id='name'
                  name='name'
                  label='Full Name'
                  variant='outlined'
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Role</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='role'
                    name='role'
                    value={role}
                    label='Role'
                    onChange={handleChangeRole}
                    required
                  >
                    <MenuItem value={'admin'}>Admin</MenuItem>
                    <MenuItem value={'accounting_manager'}>
                      Accounting Manager
                    </MenuItem>
                    <MenuItem value={'call_support'}>Call Support</MenuItem>
                    <MenuItem value={'warehouse_employee'}>
                      Warehose Empoyee
                    </MenuItem>
                    <MenuItem value={'sales_man'}>Sales Man</MenuItem>
                    <MenuItem value={'desginer'}>Desginer</MenuItem>
                    <MenuItem value={'data_entry'}>Data Entry</MenuItem>
                    <MenuItem value={'delivery_employee'}>
                      Delivery Employee
                    </MenuItem>
                    <MenuItem value={'developer'}>Developer</MenuItem>
                    <MenuItem value={'human_resources'}>
                      Human Resources
                    </MenuItem>{' '}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='number'
                  id='Phone_Number'
                  name='Phone_Number'
                  label='Phone Number'
                  variant='outlined'
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id='email'
                  name='email'
                  label='Email'
                  variant='outlined'
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id='password'
                  name='password'
                  label='Password'
                  type='password'
                  variant='outlined'
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id='address'
                  name='address'
                  label='Address'
                  variant='outlined'
                  multiline
                  rows={4}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <Box mt={3} display='flex' justifyContent='flex-end'>
              {isAdding ? (
                <LoadingButton loading variant='outlined'>
                  Add Employee
                </LoadingButton>
              ) : (
                <Button type='submit' variant='contained' color='primary'>
                  Add Employee
                </Button>
              )}
            </Box>
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

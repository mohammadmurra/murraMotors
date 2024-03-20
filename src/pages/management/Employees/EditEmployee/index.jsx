import React, {useEffect, useState} from 'react';
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
import {Fonts} from '../../../../shared/constants/AppEnums';
import {EDIT_EMPLOYEE} from 'query/deletQuerys/deletQuerys';
import { useLazyQuery } from '@apollo/client';


const EditEmployee = ({
  employeeData,
  // title,
  description,
  source,
}) => {
  const [formData, updateFormData] = useState(employeeData);
  const [viewSource, setToggleViewSource] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [role, setRole] = React.useState(employeeData.role);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
  };

  const [EditEmployee, {data}] = useLazyQuery(EDIT_EMPLOYEE);
  useEffect(() => {
    if (data) {
      console.log(data);
       alert(data.EditEmployee.result);
   
      }
  }, [data]);
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

  const addprod = (e) => {
    e.preventDefault();
    const form = {
      id: employeeData.id,
      name: formData.name?formData.name:employeeData.name,
      role: role,
      phone_Number: formData.phone_Number?formData.phone_Number:employeeData.phone_Number,

      email: formData.email?formData.email:employeeData.email,
      address: formData.address?formData.address:employeeData.address,
      password: formData.password?formData.password:employeeData.password,
      addDate: employeeData.addDate,
      time: employeeData.time,
    };
    console.log(form);
    EditEmployee({
      variables: {data: form, oldPasswar: employeeData.password},
    });
  };

  return (
    <form style={style} onSubmit={(e) => addprod(e)}>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <Card>
          <CardHeader
            sx={{
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

          <CardContent sx={{px: 10, pt: 1}}>
            <Grid container item xs={12} sm={5} spacing={4} textAlign={'start'}>
              <Grid item textAlign={'start'} xs={12} lg={6}>
                <TextField
                  id='outlined-basic'
                  name='name'
                  label={['Full Name']}
                  defaultValue={employeeData.name}
                  variant='outlined'
                  onChange={handleChange}
                  required
                />
              </Grid>

           

              <Grid item textAlign={'start'} xs={9} lg={11} mr={11}>
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
              <Grid item textAlign={'start'} xs={12} lg={12}>
                <TextField
                  type='number'
                  id='Phone_Number'
                  name='Phone_Number'
                  label={['Phone Number']}
                  defaultValue={employeeData.phone_Number}
                  variant='outlined'
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item textAlign={'start'} xs={12} lg={12}>
                <TextField
                  id='email'
                  contentEditable={false}
                  name='email'
                  label={['Email']}
                  variant='outlined'
                  defaultValue={employeeData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item textAlign={'start'} xs={12} lg={12}>
                <TextField
                  id='password'
                  name='password'
                  label={['Password']}
                  type='password'
                  variant='outlined'
                  defaultValue={employeeData.password}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} style={{minHeight: '100px'}}>
                <TextField
                  style={{width: '100%'}}
                  id='address'
                  name='address'
                  defaultValue={employeeData.address}
                  label={['Address']}
                  variant='outlined'
                  size='large'
                  inputProps={{style: {minHeight: 70}}}
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
                  maxHeight={{xs: '170px', lg: '250px'}}
                  overflow={'auto'}
                  xs={12}
                ></Grid>
              </Grid>
            </Grid>
            <Button type='submit' variant='contained' color='primary'>
              Update Employee
            </Button>
          </CardContent>
        </Card>
      </AppAnimate>
    </form>
  );
};

EditEmployee.propTypes = {
  source: PropTypes.any,
  // title: PropTypes.node.isRequired,
  description: PropTypes.node,
  employeeData: PropTypes.object,
  // buttonCompMethod:  PropTypes.any.isRequired,
};

export default EditEmployee;

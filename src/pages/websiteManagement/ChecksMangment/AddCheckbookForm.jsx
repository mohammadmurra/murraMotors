import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {useMutation} from '@apollo/client';
import {ADD_CHECKBOOK_MUTATION} from 'query/orderReoprt/getOrder';

const banks = [
  'بنك فلسطين',
  'البنك الوطني',
  'بنك الاستثمار الفلسطيني',
  'مصرف الصفا',
  'بنك القدس',
  'البنك الإسلامي الفلسطيني',
  'البنك الإسلامي العربي',
  'البنك العربي',
  'بنك القاهرة عمان',
  'بنك الإسكان للتجارة والتمويل',
  'بنك الأردن',
  'البنك الأهلي الأردني',
  'البنك العقاري المصري العربي',
];
const AddCheckbookForm = ({setOpenModal}) => {
  const [bankName, setBankName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [numberOfChecks, setNumberOfChecks] = useState('');
  const [addCheckbook, {loading, error}] = useMutation(ADD_CHECKBOOK_MUTATION);

  const handleSubmit = async (event) => {
    const currentDate = new Date();
  
    const date =currentDate.getTime();// Initialize with the current date

    event.preventDefault();
    try {
      const response = await addCheckbook({
        variables: {
          bankName,
          ownerName,
          numberOfChecks: parseInt(numberOfChecks, 10),
          date: date // Convert the selected date to a timestamp in milliseconds

        },
      });
      if (!loading && !error) {
        console.log('Checkbook added:', response.data);
        setOpenModal(false);
      }
    } catch (err) {
      // Since we're in a catch block, error handling is already being taken care of here
      console.error('Error adding checkbook:', err);
      // You can set additional state here to show error messages in the UI if needed
    }
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
    >
      <Card sx={{maxWidth: 480, margin: 'auto', width: '100%'}}>
        <CardContent>
          {/* Show a loading message or spinner when the mutation is in progress */}
          {loading && (
            <Box textAlign='center' py={2}>
              <Typography>Loading...</Typography>
            </Box>
          )}

          {/* Show an error message if the mutation failed */}
          {error && (
            <Box textAlign='center' py={2}>
              <Typography color='error'>Error: {error.message}</Typography>
            </Box>
          )}

          <Box padding={3} component='form' onSubmit={handleSubmit}>
            <Typography variant='h6' marginBottom={2}>
              Add Checkbook
            </Typography>

            <FormControl fullWidth margin='normal'>
              <InputLabel>Bank Name</InputLabel>
              <Select
                value={bankName}
                label='Bank Name'
                onChange={(e) => setBankName(e.target.value)}
              >
                {banks.map((bank, index) => (
                  <MenuItem key={index} value={bank}>
                    {bank}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label='Owner Name'
              variant='outlined'
              fullWidth
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              margin='normal'
            />

            <TextField
              label='Number of Checks'
              type='number'
              variant='outlined'
              fullWidth
              value={numberOfChecks}
              onChange={(e) => setNumberOfChecks(e.target.value)}
              margin='normal'
            />

            <Box display='flex' justifyContent='flex-end' marginTop={2}>
              <Button variant='contained' color='primary' type='submit'>
                Add Checkbook
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

AddCheckbookForm.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};

export default AddCheckbookForm;

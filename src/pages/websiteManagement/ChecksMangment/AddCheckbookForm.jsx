import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';
import {useMutation} from '@apollo/client';
import {ADD_CHECKBOOK_MUTATION} from 'query/orderReoprt/getOrder';
import {useIntl} from 'react-intl';

const AddCheckbookForm = ({setOpenModal,onAddSuccess}) => {
  const [ownerName, setOwnerName] = useState('');
  const [addCheckbook, {loading, data, error}] = useMutation(
    ADD_CHECKBOOK_MUTATION,
  );
  const {messages} = useIntl();

 const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date();

    try {
      const response = await addCheckbook({
        variables: {
          ownerName,
          date: currentDate.getTime(),
        },
      });

      if (response.data.addCheckbook.success) {
        onAddSuccess();  // Call the callback function when addition is successful
        setOpenModal(false);
      }
    } catch (err) {
      console.error('Error adding checkbook:', err);
    }
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const renderAlert = () => {
    // If there's a GraphQL error
    if (error) return <Alert severity='error'>{error.message}</Alert>;
    
    // Check if the mutation returned data
    if (data && data.addCheckbook) {
      if (!data.addCheckbook.success) {
        // Check the error code to display the appropriate message
        const message = data.addCheckbook.code === 1 ? messages['nameExist'] : messages['addError'];
        return <Alert severity='error'>{message}</Alert>;
      } else {
        // When the mutation is successful
        return <Alert severity='success'>{data.addCheckbook.message}</Alert>;
      }
    }
  
    // No alerts to show if there's no error or specific data
    return null;
  };
  
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
    >
      <Card sx={{width: '80%', maxWidth: 480, mx: 'auto', p: 2}}>
        <CardContent>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <Typography variant='h6' marginBottom={2}>
              {messages['invoice.name']}
            </Typography>
            <Typography variant='body2' marginBottom={2}>
              {messages['addCheckbookDescription']}
            </Typography>
            <TextField
              label={messages['invoice.name']}
              variant='outlined'
              fullWidth
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              margin='normal'
              disabled={loading}
            />
            {renderAlert()}
            <Box display='flex' justifyContent='space-between' marginTop={2}>
              <Button
                variant='outlined'
                color='secondary'
                onClick={handleClose}
                disabled={loading}
              >
                {messages['mangment.close']}
              </Button>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={loading || ownerName.trim() === ''}
                startIcon={loading ? <CircularProgress size={24} /> : null}
              >
                {messages['addCheckbook']}
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
  onAddSuccess: PropTypes.func.isRequired,
};

export default AddCheckbookForm;

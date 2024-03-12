import React, {useState} from 'react';
import {Card, Button, Grid, TextField, Alert} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import AppAnimate from '../../../../@crema/core/AppAnimate';
import {useMutation} from '@apollo/client';
import {useIntl} from 'react-intl';
import {useNavigate} from 'react-router-dom'; // Import useNavigate

import {ADD_DEBTOR_MUTATION} from 'query/orderReoprt/getOrder';

const AddDebtor = () => {
  const [addDebtor] = useMutation(ADD_DEBTOR_MUTATION);
  const {messages} = useIntl();
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mutationResponse, setMutationResponse] = useState(null); // State to store mutation response

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === 'phoneNumber') {
      const filteredValue = value.replace(/[^\d+]/g, '').slice(0, 14);
      setFormData({...formData, phoneNumber: filteredValue});
    } else {
      setFormData({...formData, [name]: value});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMutationResponse(null); // Reset mutation response state

    try {
      const {data} = await addDebtor({
        variables: {
          debtor: {
            name: formData.name,
            address: formData.address,
            phoneNumber: formData.phoneNumber,
            notes: formData.notes,
            forceAdd: false,
          },
        },
      });

      // Check if the mutation response contains the expected data and message
      if (data.addDebtor.success) {
        setMutationResponse({success: true, message: data.addDebtor.message});

        // Navigate back after 3 seconds
        setTimeout(() => {
          navigate(-1);
        }, 3000);
      } else {
        // Handle the case where the mutation is executed but returns a failure status
        setMutationResponse({
          success: false,
          message: data.addDebtor.message || 'An error occurred',
          responeCode: data.addDebtor.responeCode,
        });
      }
    } catch (error) {
      console.error('Error adding debtor:', error);
      // Handle error
      setMutationResponse({success: false, message: error.message});
    }
    setIsSubmitting(false);
  };
  const handleCancelDebtor = () => {
    setFormData({
      name: '',
      address: '',
      phoneNumber: '',
      notes: '',
    });
    setMutationResponse(null);
  };

  const handleConfirmDebtor = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMutationResponse(null); // Reset mutation response state

    try {
      const {data} = await addDebtor({
        variables: {
          debtor: {
            name: formData.name,
            address: formData.address,
            phoneNumber: formData.phoneNumber,
            notes: formData.notes,
            forceAdd: true,
          },
        },
      });

      // Check if the mutation response contains the expected data and message
      if (data.addDebtor.success) {
        setMutationResponse({success: true, message: data.addDebtor.message});

        // Navigate back after 3 seconds
        setTimeout(() => {
          navigate(-1);
        }, 3000);
      } else {
        // Handle the case where the mutation is executed but returns a failure status
        setMutationResponse({
          success: false,
          message: data.addDebtor.message || 'An error occurred',
          responeCode: data.addDebtor.responeCode,
        });
      }
    } catch (error) {
      console.error('Error adding debtor:', error);
      // Handle error
      setMutationResponse({success: false, message: error.message});
    }
    setIsSubmitting(false);
  };

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Card>
        <CardHeader title={messages['ecommerce.Debtor.AddDebtor']} />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={messages['debtorName']}
                  name='name'
                  variant='outlined'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={messages['common.address']}
                  name='address'
                  variant='outlined'
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={messages['common.phoneNumber']}
                  name='phoneNumber'
                  variant='outlined'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={messages['common.general.notes']}
                  name='notes'
                  variant='outlined'
                  value={formData.notes}
                  onChange={handleChange}
                  multiline
                  rows={4}
                />
              </Grid>
              {mutationResponse && (
                <Grid item xs={12}>
                  <Alert
                    severity={mutationResponse.success ? 'success' : 'error'}
                  >
                    {messages[mutationResponse.message]}
                  </Alert>
                </Grid>
              )}
              {mutationResponse && mutationResponse.responeCode === 4 && (
                <Grid item xs={12}>
                  <Alert
                    severity='info'
                    action={
                      <>
                        <Button
                          color='inherit'
                          size='small'
                          onClick={handleConfirmDebtor}
                        >
                          {messages['common.yes']}
                        </Button>
                        <Button
                          color='inherit'
                          size='small'
                          onClick={handleCancelDebtor}
                        >
                          {messages['common.no']}
                        </Button>
                      </>
                    }
                  >
                    {messages['doYouNeedToSave']}
                  </Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={isSubmitting || mutationResponse?.success}
                >
                  {isSubmitting
                    ? messages['Submitting']
                    : messages['ecommerce.Debtor.AddDebtor']}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </AppAnimate>
  );
};

export default AddDebtor;

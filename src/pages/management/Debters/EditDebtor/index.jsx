import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'; // Import useParams hook
import {Card, Button, Grid, TextField, Alert} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import AppAnimate from '../../../../@crema/core/AppAnimate';
import {firebase} from '../../../../@crema/services/auth/firebase/firebase'; // Adjust this import based on your project structure
import {useIntl} from 'react-intl';

const EditDebtor = () => {
  const {messages} = useIntl();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const {debtorId} = useParams(); // Get debtorId from URL
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (debtorId) {
      // Fetch debtor info from Firestore and populate form data
      const fetchDebtorById = async () => {
        const docRef = firebase.firestore().collection('Debtors').doc(debtorId);
        const doc = await docRef.get();
        if (doc.exists) {
          const debtorData = doc.data();
          setFormData({
            name: debtorData.name || '',
            address: debtorData.address || '',
            phoneNumber: debtorData.phoneNumber || '',
            notes: debtorData.notes || '',
          });
        } else {
          console.log('No such debtor!');
        }
      };

      fetchDebtorById();
    }
    console.log(formData);
  }, [debtorId]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Reference to the specific debtor document in Firestore
    const docRef = firebase.firestore().collection('Debtors').doc(debtorId);

    try {
      // Update the document with formData
      await docRef.update({
        ...formData,
      });

      setUpdateSuccess(true);
      // You can add any post-update logic here. For example, redirecting the user or showing a success message.
    } catch (error) {
      console.error('Error updating debtor:', error);
      // Handle the error. For example, you can set an error state and display it to the user.
    }

    setIsSubmitting(false);
  };

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Card>
        <CardHeader title={messages['EditDebtor']} />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Form Fields */}
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
                  label={messages['debtorAddress']}
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
              {updateSuccess && (
                <Alert severity='success'>{messages['Updatesuccessful']}</Alert>
              )}
              <Grid item xs={12}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? messages['Submitting'] : messages['UpdateDebtor']}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </AppAnimate>
  );
};

export default EditDebtor;

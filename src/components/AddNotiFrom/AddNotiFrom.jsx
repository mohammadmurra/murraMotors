import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, CardContent, Grid, Paper, Typography, Box, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { useIntl } from 'react-intl';
import { firebase } from '@crema/services/auth/firebase/firebase';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const AddNotiForm = ({ setOpenVariantModal }) => {
  const { messages } = useIntl();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await firebase.firestore().collection('employees').get();
        const employeesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEmployees(employeesData);
      } catch (error) {
        console.error('Error fetching employees:', error);
        // Handle error, e.g., show a notification
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const handleSubmit = async () => {
    if (selectedEmployee) {
      const selectedEmployeeData = employees.find(emp => emp.id === selectedEmployee);
      if (selectedEmployeeData) {
        setIsLoading(true);
        try {
          // Check if document exists, if not create it
          const notiRef = firebase.firestore().collection('financialUsersNoti').doc(selectedEmployeeData.email);
          const doc = await notiRef.get();
          if (!doc.exists) {
            await notiRef.set({ notifications: [] }); // Initialize with empty array or default structure
          }

          await notiRef.update({
            name: selectedEmployeeData.name,
            email: selectedEmployeeData.email,
            time: new Date().getTime(),
          });

          setOpenVariantModal(false);
          setSelectedEmployee('');
          window.location.reload();

        } catch (error) {
          console.error('Error updating Firestore:', error);
          // Handle error, e.g., show a notification
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <Box style={style} minWidth={{ xs: '90%', sm: '40%' }}>
      <Paper elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {messages['sidebar.app.dashboard.AddEmployeeToNotification']}
          </Typography>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <FormControl fullWidth>
                <InputLabel>{messages['common.selectEmployee']}</InputLabel>
                <Select
                  value={selectedEmployee}
                  onChange={handleChange}
                  label={messages['common.selectEmployee']}
                >
                  {employees.map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <Button variant="contained" onClick={handleSubmit}>
                    {messages['common.add']}
                  </Button>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={() => setOpenVariantModal(false)} variant="contained">
                    {messages['common.close']}
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </CardContent>
      </Paper>
    </Box>
  );
};

AddNotiForm.propTypes = {
  setOpenVariantModal: PropTypes.func.isRequired,
};

export default AddNotiForm;

import React, {useEffect, useState} from 'react';
import {firebase} from '@crema/services/auth/firebase/firebase'; // Update the import path as necessary
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import {Typography, CircularProgress, Box, IconButton} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from 'react-router-dom';
import {useIntl} from 'react-intl';

const formatDate = (dateString) => {
  const date = new Date(parseInt(dateString));
  return date.toLocaleDateString();
};

const ChecksList = ({
  checks,
  setTotalChecksRejectedSum,
  setTotalChecksSum,
  debtorId,
}) => {
  console.log('debtorId');
  console.log(debtorId);
  const [fetchedChecks, setFetchedChecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {messages} = useIntl();

  // Function to navigate to the check details/edit page
  const handleEditCheck = (checkId) => {
    navigate(`/management/Checks/CheckDetails/${debtorId}/${checkId}`); // Update with the correct path
  };

  useEffect(() => {
    const fetchChecks = async () => {
      try {
        const db = firebase.firestore();
        const checksData = await Promise.all(
          checks.map((checkId) => db.collection('Checks').doc(checkId).get()),
        );


        const formattedChecks = checksData
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => {
            console.log('Comparing dates:', a.date, b.date); // Debug statement
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          });

        console.log('Sorted checks:', formattedChecks); // Debug statement

        setFetchedChecks(formattedChecks);
    
        // Calculate the sum of checks where rejected is false
        const totalSum = formattedChecks.reduce((sum, check) => {
          if (check.currency === 'USD') {
            // If so, convert its value using the conversionRate
            return sum + (check.value * check.conversionRate);
          } else {
            // If the currency is not 'USD', add the value as is
            return sum + check.value;
          }
  
        }, 0);

        // Calculate the sum of checks where rejected is true
        const totalRejectedSum = formattedChecks.reduce((sum, check) => {
          if (check.rejected === true) {
            if (check.currency === 'USD') {
              // If the currency is 'USD', convert its value using the conversionRate provided in the check
              return sum + (check.value * check.conversionRate);
            } else {
              // If the currency is not 'USD', add the value as is
              return sum + check.value;
            }
          } else {
            // If the check is not rejected, simply return the current sum without modification
            return sum;
          }
        }, 0);
        
        // Update the total checks sum and rejected sum in the parent component
        setTotalChecksSum(totalSum);
        setTotalChecksRejectedSum(totalRejectedSum);

        // Update the total checks sum in the parent component
        setTotalChecksSum(totalSum);
      } catch (error) {
        console.error('Error fetching checks:', error);
        setError('Failed to fetch check details');
      }
      setLoading(false);
    };

    fetchChecks();
  }, [checks, setTotalChecksSum]);

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color='error'>{error}</Typography>;
  }

  if (!fetchedChecks || fetchedChecks.length === 0) {
    return <Typography>No checks available</Typography>;
  }

  // Function to check if the check date has passed
  const isCheckDatePassed = (checkDate) => {
    const today = new Date();
    const checkDateObject = new Date(parseInt(checkDate));
    return checkDateObject < today;
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label='checks table'>
        <TableHead>
          <TableRow>
            <TableCell>{messages['RowNumber']}</TableCell>
            <TableCell align='right'>{messages['CheckNumber']}</TableCell>{' '}
            <TableCell align='right'>{messages['OwnerName']}</TableCell>{' '}
            <TableCell align='right'>{messages['common.date']}</TableCell>{' '}
            <TableCell align='right'>{messages['invoice.value']}</TableCell>{' '}
            <TableCell align='right'>{messages['currency']}</TableCell>
            <TableCell align='right'>{messages['ConversionRateFaild2']}</TableCell>{' '}

            <TableCell align='right'>{messages['common.status']}</TableCell>
            <TableCell align='right'>{messages['isDue']} </TableCell>
            <TableCell align='right'>{messages['common.edit']}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fetchedChecks.map((check, index) => {
            const rowStyle = check.rejected
              ? {backgroundColor: '#ffebee'} // Highlight row in red if rejected
              : isCheckDatePassed(check.date) && !check.rejected
              ? {backgroundColor: '#e8f5e9'} // Highlight row in green if date passed, not cashed, not rejected
              : {};

            return (
              <TableRow key={check.id} style={rowStyle}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{check.checkNumber}</TableCell>
                <TableCell align='right'>{check.ownerName}</TableCell>
                <TableCell align='right'>{formatDate(check.date)}</TableCell>
                <TableCell align='right'>{check.value}</TableCell>
                <TableCell align='right'>{check.currency}</TableCell>
                <TableCell align='right'>{check.conversionRate}</TableCell>

                <TableCell align='right'>
                  {check.rejected ? messages['Rejected'] : messages['NotCashedYet']}
                </TableCell>
                <TableCell align='right'>
                  {isCheckDatePassed(check.date) ? messages['common.yes'] :  messages['common.no']}
                </TableCell>
                <TableCell align='right'>
                  <IconButton onClick={() => handleEditCheck(check.id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ChecksList.propTypes = {
  checks: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTotalChecksSum: PropTypes.func.isRequired,
  setTotalChecksRejectedSum: PropTypes.func.isRequired,
  debtorId: PropTypes.string.isRequired,
  setTotalChecksSumRejcectd: PropTypes.func.isRequired,

};

export default ChecksList;

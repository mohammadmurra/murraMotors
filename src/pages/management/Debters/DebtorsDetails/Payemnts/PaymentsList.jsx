import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import {firebase} from '@crema/services/auth/firebase/firebase'; // Update the import path as necessary
import {IconButton} from '@mui/material';
import PaymentEditModal from './PaymentEditModal';
import {useIntl} from 'react-intl';

const formatDate = (dateString) => {
  // Convert the string to a number and create a Date object
  const timestamp = parseFloat(dateString);
  if (isNaN(timestamp)) {
    return 'Invalid Date';
  }

  const date = new Date(timestamp);

  // Get day, month, and year
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear();

  // Format as dd/mm/yyyy
  return `${day}/${month}/${year}`;
};

const PaymentsList = ({payments, debtorId, onUpdatePayment}) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {messages} = useIntl();

  const handleEditClick = (payment) => {
    if (payment) {
      setSelectedPayment(payment);
      setIsModalOpen(true);
    }
  };
  const handleDelete = async (paymentId) => {
    setLoading(true);
    // Call a method to delete the payment from the database
    try {
      await deletePaymentFromDatabase(paymentId);
      // Filter out the deleted payment from the local state
      const updatedPayments = payments.filter((payment) => payment.id !== paymentId);
      // Update the state with the new payments array
      
    
      setIsModalOpen(false);
      setLoading(false);
      onUpdatePayment(updatedPayments);
    } catch (error) {
      console.error("Failed to delete payment:", error);
      setLoading(false);
    }
  };
  
  async function deletePaymentFromDatabase(paymentId) {
    // Logic to delete the payment from the database based on paymentId
    const debtorRef = firebase.firestore().collection('Debtors').doc(debtorId);
    const doc = await debtorRef.get();
    if (doc.exists) {
      const debtorData = doc.data();
      const updatedPayments = debtorData.payments.filter(payment => payment.id !== paymentId);
      await debtorRef.update({ payments: updatedPayments });
    }
  }
  
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleSavePayment = async (updatedPayment) => {
    setLoading(true);
    const db = firebase.firestore();
    const debtorRef = db.collection('Debtors').doc(debtorId);

    try {
      await db.runTransaction(async (transaction) => {
        const debtorDoc = await transaction.get(debtorRef);
        if (!debtorDoc.exists) {
          throw new Error('Debtor not found');
        }

        const debtorData = debtorDoc.data();
        const updatedPayments = debtorData.payments.map((payment) =>
          payment.id === updatedPayment.id ? updatedPayment : payment,
        );

        transaction.update(debtorRef, {payments: updatedPayments});
      });
      onUpdatePayment(updatedPayment); // Update the local state of the parent component

      setLoading(false);
      handleModalClose();

      // Optional: Update local state or re-fetch the updated payments
      // This depends on how your application state management is set up
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='payments table'>
          <TableHead>
            <TableRow>
              <TableCell>{messages['RowNumber']}</TableCell>
              <TableCell>{messages['common.general.notes']}</TableCell>
              <TableCell align='right'>{messages['invoice.value']}</TableCell>
              <TableCell align='right'>{messages['currency']}</TableCell>
              <TableCell align='right'>{messages['paymentType']}</TableCell>

              <TableCell align='right'>{messages['common.date']}</TableCell>
              <TableCell align='right'>{messages['common.edit']}</TableCell>

              {/* Add other column headers here */}
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell component='th' scope='row'>
                  {payment.note}
                </TableCell>
                <TableCell align='right'>{payment.value}</TableCell>{' '}
                {/* Corrected property name to 'value' */}
                <TableCell align='right'>{payment.currency}</TableCell>{' '}
                <TableCell align='right'>{messages[payment.type]}</TableCell>{' '}

                <TableCell align='right'>
                  {formatDate(payment.date)}
                </TableCell>{' '}
                {/* Formatted date */}
                <TableCell align='right'>
                  <IconButton onClick={() => handleEditClick(payment)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                {/* Add other payment details here */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaymentEditModal
        open={isModalOpen}
        payment={selectedPayment}
        onClose={handleModalClose}
        onSave={handleSavePayment}
        loading={loading}
        onDelete={handleDelete}
      />
    </>
  );
};

export default PaymentsList;

PaymentsList.propTypes = {
  payments: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      value: PropTypes.number, // Corrected property name to 'value'
      date: PropTypes.string, // Ensure this matches the format of your date data
      // Define other properties of a payment object here if necessary
    }),
  ).isRequired,
  debtorId: PropTypes.string.isRequired,
  onUpdatePayment: PropTypes.func.isRequired,
};

import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import DebtEditModal from './DebtEditModal';
import {IconButton} from '@mui/material';
import {useIntl} from 'react-intl';
import EditIcon from '@mui/icons-material/Edit';
import {firebase} from '@crema/services/auth/firebase/firebase'; // Update the import path as necessary

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

const DebtsList = ({debts, debtorId, onUpdateDebt}) => {
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {messages} = useIntl();
  const db = firebase.firestore();
  const handleSaveDebt = async (updatedDebt) => {
    setLoading(true);

    const debtorRef = db.collection('Debtors').doc(debtorId); // Replace with your debtor ID

    try {
      await db.runTransaction(async (transaction) => {
        const debtorDoc = await transaction.get(debtorRef);
        if (!debtorDoc.exists) {
          throw new Error('Debtor not found');
        }

        const debtorData = debtorDoc.data();
        const updatedDebts = debtorData.debts.map((debt) =>
          debt.id === updatedDebt.id ? updatedDebt : debt,
        );

        transaction.update(debtorRef, {debts: updatedDebts});
      });

      // After saving, update local state or re-fetch updated debts
      // (This step depends on your application's state management)
      onUpdateDebt(updatedDebt); // Update the local state of the parent component

      setLoading(false);
      handleModalClose();
    } catch (error) {
      console.error('Error updating debt:', error);
      setLoading(false); // Ensure loading is reset even if there's an error
    }
  };

  // Inside DebtsList component
  const handleDelete = async (debtId) => {
    setLoading(true);
    try {
      await deleteDebtFromDatabase(debtorId, debtId);
      const updatedDebts = debts.filter((debt) => debt.id !== debtId);
      onUpdateDebt(updatedDebts); // Notify parent component about the update
      setLoading(false);
    } catch (error) {
      console.error('Failed to delete debt:', error);
      setLoading(false);
    }
  };

  async function deleteDebtFromDatabase(debtorId, debtId) {
    try {
      const debtorRef = db.collection('Debtors').doc(debtorId);
      const doc = await debtorRef.get();

      if (!doc.exists) {
        console.log('No such debtor!');
        return;
      }

      const debtorData = doc.data();
      const updatedDebts = debtorData.debts.filter(
        (debt) => debt.id !== debtId,
      );

      await debtorRef.update({
        debts: updatedDebts,
      });

      console.log('Debt deleted successfully.');
    } catch (error) {
      console.error('Error deleting debt:', error);
    }
  }

  const handleEditClick = (debt) => {
    setSelectedDebt(debt);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='debts table'>
          <TableHead>
            <TableRow>
              <TableCell>{messages['RowNumber']}</TableCell>
              <TableCell>{messages['common.general.notes']}</TableCell>
              <TableCell align='right'>{messages['invoice.value']}</TableCell>
              <TableCell align='right'>{messages['currency']}</TableCell>
              <TableCell align='right'>{messages['common.date']}</TableCell>
              <TableCell align='right'>{messages['common.edit']}</TableCell>

              {/* Add other column headers here */}
            </TableRow>
          </TableHead>
          <TableBody>
            {debts.map((debt, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell component='th' scope='row'>
                  {debt.note}
                </TableCell>
                <TableCell align='right'>{debt.value}</TableCell>
                <TableCell align='right'>ILS</TableCell>
                <TableCell align='right'>{formatDate(debt.date)}</TableCell>
                <TableCell align='right'>
                  <IconButton onClick={() => handleEditClick(debt)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                {/* Add other debt details here */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DebtEditModal
        open={isModalOpen}
        debt={selectedDebt}
        onClose={handleModalClose}
        onDelete={handleDelete}
        onSave={handleSaveDebt}
        loading={loading}
      />
    </>
  );
};

export default DebtsList;

DebtsList.propTypes = {
  debts: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      amount: PropTypes.number,
      date: PropTypes.string, // Ensure this matches the format of your date data
      // Define other properties of a debt object here if necessary
    }),
  ).isRequired,
  debtorId: PropTypes.func.isRequired,
  onUpdateDebt: PropTypes.func.isRequired,
};

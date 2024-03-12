import React, {useState, useEffect} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';

const PaymentEditModal = ({open, payment, onClose, onSave, loading,onDelete}) => {
  const [editedPayment, setEditedPayment] = useState(payment || {});
  const [error, setError] = useState(null); // State to track error
  const {messages} = useIntl();
  useEffect(() => {
    setEditedPayment(payment || {});
  }, [payment]);

  const handleSave = async () => {
    try {
      await onSave(editedPayment);
    } catch (err) {
      setError(err.message || 'Update failed'); // Set error message
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant='h6' mb={2}>
          {messages['EditPayment']}
        </Typography>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px', // Adjust height as needed
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {error && (
              <Typography variant='body2' color='error' mb={2}>
                {error}
              </Typography>
            )}
            <TextField
              label={messages['common.general.notes']}
              fullWidth
              margin='normal'
              value={editedPayment.note || ''}
              onChange={(e) =>
                setEditedPayment({...editedPayment, note: e.target.value})
              }
            />
            <TextField
              label={messages['invoice.value']}
              fullWidth
              margin='normal'
              type='number'
              value={editedPayment.value || 0}
              onChange={(e) =>
                setEditedPayment({
                  ...editedPayment,
                  value: parseFloat(e.target.value),
                })
              }
            />
            {/* Add other fields as needed */}
            <Button
              variant='contained'
              color='primary'
              onClick={handleSave}
              fullWidth
              sx={{ mb: 2 }} // Add a bottom margin to the "Save" button

            >
              {messages['common.save']}
            </Button>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => onDelete(payment.id)} // Use the passed onDelete function

              fullWidth
            >
              {messages['common.delete']}
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

PaymentEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  payment: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,

};

export default PaymentEditModal;

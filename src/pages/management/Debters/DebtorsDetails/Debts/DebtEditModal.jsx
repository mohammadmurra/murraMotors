import React, {useState, useEffect} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';

const DebtEditModal = ({open, debt, onClose, onSave, loading,onDelete}) => {
  const [editedDebt, setEditedDebt] = useState(debt || {});
  const [error, setError] = useState(null);
  const {messages} = useIntl();

  useEffect(() => {
    setEditedDebt(debt || {});
  }, [debt]);

  const handleSave = async () => {
    try {
      await onSave(editedDebt);
    } catch (err) {
      setError(err.message || 'Update failed');
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
          {messages['EditDebt']}
        </Typography>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
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
              value={editedDebt.note || ''}
              onChange={(e) =>
                setEditedDebt({...editedDebt, note: e.target.value})
              }
            />
            <TextField
              label={messages['invoice.value']}
              fullWidth
              margin='normal'
              type='number'
              value={editedDebt.value || 0}
              onChange={(e) =>
                setEditedDebt({
                  ...editedDebt,
                  value: parseFloat(e.target.value),
                })
              }
            />
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
              onClick={() => {
                onDelete(debt.id); // Assuming your debt objects have an 'id' property
              }}
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

DebtEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  debt: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired, // Add this line

};

export default DebtEditModal;

import React from 'react';
import { Modal, Button, Typography, Card, CardContent, CardActions, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  conversionRate,
  finalValue,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ minWidth: isMobile ? 300 : 400, m: 1, p: 2, boxSizing: 'border-box' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {intl.formatMessage({ id: 'confirmCheckCashing' })}
          </Typography>
          {conversionRate ? (
            <Typography>
              {intl.formatMessage({ id: 'checkWillBeConverted' }, { 
                conversionRate: <strong>{conversionRate}</strong>, 
                finalValue: <strong>{finalValue}</strong> 
              })}
            </Typography>
          ) : (
            <Typography>
              {intl.formatMessage({ id: 'areYouSureCashCheck' })}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button onClick={onClose} variant="outlined" sx={{ mr: 1 }}>
            {intl.formatMessage({ id: 'cancel' })}
          </Button>
          <Button onClick={onConfirm} variant="contained" color="primary">
            {intl.formatMessage({ id: 'confirm' })}
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  conversionRate: PropTypes.number,
  finalValue: PropTypes.number,
};

export default ConfirmationModal;

import React, {useState, useEffect} from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  ButtonGroup,
  CircularProgress,
  Alert,
} from '@mui/material';
import {DatePicker} from '@mui/lab';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import EventNoteIcon from '@mui/icons-material/EventNote';
import {GENERATE_INVOICE_PAYMENTS_DEBTS_QUERY} from 'query/orderReoprt/getOrder';
import {useLazyQuery} from '@apollo/client';

const InvoiceReportModal = ({open, onClose, invoiceType, debtorId, debtor}) => {
  console.log(debtorId);
  const [reportLanguage, setReportLanguage] = useState('ar');
  const [reportPeriod, setReportPeriod] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const {messages} = useIntl();
  const [loading, setLoading] = useState(false);
  const [generateInvoice, {data}] = useLazyQuery(
    GENERATE_INVOICE_PAYMENTS_DEBTS_QUERY,
  );
  const [error, setError] = useState(null); // For storing and displaying any errors
  useEffect(() => {
    // Example use of the data variable
    if (data) {
      console.log('');
      // Process your data here...
    }
  }, [data]);
  const handleGenerateReport = () => {
    setLoading(true);
    setError(null);
    // Adjust startDate to the beginning of the day (00:00:00)
    const adjustedStartDate = startDate
      ? new Date(startDate.setHours(0, 0, 0, 0))
      : undefined;
    // Adjust endDate to the end of the day (23:59:59)
    const adjustedEndDate = endDate
      ? new Date(endDate.setHours(23, 59, 59, 999))
      : undefined;

    const variables = {
      language: reportLanguage,
      reportType: invoiceType,
      reportPeriod: reportPeriod,
      // Assuming debtorId is provided as a prop
      debtorId: debtorId,
      startDate: adjustedStartDate ? adjustedStartDate.getTime() : undefined,
      endDate: adjustedEndDate ? adjustedEndDate.getTime() : undefined,
    };

    generateInvoice({variables})
      .then((response) => {
        const base64Excel =
          response.data.GenerateInvoicePaymentsDebts.downloadUrl;

        if (base64Excel) {
          const blob = new Blob(
            [Uint8Array.from(atob(base64Excel), (c) => c.charCodeAt(0))],
            {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
          );
          const blobURL = URL.createObjectURL(blob);
          const currentDate = new Date().toISOString().slice(0, 10);

          const tempLink = document.createElement('a');
          tempLink.href = blobURL;
          tempLink.download =
            `${invoiceType}_${debtor.name}_${currentDate}.xlsx`.replace(
              /[^a-zA-Z0-9-_.]/g,
              '_',
            );
          document.body.appendChild(tempLink);
          tempLink.click();
          document.body.removeChild(tempLink);

          URL.revokeObjectURL(blobURL);
        } else {
          console.error('Report data is missing or incorrect.');
        }
      })
      .catch((error) => {
        console.error('Error fetching reports:', error);
        setError(error);
      })

      .finally(() => {
        // Reset loading state after the request is completed (either success or failure)
        setLoading(false);
      });
  };

  const buttonStyle = (isActive) => ({
    backgroundColor: isActive ? '#1976d2' : '#fff',
    color: isActive ? '#fff' : '#1976d2',
    border: '1px solid #1976d2',
    '&:hover': {
      backgroundColor: isActive ? '#1976d2' : '#fff',
      borderColor: '#1976d2',
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          width: '90%',
          maxWidth: '400px',
        }}
      >
        <Typography variant='h6' gutterBottom>
          {messages['reports.datepicker.generate']} {messages[invoiceType]}
        </Typography>
        <FormControl fullWidth margin='normal'>
          <InputLabel>{messages['DuePeriod']}</InputLabel>
          <Select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            label={messages['DuePeriod']}
          >
            <MenuItem value='all'>{messages['common.all']}</MenuItem>
            <MenuItem value='byDate'>{messages['ByDate.genral']}</MenuItem>
          </Select>
        </FormControl>
        {reportPeriod === 'byDate' && (
          <>
            <DatePicker
              label={messages['sidebar.reports.startdate']}
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin='normal' />
              )}
            />
            <DatePicker
              label={messages['sidebar.reports.enddate']}
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin='normal' />
              )}
            />
          </>
        )}
        <Typography variant='subtitle1' sx={{mt: 2}}>
          {messages['ReportsLanguage']}
        </Typography>
        <ButtonGroup
          sx={{mt: 2}}
          variant='outlined'
          aria-label='outlined button group'
        >
          <Button
            sx={buttonStyle(reportLanguage === 'en')}
            onClick={() => setReportLanguage('en')}
          >
            {messages['English']}
          </Button>
          <Button
            sx={buttonStyle(reportLanguage === 'ar')}
            onClick={() => setReportLanguage('ar')}
          >
            {messages['Arabic']}
          </Button>
        </ButtonGroup>
        {error && (
          <Alert severity='error' sx={{mt: 2}}>
            {messages['Errorfetchingreports']} : {error.message}
          </Alert>
        )}
        <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 3}}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              variant='contained'
              color='primary'
              onClick={handleGenerateReport}
              startIcon={<EventNoteIcon />}
            >
              {messages['GenerateReport']}
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default InvoiceReportModal;
InvoiceReportModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  invoiceType: PropTypes.string.isRequired,
  debtorId: PropTypes.string.isRequired,
  debtor: PropTypes.object.isRequired,
};

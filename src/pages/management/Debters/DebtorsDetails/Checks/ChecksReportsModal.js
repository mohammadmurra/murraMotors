import React, {useState, useEffect} from 'react';
import {useIntl} from 'react-intl';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
  ButtonGroup,
} from '@mui/material';
import {MobileDateRangePicker} from '@mui/lab';
import EventNoteIcon from '@mui/icons-material/EventNote';
import {useLazyQuery} from '@apollo/client';
import { GENERATE_INVOICE_QUERY } from 'query/orderReoprt/getOrder';
import PropTypes from 'prop-types'; // Import PropTypes

const ChecksReportsModal = ({ invoiceType, debtorId }) => {
  console.log("modal");
  console.log(invoiceType);
  console.log(debtorId);

  const {messages} = useIntl();
  const [value, setValue] = useState([null, null]);
  const [reportType, setReportType] = useState('all');
  const [duePeriod, setDuePeriod] = useState('thisMonth');
  const [selectAll, setSelectAll] = useState(false);
  const [generateInvoice, {data}] = useLazyQuery(GENERATE_INVOICE_QUERY);
  const [error, setError] = useState(null); // For storing and displaying any errors
  const [loading, setLoading] = useState(false); // For indicating when the report is being generated
  const [reportLanguage, setReportLanguage] = useState('en'); // State for report language selection

  const handleSubmit = () => {
    // Reset the error state and indicate loading before starting a new request
    setError(null); // Assuming there's an error state defined with useState
    setLoading(true); // Assuming there's a loading state defined with useState

    const variables = {
        invoiceType,
        debtorId,
      reportType,
      startDateTimestamp: value[0] ? value[0].getTime() : 0,
      endDateTimestamp: value[1] ? value[1].getTime() : 0,
      duePeriod: selectAll ? 'All' : duePeriod,
      selectAll,
      language: reportLanguage, // Include the selected language in your query variables
    };

    generateInvoice({
      variables,
    })
      .then((response) => {
        const base64Excel = response.data.generateInvoice.downloadUrl;

        if (base64Excel) {
          const blob = new Blob(
            [Uint8Array.from(atob(base64Excel), (c) => c.charCodeAt(0))],
            {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
          );
          const blobURL = URL.createObjectURL(blob);

          const tempLink = document.createElement('a');
          tempLink.href = blobURL;
          tempLink.download = 'ChecksReport.xlsx';
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

  useEffect(() => {
    // Example use of the data variable
    if (data) {
      console.log('');
      // Process your data here...
    }
  }, [data]);
  const handleLanguageChange = (lang) => {
    setReportLanguage(lang);
  };

  // Custom styles for the active and inactive buttons
  const buttonStyle = (isActive) => ({
    backgroundColor: isActive ? '#1976d2' : '#fff',
    color: isActive ? '#fff' : '#1976d2',
    border: '1px solid #1976d2',
    '&:hover': {
      backgroundColor: isActive ? '#1976d2' : '#fff',
      borderColor: '#1976d2',
    },
  });
  useEffect(() => {
    // This useEffect now only updates the date range for non-"selectAll" scenarios
    // and is adjusted to work when the report type is "byDate" as well.
    if (!selectAll) {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      let newStart, newEnd;
      switch (duePeriod) {
        case 'thisMonth':
          newStart = startOfMonth;
          newEnd = endOfMonth;
          break;
        case 'lastTwoMonths':
          newStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          newEnd = endOfMonth;
          break;
        case 'lastThreeMonths':
          newStart = new Date(today.getFullYear(), today.getMonth() - 2, 1);
          newEnd = endOfMonth;
          break;
        default:
          // When "Custom" is selected, or any other value, we don't auto-adjust the date range
          // This allows the user to manually select a range via the date picker
          newStart = null;
          newEnd = null;
      }

      // Update the value only if duePeriod is not custom, ensuring manual date selection is retained
      if (duePeriod !== 'custom') {
        setValue([newStart, newEnd]);
      }
    } else {
      // Reset the value when "selectAll" is checked
      setValue([null, null]);
    }
  }, [duePeriod, selectAll]);

  const handleDateChange = (newValue) => {
    setSelectAll(false);
    setValue(newValue);
    setDuePeriod('custom'); // Set duePeriod to custom when date picker is changed
  };

  const shouldShowDuePeriodAndDatePicker =
    reportType === 'byDate' || reportType === 'rejected';

  return (
    <Card sx={{m: 3}}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {messages['sidebar.reports.checks']}
        </Typography>
        <FormControl fullWidth margin='normal'>
          <InputLabel id='report-type-label'>
            {messages['ReportType']}
          </InputLabel>
          <Select
            labelId='report-type-label'
            id='report-type-select'
            value={reportType}
            label='Report Type'
            onChange={(e) => {
              setReportType(e.target.value);
              if (selectAll) {
                setSelectAll(false);
              }
            }}
            
          >
            <MenuItem value='due'>{messages['DueDate']}</MenuItem>
            <MenuItem value='rejected'>{messages['RejectedChecks']}</MenuItem>
            <MenuItem value='byDate'>{messages['ByDate']}</MenuItem>
            <MenuItem value='all'>{messages['AllChecks']}</MenuItem>
          </Select>
        </FormControl>

        {shouldShowDuePeriodAndDatePicker && (
          <Box sx={{mt: 2}}>
            <FormControl fullWidth margin='normal'>
              <InputLabel id='due-period-label'>
                {messages['DuePeriod']}
              </InputLabel>
              <Select
                labelId='due-period-label'
                id='due-period-select'
                value={duePeriod}
                disabled={selectAll}
                label='Due Period'
                onChange={(e) => {
                  setSelectAll(false);
                  setDuePeriod(e.target.value);
                }}
              >
                <MenuItem value='thisMonth'>{messages['ThisMonth']}</MenuItem>
                <MenuItem value='lastTwoMonths'>
                  {messages['LastTwoMonths']}
                </MenuItem>
                <MenuItem value='lastThreeMonths'>
                  {messages['LastThreeMonths']}
                </MenuItem>
                <MenuItem value='custom'>{messages['Custom']}</MenuItem>
              </Select>
            </FormControl>

            <Typography variant='subtitle1' sx={{mt: 2}}>
              {messages['SelectDateRange']}
            </Typography>
            <MobileDateRangePicker
              disabled={selectAll}
              startText={messages['StartDate']}
              endText={messages['EndDate']}
              value={value}
              onChange={handleDateChange}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} margin='normal' />
                  <Box sx={{mx: 2}}> {messages['common.to']} </Box>
                  <TextField {...endProps} margin='normal' />
                </React.Fragment>
              )}
            />
            {reportType == 'rejected' ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectAll}
                    onChange={(e) => setSelectAll(e.target.checked)}
                  />
                }
                label={messages['common.all']}
              />
            ) : (
              ''
            )}
          </Box>
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
            onClick={() => handleLanguageChange('en')}
          >
            {messages['English']}
          </Button>
          <Button
            sx={buttonStyle(reportLanguage === 'ar')}
            onClick={() => handleLanguageChange('ar')}
          >
            {messages['Arabic']}
            
          </Button>
        </ButtonGroup>

        <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 3}}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmit}
              startIcon={<EventNoteIcon />}
            >
               {messages['GenerateReport']}
            </Button>
          )}

          {error && (
            <Alert severity='error' sx={{mt: 2}}>
             {messages['Errorfetchingreports']} : {error.message}
            </Alert>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChecksReportsModal;
// Define prop types for ChecksReportsModal
ChecksReportsModal.propTypes = {
  invoiceType: PropTypes.string.isRequired, // Specify that invoiceType is a required string
  debtorId: PropTypes.string.isRequired, // Specify that debtorId is a required string
};
import React, {useState, useEffect, useRef} from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Card,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useMutation} from '@apollo/client';
import {ADD_PAYMENT_MUTATION} from 'query/orderReoprt/getOrder';
import {useParams} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {useIntl} from 'react-intl';
import {firebase} from '@crema/services/auth/firebase/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
const AddPaymentPage = () => {
  const [user] = useAuthState(firebase.auth());
  const [addedBy, setAddedBy] = useState('');

  const location = useLocation();
  const {messages} = useIntl();
  // Parse the query string
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('Type');
  const {debtorId} = useParams(); // Extract debtorId from URL parameters
  const [currency, setCurrency] = useState('ILS');
  const [conversionRate, setConversionRate] = useState('');

  const cashValueRef = useRef(null);
  const checkValueRef = useRef(null);
  const [addPayment, {loading, error}] = useMutation(ADD_PAYMENT_MUTATION);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [paymentType, setPaymentType] = useState(type);
  const [checks, setChecks] = useState([]);
  const [debtorName, setDebtorName] = useState('');

  useEffect(() => {
    const fetchDebtorName = async () => {
      try {
        const debtorDoc = await firebase
          .firestore()
          .collection('Debtors')
          .doc(debtorId)
          .get();
        if (debtorDoc.exists) {
          setDebtorName(debtorDoc.data().name);
        }
      } catch (error) {
        console.error('Error fetching debtor:', error);
      }
    };

    if (debtorId) {
      fetchDebtorName();
    }
  }, [debtorId]);
  // Update useEffect to handle user changes
  useEffect(() => {
    if (user) {
      console.log(user);
      setAddedBy(user.name || user.email);
    }
  }, [user]);
  const [newCheck, setNewCheck] = useState({
    paymentType,
    ownerName: '',
    rejected: false,
    checkNumber: '',
    date: '',
    value: 0,
    gyro: false,
    gyroNames: [],
    linesInCheck: false,
    cashed: false,
    notes: '',
    currency: 'ILS',
  });
  const [gyroPersonName, setGyroPersonName] = useState('');
  const [cashValue, setCashValue] = useState('');
  const [cashDate, setCashDate] = useState('');
  const [cashNote, setCashNote] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState({
    ownerName: false,
    checkNumber: false,
    date: false,
    value: false,
    cashValue: false,
    cashDate: false,
    cashNote: false,
    gyroPersonName: false,
    notes: false,
  });
  const [editingCheckIndex, setEditingCheckIndex] = useState(null);

  // Function to reset form fields based on payment type
  const resetFormFields = () => {
    setSuccessMessage('');
    setErrorMessage('');
    if (paymentType === 'cash') {
      setCashValue('');
      setCashDate('');
      setCashNote('');
    } else if (paymentType === 'check') {
      setNewCheck({
        ownerName: '',
        checkNumber: '',
        date: '',
        value: 0,
        gyro: false,
        gyroNames: [],
        linesInCheck: false,
        cashed: false,
        rejected: false,
        notes: '',
      });
    }
    setCurrency('ILS'); // Reset currency for both cash and check entries
    setConversionRate(''); // Clear conversion rate for new entries
  };

  const renderConversionRateInput = () => {
    if (currency === 'USD') {
      return (
        <TextField
          fullWidth
          label={messages['ConversionRateFaild']}
          value={conversionRate}
          onChange={(e) => setConversionRate(e.target.value)}
          type='number'
          inputProps={{step: '0.01'}} // Allow decimal values
          margin='normal'
          helperText={
            errors.conversionRate && renderErrorText(errors.conversionRate)
          }
          error={errors.conversionRate}
          onWheel={(e) => e.target.blur()} // Prevents scrolling from changing the value
        />
      );
    }
    return null;
  };

  // useEffect to reset form fields when paymentType changes
  useEffect(() => {
    resetFormFields();
  }, [paymentType]);
  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        const message =
          'You have unsaved changes. Are you sure you want to leave?';
        e.returnValue = message;
        return message;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);
  useEffect(() => {
    const cashInputElement = cashValueRef.current;
    const checkInputElement = checkValueRef.current;

    const preventScrollChange = (event) => event.preventDefault();

    if (cashInputElement) {
      cashInputElement.addEventListener('wheel', preventScrollChange, {
        passive: false,
      });
    }
    if (checkInputElement) {
      checkInputElement.addEventListener('wheel', preventScrollChange, {
        passive: false,
      });
    }

    return () => {
      if (cashInputElement) {
        cashInputElement.removeEventListener('wheel', preventScrollChange);
      }
      if (checkInputElement) {
        checkInputElement.removeEventListener('wheel', preventScrollChange);
      }
    };
  }, []);

  const isFormValid = () => {
    let isValid = true;
    let newErrors = {
      ownerName: false,
      checkNumber: false,
      date: false,
      value: false,
      cashValue: false,
      cashDate: false,
      cashNote: false,
      gyroPersonName: false,
      notes: false,
      conversionRate: false, // Add conversionRate to the errors state
    };

    if (paymentType === 'check') {
      if (!newCheck.ownerName) {
        newErrors.ownerName = true;
        isValid = false;
      }
      if (!newCheck.checkNumber) {
        newErrors.checkNumber = true;
        isValid = false;
      } else if (!/^\d+$/.test(newCheck.checkNumber)) {
        newErrors.checkNumber = 'Check Number must be a number.';
        isValid = false;
      }
      if (!newCheck.date) {
        newErrors.date = true;
        isValid = false;
      }
      if (!newCheck.value) {
        newErrors.value = true;
        isValid = false;
      }
    } else if (paymentType === 'cash') {
      if (!cashValue) {
        newErrors.cashValue = true;
        isValid = false;
      }
      if (!cashDate) {
        newErrors.cashDate = true;
        isValid = false;
      }
    }

    if (currency === 'USD' && !conversionRate) {
      newErrors.conversionRate = true; // Validate conversion rate for USD checks
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const renderErrorText = (error) => {
    if (error) {
      return (
        <Typography variant='caption' color='error'>
          {typeof error === 'string' ? error : 'This field is required.'}
        </Typography>
      );
    }
    return null;
  };

  const handlePaymentTypeChange = (e) => {
    const newPaymentType = e.target.value;
    setPaymentType(newPaymentType);

    // Reset currency, conversion rate, and errors when changing payment type
    setCurrency('ILS');
    setConversionRate('');
    setErrors({
      ownerName: false,
      checkNumber: false,
      date: false,
      value: false,
      cashValue: false,
      cashDate: false,
      cashNote: false,
      gyroPersonName: false,
      notes: false,
    });

    // Additionally, if switching to 'cash', clear checks data
    if (newPaymentType === 'cash') {
      setChecks([]);
    }
  };

  // method to handle currency changes
  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    setCurrency(newCurrency);
    if (newCurrency === 'ILS') {
      setConversionRate(''); // Reset conversion rate if currency is not USD
    }
  };
  const handleCheckChange = (e) => {
    const {name, value, checked, type} = e.target;
    setNewCheck((prevNewCheck) => ({
      ...prevNewCheck,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'gyro' && !checked && {gyroNames: []}),
    }));
    setIsDirty(true);
  };

  const handleCashChange = (e) => {
    const {name, value} = e.target;
    if (name === 'cashValue') {
      setCashValue(value);
    } else if (name === 'cashDate') {
      setCashDate(value);
    } else if (name === 'cashNote') {
      setCashNote(value);
    }
    setIsDirty(true);
  };

  const handleGyroPersonNameChange = (e) => {
    setGyroPersonName(e.target.value);
  };

  const addGyroPersonName = () => {
    if (!gyroPersonName.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        gyroPersonName: true,
      }));
    } else {
      setNewCheck((prevNewCheck) => ({
        ...prevNewCheck,
        gyroNames: [...prevNewCheck.gyroNames, gyroPersonName],
      }));
      setGyroPersonName('');
      setErrors((prevErrors) => ({
        ...prevErrors,
        gyroPersonName: false,
      }));
    }
  };

  const addCheck = () => {
    if (isFormValid()) {
      const checkToAdd = {
        ...newCheck,
        currency: currency,
        conversionRate:
          currency === 'USD' ? parseFloat(conversionRate) || 0 : null, // Correctly handle conversion rate
      };
      setChecks((prevChecks) => [...prevChecks, checkToAdd]);

      // Reset the form for the next new check entry
      setNewCheck({
        ownerName: '',
        checkNumber: '',
        date: '',
        value: 0,
        gyro: false,
        gyroNames: [],
        linesInCheck: false,
        cashed: false,
        rejected: false,
        notes: '',
        currency: 'ILS', // Reset within newCheck if applicable
      });

      setCurrency('ILS'); // Reset currency to ILS for new check entry
      setConversionRate(''); // Clear conversion rate for new check entry
    }
  };
  const calculateTotalValue = () => {
    const totals = {USD: 0, ILS: 0};

    checks.forEach((check) => {
      if (check.currency === 'USD') {
        totals.USD += Number(check.value);
      } else if (check.currency === 'ILS') {
        totals.ILS += Number(check.value);
      }
    });

    return totals;
  };

  const handleSubmitPayment = async () => {
    setSuccessMessage('');

    try {
      let paymentData;
      if (paymentType === 'cash') {
        if (!isFormValid()) return;
        const cashTimestamp = new Date(cashDate).getTime();
        paymentData = {
          debtorId,
          paymentType: 'cash',
          cashPayment: {
            value: parseFloat(cashValue),
            date: cashTimestamp.toString(),
            note: cashNote,
            addedBy: addedBy,
            currency, // Ensure currency is included correctly
            conversionRate:
              currency === 'USD' ? parseFloat(conversionRate) : null, // Include conversionRate if currency is USD
          },
          checks: [], // Provide an empty array for checks
        };
      } else if (paymentType === 'check') {
        if (checks.length === 0) {
          alert(messages['PleaseAddAtLeastOneCheck']);
          return;
        }
        const checksWithTimestamp = checks.map((check) => ({
          ...check,
          ownerName: check.ownerName.trim(), // Trim whitespace from ownerName
          date: new Date(check.date).getTime().toString(),
          value: parseFloat(check.value),
          checkFrom: debtorName,
          addedBy: addedBy,
          checkFromId: debtorId,
          currency: check.currency, // Retain each check's currency
          conversionRate:
            check.currency === 'USD'
              ? parseFloat(check.conversionRate) || 0
              : null, // Retain conversion rate for USD checks
          editedBy: '',
        }));
        paymentData = {
          debtorId,
          paymentType: 'check',
          checks: checksWithTimestamp,
        };
      }

      console.log(paymentData);
      const response = await addPayment({variables: {input: paymentData}});
      console.log('Payment added:', response.data);

      if (response && response.data && response.data.addPayment.success) {
        // Adjust according to your actual response structure
        setSuccessMessage(messages['PaymentSuccessfullyAdded']);
      } else if (
        response &&
        response.data &&
        !response.data.addPayment.success &&
        response.data.addPayment.code == 5
      ) {
        setSuccessMessage(messages['PaymentExist']);
      }

      setIsDirty(false);
    } catch (error) {
      console.error('Error adding payment:', error);
      setErrorMessage(error.message);
    }
  };

  const deleteCheck = (index) => {
    setChecks((prevChecks) => prevChecks.filter((_, i) => i !== index));
  };

  const editCheck = (index) => {
    const checkToEdit = checks[index];
    setNewCheck(checkToEdit);
    setCurrency(checkToEdit.currency); // Ensure currency is set when editing a check
    setEditingCheckIndex(index);
  };

  const saveEditedCheck = () => {
    if (isFormValid()) {
      const updatedCheck = {
        ...newCheck,
        currency: currency, // Ensure currency is correctly updated
        conversionRate:
          currency === 'USD' ? parseFloat(conversionRate) || 0 : null, // Ensure conversion rate is correctly updated
        // Correctly handle conversion rate
      };
      const updatedChecks = checks.map((check, index) =>
        index === editingCheckIndex ? updatedCheck : check,
      );
      setChecks(updatedChecks);
      resetFormFields(); // Reset form fields after editing
      setEditingCheckIndex(null); // Reset editing index
    }
  };

  const removeGyroName = (index) => {
    setNewCheck((prevNewCheck) => ({
      ...prevNewCheck,
      gyroNames: prevNewCheck.gyroNames.filter((_, i) => i !== index),
    }));
  };

  const renderGyroNameField = (name, index) => {
    return (
      <Box key={index} display='flex' alignItems='center' mb={1}>
        <TextField
          fullWidth
          label={messages['GyroPersonName']}
          value={name}
          disabled
          error={errors.gyroPersonName}
          helperText={
            errors.gyroPersonName && messages['CannotAddEmptyGyroName']
          }
        />
        <IconButton onClick={() => removeGyroName(index)}>
          <CloseIcon />
        </IconButton>
      </Box>
    );
  };

  const renderChecksForm = () => {
    return (
      <Card sx={{p: 2, mb: 2}}>
        <Typography variant='subtitle1' marginBottom={'1rem'}>
          {messages['CheckDetails']}
        </Typography>
        <Typography variant='body1'>{messages['OwnerName']}</Typography>
        <TextField
          fullWidth
          placeholder={messages['OwnerName']}
          name='ownerName'
          value={newCheck.ownerName}
          onChange={handleCheckChange}
          helperText={errors.ownerName && renderErrorText(errors.ownerName)}
          error={errors.ownerName}
        />
        <Typography marginTop={'1rem'} variant='body1'>
          {messages['CheckNumber']}
        </Typography>
        <TextField
          fullWidth
          placeholder={messages['CheckNumber']}
          name='checkNumber'
          value={newCheck.checkNumber}
          onChange={handleCheckChange}
          helperText={errors.checkNumber && renderErrorText(errors.checkNumber)}
          error={errors.checkNumber}
        />
        <Typography marginTop={'1rem'} variant='body1'>
          {messages['CheckDate']}
        </Typography>
        <TextField
          fullWidth
          name='date'
          type='date'
          value={newCheck.date}
          onChange={handleCheckChange}
          helperText={errors.date && renderErrorText(errors.date)}
          error={errors.date}
        />
        <Typography marginTop={'1rem'} variant='body1'>
          {messages['invoice.value']}
        </Typography>
        <TextField
          fullWidth
          name='value'
          type='number'
          value={newCheck.value}
          onChange={handleCheckChange}
          helperText={errors.value && renderErrorText(errors.value)}
          error={errors.value}
          inputRef={checkValueRef}
        />
        <Typography marginTop={'1rem'} variant='body1'>
          {messages['currency']}
        </Typography>
        {renderCurrencySelector()}
        {renderConversionRateInput()} {/* Call the function here */}
        <Typography marginTop={'1rem'} variant='body1'>
          {messages['common.general.notes']}
        </Typography>
        <TextField
          fullWidth
          name='notes'
          placeholder={messages['EnterNotesHere']}
          value={newCheck.notes}
          onChange={handleCheckChange}
          error={errors.notes}
          helperText={errors.notes && renderErrorText(errors.notes)}
          multiline
          rows={4}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={newCheck.gyro}
                onChange={handleCheckChange}
                name='gyro'
              />
            }
            label={messages['CheckGyro']}
          />
          {newCheck.gyro && (
            <Box>
              {newCheck.gyroNames.map(renderGyroNameField)}
              <Box display='flex' alignItems='center'>
                <TextField
                  fullWidth
                  label='Add Gyro Name'
                  value={gyroPersonName}
                  onChange={handleGyroPersonNameChange}
                  margin='normal'
                />
                <Button onClick={addGyroPersonName}>+</Button>
              </Box>
            </Box>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={newCheck.linesInCheck}
                onChange={handleCheckChange}
                name='linesInCheck'
              />
            }
            label={messages['LinesInCheck']}
          />
        </FormGroup>
        <Button
          variant='contained'
          onClick={editingCheckIndex != null ? saveEditedCheck : addCheck}
        >
          {editingCheckIndex != null
            ? messages['common.saveChanges']
            : messages['AddCheck']}
        </Button>
      </Card>
    );
  };
  const renderCurrencySelector = () => (
    <FormControl fullWidth margin='normal'>
      <InputLabel>{messages['Currency']}</InputLabel>
      <Select
        value={currency}
        onChange={handleCurrencyChange}
        label={messages['Currency']}
      >
        <MenuItem value='ILS'>ILS</MenuItem>
        {paymentType === 'check' && <MenuItem value='USD'>USD</MenuItem>}
      </Select>
    </FormControl>
  );

  const renderCashForm = () => {
    return (
      <Card sx={{p: 2, mb: 2}}>
        <Typography variant='subtitle1' marginBottom={'1rem'}>
          {messages['CashPaymentDetails']}
        </Typography>
        <Typography marginTop={'1rem'} variant='body1'>
          {messages['CashValue']}
        </Typography>
        <TextField
          fullWidth
          placeholder={messages['CashValue']}
          name='cashValue'
          value={cashValue}
          onChange={handleCashChange}
          helperText={errors.cashValue && renderErrorText(errors.cashValue)}
          error={errors.cashValue}
          type='number' // Set input type to number
          inputProps={{min: 0}} // Optional: Set minimum value to 0
          inputRef={cashValueRef}

          // You can add additional inputProps as needed
        />
        <Typography marginTop={'1rem'} variant='body1'>
          {messages['currency']}
        </Typography>
        {renderCurrencySelector()}
        {renderConversionRateInput()} {/* Call the function here */}
        <Typography marginTop={'1rem'} variant='body1'>
          {messages['CashDate']}
        </Typography>
        <TextField
          fullWidth
          name='cashDate'
          type='date'
          value={cashDate}
          onChange={handleCashChange}
          helperText={errors.cashDate && renderErrorText(errors.cashDate)}
          error={errors.cashDate}
        />
        <Typography marginTop={'1rem'} variant='body1'>
          {messages['CashNote']}
        </Typography>
        <TextField
          fullWidth
          placeholder={messages['EnterNotesHere']}
          name='cashNote'
          value={cashNote}
          onChange={handleCashChange}
          helperText={errors.cashNote && renderErrorText(errors.cashNote)}
          error={errors.cashNote}
          multiline
          rows={4}
        />
      </Card>
    );
  };

  const renderCheckDetails = (check, index) => {
    const valueAsNumber = parseFloat(check.value); // Ensure it's treated as a number
    const valueInILS =
      check.currency === 'USD' && check.conversionRate
        ? (valueAsNumber * parseFloat(check.conversionRate)).toFixed(2) // Also ensure conversionRate is a number
        : valueAsNumber.toFixed(2);
    return (
      <Card key={index} sx={{p: 2, mb: 2}}>
        <Typography variant='subtitle1'>
          {messages['Check']} #{index + 1}
        </Typography>
        <Typography>
          {messages['OwnerName']}: {check.ownerName}
        </Typography>
        <Typography>
          {messages['CheckNumber']}: {check.checkNumber}
        </Typography>
        <Typography>
          {messages['common.date']}: {check.date}
        </Typography>
        <Typography>
          {messages['invoice.value']}: {check.value}
        </Typography>
        <Typography>
          {messages['currency']}: {check.currency}
        </Typography>
        {check.currency === 'USD' ? (
          <Typography>
            {messages['invoice.valueInIls']}: {valueInILS} ILS
          </Typography>
        ) : (
          ''
        )}
        <Typography>
          {messages['common.general.notes']}: {check.notes}
        </Typography>
        <Typography>
          {messages['CheckGyro']}: {check.gyro ? 'Yes' : 'No'}
        </Typography>
        {check.gyro && check.gyroNames && (
          <Typography>
            {messages['GyroNames']}: {check.gyroNames.join(', ')}
          </Typography>
        )}
        <Typography>
          {messages['LinesInCheck']}:{' '}
          {check.linesInCheck ? messages['common.yes'] : messages['common.no']}
        </Typography>
        <Box display='flex' justifyContent='space-between'>
          <IconButton onClick={() => editCheck(index)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteCheck(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>
    );
  };

  const renderChecksSummary = () => {
    const {USD, ILS} = calculateTotalValue();
    const totalChecks = checks.length;
    return (
      <Card sx={{p: 2, mb: 2}}>
        <Typography variant='subtitle1'>{messages['ChecksSummary']}</Typography>
        <Typography>
          {messages['TotalNumberOfChecks']}: {totalChecks}
        </Typography>
        <Typography>
          {messages['TotalValueILS']}: {ILS} ILS
        </Typography>
        <Typography>
          {messages['TotalValueUSD']}: {USD} USD
        </Typography>
      </Card>
    );
  };

  return (
    <Box sx={{p: 4}}>
      <Card sx={{p: 2, mb: 2}}>
        <Typography variant='h4' mb={2}>
          {messages['AddNewPayment']}
        </Typography>
        <FormControl fullWidth margin='normal'>
          <InputLabel>{messages['PaymentType']}</InputLabel>
          <Select
            name='paymentType'
            value={paymentType}
            onChange={handlePaymentTypeChange}
            label='Payment Type'
          >
            <MenuItem value='cash'>{messages['Cash']}</MenuItem>
            <MenuItem value='check'>{messages['Check']}</MenuItem>
          </Select>
        </FormControl>
      </Card>

      {paymentType === 'cash' && renderCashForm()}
      {paymentType === 'check' && renderChecksForm()}

      {/* Display Added Checks */}
      {paymentType === 'check' &&
        checks.map((check, index) => renderCheckDetails(check, index))}

      {/* Check Payment Summary */}
      {paymentType === 'check' && renderChecksSummary()}

      {/* Success message */}
      {successMessage && (
        <Typography variant='subtitle1' color='primary'>
          {successMessage}
        </Typography>
      )}

      {/* Error message */}
      {error && (
        <Typography variant='subtitle1' color='error'>
          {errorMessage}
        </Typography>
      )}

      {/* Submit Payment Button */}
      <Button
        variant='contained'
        color='primary'
        onClick={handleSubmitPayment}
        disabled={(paymentType === 'check' && checks.length === 0) || loading}
        sx={{mt: 2}}
      >
        {loading ? messages['Processing'] : messages['SubmitPayment']}
      </Button>
    </Box>
  );
};

export default AddPaymentPage;

import React, {useState, useEffect, useCallback} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {firebase} from '@crema/services/auth/firebase/firebase'; // Adjust this import based on your project structure
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Alert,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {Fonts} from 'shared/constants/AppEnums'; // Adjust this import based on your project structure
import {useIntl} from 'react-intl';
import {useAuthState} from 'react-firebase-hooks/auth';
import ConfirmationModal from './ConfirmationModal';
import CheckDeleteModal from './checkDeleteModal';
const IssuedCheckDetails = () => {
  const [user] = useAuthState(firebase.auth());
  const [editedBy, setEditedBy] = useState('');
  const {checkId} = useParams();
  const navigate = useNavigate();
  // Update useEffect to handle user changes
  useEffect(() => {
    if (user) {
      setEditedBy(user.name || user.email);
    }
  }, [user]);
  const [editedCheck, setEditedCheck] = useState({
    cashed: false,
    checkNumber: '',
    date: '',
    gyro: false,
    gyroNames: [''],
    linesInCheck: false,
    notes: '',
    ownerName: '',
    rejected: false,
    value: 0,
    addedBy: '', // added field
    editedBy: '', // added field
    currency: 'ILS',
    conversionRate: '', // Add conversionRate here
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [editModeWarning, setEditModeWarning] = useState(false);
  const {messages} = useIntl();
  const [modalOpen, setModalOpen] = useState(false);
  const [conversionDetails, setConversionDetails] = useState({
    conversionRate: null,
    finalValue: null,
  });
  const [updateError, setUpdateError] = useState('');
  const [initialCheck, setInitialCheck] = useState(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showEnterEditMode, setShowEnterEditMode] = useState('');
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
    conversionRate: false, // Add conversionRate here for error handling
  });

  // Function to validate input fields
  const validateField = (name, value) => {
    let error = false;

    // Add validation condition for conversionRate
    if (name === 'conversionRate' && editedCheck.currency === 'USD' && !value) {
      error = true;
    } else if (name === 'checkNumber' && !value) {
      error = true;
    } else if (name === 'ownerName' && !value) {
      error = true;
    } else if (name === 'date' && !value) {
      error = true;
    } else if (name === 'value' && (isNaN(value) || value <= 0)) {
      error = true;
    }

    setErrors((prevState) => ({...prevState, [name]: error}));
    return !error; // Return true if no error (valid), false otherwise
  };

  const loadCheckDetails = useCallback(async () => {
    try {
      setLoading(true);
      const db = firebase.firestore();
      const checkDoc = await db.collection('issuedChecks').doc(checkId).get();
      if (checkDoc.exists) {
        const checkData = checkDoc.data();
        setEditedCheck(checkData);
        setInitialCheck(checkData); // Store the initial state
      } else {
        console.log('Check not found');
      }
    } catch (error) {
      console.error('Error fetching check details:', error);
      setUpdateError('Error fetching check details');
    } finally {
      setLoading(false);
    }
  }, [checkId]);

  useEffect(() => {
    loadCheckDetails();
  }, [loadCheckDetails]);

  const handleOpenModal = () => {
    if (editedCheck.currency === 'USD') {
      const rate = parseFloat(editedCheck.conversionRate);
      const finalValue = editedCheck.value * rate;
      setConversionDetails({
        conversionRate: rate,
        finalValue: finalValue.toFixed(2),
      });
    }
    setModalOpen(true);
  };
  const handleConfirm = async () => {
    // Close the modal first
    handleCloseModal();

    // Proceed with check update logic, maybe calling handleUpdateCheck or embedding its logic here
    handleUpdateCheck();
  };

  // Ensure to handle modal close action
  const handleCloseModal = () => {
    setModalOpen(false);
    // Update the editedCheck state to uncheck the "Cashed" checkbox
    setEditedCheck((prevState) => ({
      ...prevState,
      cashed: false,
    }));
  };

  const handleInputChange = (e) => {
    const {name, value, type, checked} = e.target;

    if (type === 'checkbox') {
      setEditedCheck((prevState) => ({
        ...prevState,
        [name]: checked,
        editedBy: editedBy || (user ? user.name || user.email : ''),
      }));
    } else if (type === 'date') {
      // Convert yyyy-mm-dd to timestamp adjusting for timezone offset
      const parts = value.split('-');
      const timestamp = Date.UTC(parts[0], parts[1] - 1, parts[2]);

      setEditedCheck((prevState) => ({
        ...prevState,
        [name]: timestamp,
        editedBy: editedBy || (user ? user.name || user.email : ''),
      }));
    } else {
      setEditedCheck((prevState) => ({
        ...prevState,
        [name]: name === 'conversionRate' && value ? parseFloat(value) : value,
        editedBy: editedBy || (user ? user.name || user.email : ''),
      }));
    }

    validateField(name, type === 'checkbox' ? checked : value);
  };

  const renderErrorText = (error) => {
    if (error) {
      return <Typography color='error'>This field is required</Typography>;
    }
    return null;
  };
  const handleShowMessage = () => {
    setEditModeWarning(true);
    setShowEnterEditMode(
      messages['Please_enter_edit_mode_to_update_information'],
    );
  };
  const handleGyroNameChange = (index, value) => {
    const newGyroNames = [...editedCheck.gyroNames];
    newGyroNames[index] = value;
    setEditedCheck({...editedCheck, gyroNames: newGyroNames});
  };

  const addGyroNameField = () => {
    setEditedCheck({...editedCheck, gyroNames: [...editedCheck.gyroNames, '']});
  };

  const handleUpdateCheck = async () => {
    try {
      setLoading(true);
      const db = firebase.firestore();

      await db.collection('issuedChecks').doc(checkId).update(editedCheck);

      setUpdateSuccess(true);
    } catch (error) {
      console.error('Error updating check:', error);
      setUpdateError('Failed to update check details');
    } finally {
      setLoading(false);
      setTimeout(() => setUpdateSuccess(false), 5000);
      setEditMode(false);
    }
  };
  const handleDeleteCheckPrompt = () => {
    setShowDeleteConfirmModal(true);
  };
  const handleCancelDelete = () => {
    setShowDeleteConfirmModal(false);
  };
  const handleButtonClick = () => {
    if (editMode) {
      // Assume all fields need validation
      const fieldsToValidate = ['checkNumber', 'ownerName', 'date', 'value'];

      // Include conversionRate in validation if currency is USD
      if (editedCheck.currency === 'USD') {
        fieldsToValidate.push('conversionRate');
      }

      const isValid = fieldsToValidate.every((field) =>
        validateField(field, editedCheck[field]),
      );

      if (!isValid) {
        // Prevent saving and possibly show a message to the user
        console.error('Please correct the errors before saving.');
        return;
      }

      // If cashed is checked and the currency is USD, handle the conversion details
      if (editedCheck.cashed && editedCheck.currency === 'USD') {
        handleOpenModal();
      } else {
        // Proceed with the update if the conversion modal isn't needed
        handleUpdateCheck();
      }
    } else {
      // Enter edit mode if not already in edit mode
      setEditMode(true);
    }
    setEditModeWarning(false);
  };

  const formatDateForDisplay = (timestamp) => {
    return timestamp ? new Date(parseInt(timestamp)).toLocaleDateString() : '';
  };

  const formatDateForInput = (timestamp) => {
    return timestamp
      ? new Date(parseInt(timestamp)).toISOString().split('T')[0]
      : '';
  };
  const handleDeleteCheck = async () => {
    try {
      setLoading(true);

      // Then, delete the check from the 'Checks' collection
      await firebase
        .firestore()
        .collection('issuedChecks')
        .doc(checkId)
        .delete();

      // Optionally, navigate back or show a success message
      navigate(-1); // Navigate back to the previous page or to a specific route
      // Or set a state variable to show a success message/alert
    } catch (error) {
      console.error('Error deleting check:', error);
      // Optionally, set a state variable to show an error message/alert
    } finally {
      setLoading(false);
    }
  };
  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    let conversionRateReset = '';
    if (newCurrency === 'USD') {
      // Set a default or keep existing, ensuring it's validated if required.
      conversionRateReset = editedCheck.conversionRate;
    }

    setEditedCheck((prevState) => ({
      ...prevState,
      currency: newCurrency,
      conversionRate: conversionRateReset,
      editedBy: editedBy,
    }));

    // Trigger validation for conversionRate when currency changes to USD
    if (newCurrency === 'USD') {
      validateField('conversionRate', conversionRateReset);
    }
  };

  const renderConversionRateField = () => {
    // Only show conversion rate field if currency is USD
    if (editedCheck.currency === 'USD' && editMode) {
      return (
        <>
          <Typography
            sx={{fontWeight: Fonts.BOLD, color: 'text.secondary', mb: 0.5}}
          >
            {messages['ConversionRateFaild']}:
          </Typography>
          <TextField
            fullWidth
            label={messages['ConversionRateField']}
            value={editedCheck.conversionRate}
            onChange={(e) => handleInputChange(e)}
            name='conversionRate'
            type='number'
            placeholder={messages['ConversionRateField']}
            inputProps={{step: '0.01'}}
            margin='normal'
            helperText={
              errors.conversionRate && renderErrorText(errors.conversionRate)
            }
            error={errors.conversionRate}
            onWheel={(e) => e.target.blur()} // Prevents scrolling from changing the value
          />
        </>
      );
    } else if (editedCheck.currency === 'USD' && !editMode) {
      return (
        <Grid item xs={12} sm={6}>
          <Box sx={{mb: 2}}>
            <Typography
              sx={{fontWeight: Fonts.BOLD, color: 'text.secondary', mb: 0.5}}
            >
              {messages['ConversionRateFaild']}:
            </Typography>
            <Typography
              variant='body1'
              sx={{fontWeight: Fonts.MEDIUM, color: 'text.primary'}}
            >
              {editedCheck.conversionRate}
            </Typography>
          </Box>
        </Grid>
      );
    }

    // If the currency is not USD, return null to not render the field
    return null;
  };

  const renderField = (label, value, name, isTextArea = false) => {
    if (editMode) {
      // In edit mode, check if the field is the date field
      if (name === 'date') {
        return (
          <TextField
            label={label}
            type='date'
            value={formatDateForInput(editedCheck.date)}
            name={name}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            InputLabelProps={{shrink: true}}
          />
        );
      } else if (name === 'currency') {
        // Render date picker for the date field
        return (
          <FormControl fullWidth margin='normal'>
            <InputLabel>{messages['Currency']}</InputLabel>
            <Select
              value={value}
              onChange={handleCurrencyChange}
              label={messages['Currency']}
            >
              <MenuItem value='ILS'>ILS</MenuItem>
              <MenuItem value='USD'>USD</MenuItem>
            </Select>
          </FormControl>
        );
      } else if (name === 'conversionRate') {
        return (
          <TextField
            fullWidth
            label={messages['ConversionRateField']}
            value={editedCheck.conversionRate}
            onChange={handleInputChange}
            name='conversionRate'
            type='number'
            inputProps={{step: '0.01'}}
            margin='normal'
            helperText={
              errors.conversionRate && renderErrorText(errors.conversionRate)
            }
            error={errors.conversionRate}
            onWheel={(e) => e.target.blur()} // Prevents scrolling from changing the value
          />
        );
      } else {
        // Render text field or text area for other fields
        return (
          <TextField
            label={label}
            value={value}
            name={name}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            multiline={isTextArea}
            rows={isTextArea ? 4 : 1}
          />
        );
      }
    } else {
      // In read-only mode, display the value as text
      return (
        <Grid item xs={12} sm={6}>
          <Box sx={{mb: 2}}>
            <Typography
              sx={{fontWeight: Fonts.BOLD, color: 'text.secondary', mb: 0.5}}
            >
              {label}:
            </Typography>
            <Typography
              variant='body1'
              sx={{fontWeight: Fonts.MEDIUM, color: 'text.primary'}}
            >
              {name === 'date' ? formatDateForDisplay(value) : value}
            </Typography>
          </Box>
        </Grid>
      );
    }
  };

  const navigateBack = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    setEditedCheck(initialCheck); // Revert to initial state
    setEditMode(false); // Exit edit mode
  };

  return (
    <>
      <Box sx={{padding: 2, height: '100%'}}>
        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
          <CardContent sx={{flex: '1 0 auto'}}>
            <Typography variant='h5' mb={4} sx={{fontWeight: Fonts.BOLD}}>
              {messages['CheckDetails']}{' '}
            </Typography>

            {loading ? (
              <CircularProgress />
            ) : (
              <form noValidate autoComplete='off'>
                <Grid container spacing={2}>
                  {renderField(
                    messages['CheckNumber'],
                    editedCheck.checkNumber,
                    'checkNumber',
                  )}
                  {errors.checkNumber && renderErrorText(errors.checkNumber)}

                  {renderField(
                    messages['OwnerName'],
                    editedCheck.ownerName,
                    'ownerName',
                  )}
                  {errors.ownerName && renderErrorText(errors.ownerName)}

                  {renderField(
                    messages['invoice.value'],
                    editedCheck.value,
                    'value',
                  )}
                  {renderField(
                    messages['currency'],
                    editedCheck.currency,
                    'currency',
                  )}
                  {renderConversionRateField()}

                  {errors.value && renderErrorText(errors.value)}
                  {renderField(
                    messages['common.date'],
                    editedCheck.date,
                    'date',
                    true,
                  )}
                  {errors.date && renderErrorText(errors.date)}
                  {!editedCheck.notes && !editMode
                    ? null
                    : renderField(
                        messages['common.general.notes'],
                        editedCheck.notes,
                        'notes',
                        true,
                      )}

                  {errors.checkNumber && renderErrorText(errors.notes)}

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={editedCheck.linesInCheck}
                          onChange={
                            editMode ? handleInputChange : handleShowMessage
                          }
                          name='linesInCheck'
                        />
                      }
                      label={messages['LinesInCheck']}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={editedCheck.gyro}
                          onChange={
                            editMode ? handleInputChange : handleShowMessage
                          }
                          name='gyro'
                        />
                      }
                      label={messages['CheckGyro']}
                    />
                  </Grid>
                  {editMode &&
                    editedCheck.gyro &&
                    editedCheck.gyroNames.map((name, index) => (
                      <Grid item xs={12} key={index}>
                        <TextField
                          label={`${messages['GyroNames']} ${index + 1}`}
                          value={name}
                          onChange={(e) =>
                            handleGyroNameChange(index, e.target.value)
                          }
                          fullWidth
                          margin='normal'
                        />
                      </Grid>
                    ))}
                  {editMode && editedCheck.gyro && (
                    <Grid item xs={12}>
                      <Button variant='outlined' onClick={addGyroNameField}>
                        {messages['AddGyroName']}
                      </Button>
                    </Grid>
                  )}
                  {!editMode &&
                    editedCheck.gyro &&
                    editedCheck.gyroNames.map((name, index) => (
                      <Grid item xs={12} key={index}>
                        <Typography
                          sx={{
                            fontWeight: Fonts.BOLD,
                            color: 'text.secondary',
                            mb: 0.5,
                          }}
                        >
                          {messages['GyroNames']}
                          {index + 1} :
                        </Typography>
                        <Typography fullWidth margin='normal'>
                          {name}
                        </Typography>
                      </Grid>
                    ))}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={editedCheck.cashed}
                          onChange={
                            editMode ? handleInputChange : handleShowMessage
                          }
                          name='cashed'
                        />
                      }
                      label={messages['Cashed']}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={editedCheck.rejected}
                          onChange={
                            editMode ? handleInputChange : handleShowMessage
                          }
                          name='rejected'
                        />
                      }
                      label={messages['Rejected']}
                    />
                  </Grid>
                  {/* Render addedBy and editedBy information */}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography
                        variant='body1'
                        sx={{fontWeight: Fonts.MEDIUM, mt: 2}}
                      >
                        {messages['addedBy']}: {editedCheck.addedBy}
                      </Typography>
                    </Grid>
                    {editedCheck.editedBy && (
                      <Grid item xs={12}>
                        <Typography
                          variant='body1'
                          sx={{fontWeight: Fonts.MEDIUM}}
                        >
                          {messages['editedBy']}: {editedCheck.editedBy}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>

                {updateSuccess && (
                  <Alert severity='success'>
                    {messages['Updatesuccessful']}
                  </Alert>
                )}
                {editModeWarning && (
                  <Alert severity='warning'>{showEnterEditMode}</Alert>
                )}
                {updateError && <Alert severity='error'>{updateError}</Alert>}
                <Box
                  mt={2}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between', // This spreads out the content between the sides
                  }}
                >
                  {editMode ? (
                    <Button
                      variant='contained'
                      color='error' // This makes the button red
                      onClick={handleDeleteCheckPrompt}
                    >
                      {messages['DeleteCheck']}
                    </Button>
                  ) : (
                    ''
                  )}

                  {/* Conditional rendering based on editMode */}
                  <Box>
                    {editMode ? (
                      <>
                        {/* Cancel button when in edit mode */}
                        <Button
                          variant='outlined'
                          color='primary'
                          onClick={handleCancel} // Call handleCancel to revert changes
                          sx={{mr: 2}} // Add margin to separate the buttons
                        >
                          {messages['common.cancel']}
                        </Button>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={handleButtonClick}
                        >
                          {messages['common.saveChanges']}
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* Back button when not in edit mode */}
                        <Button
                          variant='outlined'
                          color='primary'
                          onClick={navigateBack}
                          sx={{mr: 2}} // Ensure this button also has margin if needed
                        >
                          {messages['common.back']}
                        </Button>
                        <Button
                          variant='outlined'
                          color='primary'
                          onClick={handleButtonClick}
                        >
                          {messages['common.edit']}
                        </Button>
                      </>
                    )}
                  </Box>
                </Box>
              </form>
            )}
          </CardContent>
        </Card>
      </Box>
      <ConfirmationModal
        open={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        conversionRate={conversionDetails.conversionRate}
        finalValue={conversionDetails.finalValue}
      />
      <CheckDeleteModal
        open={showDeleteConfirmModal}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteCheck}
      />
    </>
  );
};

export default IssuedCheckDetails;

import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Modal,
  TextField,
  IconButton,
  Alert,
} from '@mui/material';
import {firebase} from '@crema/services/auth/firebase/firebase';
import {Fonts} from 'shared/constants/AppEnums';
import {useIntl} from 'react-intl';
import PaymentsList from './Payemnts/PaymentsList';
import {useNavigate} from 'react-router-dom';
import ChacksList from './Checks/ChacksList';
import DebtsList from './Debts/DebtsList';
import {DatePicker} from '@mui/lab';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ChecksReportsModal from './Checks/ChecksReportsModal';
import ConfirmationDeleteHistoryModal from './DeleteHistoryModal';
import InvoiceReportModal from './InvoiceReportModal';

const DebtorsDetails = () => {
  const {debtorId} = useParams(); // Extract debtorId from URL parameters
  const [debtor, setDebtor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {messages} = useIntl();
  const navigation = useNavigate();
  const [loadingModal, setLoadingModal] = useState(false);
  const [showClearHistoryConfirmModal, setShowClearHistoryConfirmModal] =
    useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [currentInvoiceType, setCurrentInvoiceType] = useState('');
  const [currentDebtorId, setCurrentDebtorId] = useState('');
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecksModalOpen, setIsChecksModalOpen] = useState(false);
  // Add to DebtorsDetails component's state
  const [isInvoiceReportModalOpen, setIsInvoiceReportModalOpen] =
    useState(false);
  const [selectedInvoiceType, setSelectedInvoiceType] = useState('');

  // Debt form fields
  const [debtValue, setDebtValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()); // Define selectedDate state
  const [debtNote, setDebtNote] = useState('');
  const [totalChecksRejectedSum, setTotalChecksRejectedSum] = useState(0);

  const [totalChecksSum, setTotalChecksSum] = useState(0);
  const hasDebts =
    debtor?.debts?.length > 0 &&
    debtor.debts.reduce((sum, debt) => sum + debt.value, 0) > 0;
  const hasPayments =
    debtor?.payments?.length > 0 &&
    debtor.payments.reduce((sum, payment) => sum + payment.value, 0) > 0;

  const handleOpenChecksModal = (invoiceType, debtorId) => {
    setCurrentInvoiceType(invoiceType);
    setCurrentDebtorId(debtorId);
    setIsChecksModalOpen(true);
  };

  const handleCloseChecksModal = () => {
    setIsChecksModalOpen(false);
  };
  // Function to open the modal
  const handleOpenInvoiceReportModal = (type) => {
    setSelectedInvoiceType(type);
    setIsInvoiceReportModalOpen(true);
  };

  // Function to close the modal
  const handleCloseInvoiceReportModal = () => {
    setIsInvoiceReportModalOpen(false);
  };
  useEffect(() => {
    // Fetch payments from the database and set the state
    // This could be a Firebase Firestore query or other API call
    const fetchPayments = async () => {
      // Fetch payments logic here
    };
    fetchPayments();
  }, []);

  const updatePaymentInList = () => {
    window.location.reload();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDebtSubmit = async () => {
    try {
      setLoadingModal(true);

      // Generate a unique ID for the new debt (using timestamp)
      const debtId = new Date().getTime().toString();

      // Create a debt object with the form fields and the generated ID
      const newDebt = {
        id: debtId,
        value: parseFloat(debtValue), // Convert to number
        date: selectedDate.getTime(),
        note: debtNote,
      };

      // Add the new debt to the debtor's debts array
      await firebase
        .firestore()
        .collection('Debtors')
        .doc(debtorId)
        .update({
          debts: firebase.firestore.FieldValue.arrayUnion(newDebt),
        });

      // Close the modal and reset form fields
      handleCloseModal();
      setDebtValue('');
      setDebtNote('');

      // Fetch updated debtor data
      const updatedDoc = await firebase
        .firestore()
        .collection('Debtors')
        .doc(debtorId)
        .get();
      if (updatedDoc.exists) {
        setDebtor(updatedDoc.data());
      }
      setLoadingModal(false);
    } catch (err) {
      setError('Error adding debt:', err);
      console.error('Error adding debt:', err);
      setLoadingModal(false); // Ensure loading is reset even if there's an error
    }
  };

  useEffect(() => {
    const fetchDebtorById = async () => {
      try {
        const doc = await firebase
          .firestore()
          .collection('Debtors')
          .doc(debtorId)
          .get();

        if (doc.exists) {
          setDebtor(doc.data());
        } else {
          setError('Debtor not found');
        }
      } catch (err) {
        setError('Error fetching debtor details');
        console.error(err);
      }
      setLoading(false);
    };

    fetchDebtorById();
  }, [debtorId]);
  const handelOepenAddPayment = () => {
    navigation(`/management/debtors/addPayment/${debtorId}?Type=cash`);
  };
  const handleOpenEditDebtor = () => {
    navigation(`/management/debtors/EditDebtor/${debtorId}`);
  };
  const handelOepenAddCheck = () => {
    navigation(`/management/debtors/addPayment/${debtorId}?Type=check`);
  };
  const handleOpenClearHistoryModal = () => {
    setShowClearHistoryConfirmModal(true);
  };

  const handleCloseClearHistoryModal = () => {
    setShowClearHistoryConfirmModal(false);
  };

  const totalDebtSum = debtor?.debts?.reduce(
    (sum, debt) => sum + debt.value,
    0,
  );

  const totalPaymentSum = debtor?.payments?.reduce(
    (sum, payment) => sum + payment.value,
    0,
  );

  const handleCreateInvoice = (invoiceType, debtorId) => {
    // Prepare variables for the GraphQL query
    handleOpenChecksModal(invoiceType, debtorId);
  };

  // Inside DebtorDetails component
  const updateDebtsAfterDeletion = () => {
    window.location.reload();
  };

  const handleClearDebtorHistory = async () => {
    try {
      setLoading(true);
      // Clear the debts, payments, and checks arrays
      await firebase.firestore().collection('Debtors').doc(debtorId).update({
        debts: [],
        payments: [],
      });

      // Fetch updated debtor data to refresh the UI
      const updatedDoc = await firebase
        .firestore()
        .collection('Debtors')
        .doc(debtorId)
        .get();
      if (updatedDoc.exists) {
        setDebtor(updatedDoc.data());
      }
    } catch (error) {
      setError('Error clearing debtor history:', error);
      console.error('Error clearing debtor history:', error);
    } finally {
      setLoading(false);
      handleCloseClearHistoryModal();
      setUpdateSuccess(true);
    }
  };

  const finalResult = totalPaymentSum - totalDebtSum;
  const isDebtorInDebt = finalResult < 0;
  const debtorBalance = Math.abs(finalResult);
  return (
    <>
      <Box sx={{padding: 2}}>
        <Card>
          <CardContent>
            <Typography variant='h5' gutterBottom>
              {messages['DebtorDetails']}
            </Typography>
            {loading ? (
              <Typography>
                {messages['Banner.uploading']} {messages['DebtorDetails']}...
              </Typography>
            ) : error ? (
              <Typography color='error'>{error}</Typography>
            ) : (
              debtor && (
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 14,
                      fontWeight: Fonts.MEDIUM,
                      mt: 2,
                      mb: 4,
                    }}
                  >
                    <Box sx={{color: 'text.secondary'}}>
                      {messages['debtorName']}:{' '}
                    </Box>
                    <Box> {debtor.name}</Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 14,
                      fontWeight: Fonts.MEDIUM,
                      mt: 2,
                      mb: 4,
                    }}
                  >
                    <Box sx={{color: 'text.secondary'}}>
                      {messages['debtorAddress']}:{' '}
                    </Box>
                    <Box> {debtor.address}</Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 14,
                      fontWeight: Fonts.MEDIUM,
                      mt: 2,
                      mb: 4,
                    }}
                  >
                    <Box sx={{color: 'text.secondary'}}>
                      {messages['common.phoneNumber']}:{' '}
                    </Box>
                    <Box> {debtor.phoneNumber}</Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 14,
                      fontWeight: Fonts.MEDIUM,
                      mt: 2,
                      mb: 4,
                    }}
                  >
                    <Box sx={{color: 'text.secondary'}}>
                      {messages['common.general.notes']}:{' '}
                    </Box>
                    <Box> {debtor.notes}</Box>
                  </Box>
                  {error && (
                    <Alert severity='error' sx={{mt: 2}}>
                      {messages['Errorfetchingreports']} : {error.message}
                    </Alert>
                  )}
                  {updateSuccess && (
                    <Alert severity='success'>
                      {messages['Updatesuccessful']}
                    </Alert>
                  )}
                  {/* Summation section */}
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    mb={2}
                  >
                    <Button
                      variant='outlined'
                      color='primary'
                      onClick={handleOpenEditDebtor}
                    >
                      {messages['EditDebtorInfo']}
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      mt: 4,
                      p: 2,
                      bgcolor: '#f7f7f7',
                      borderRadius: '4px',
                    }}
                  >
                    <Typography variant='h6' gutterBottom>
                      {messages['FinancialSummary']}
                    </Typography>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      mb={2}
                    >
                      <Typography variant='subtitle1'>
                        {messages['TotalDebtSum']}:
                      </Typography>
                      <Typography variant='subtitle1'>
                        {totalDebtSum.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      mb={2}
                    >
                      <Typography variant='subtitle1'>
                        {messages['TotalCheckSum']}:
                      </Typography>
                      <Typography variant='subtitle1'>
                        {totalChecksSum.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      mb={2}
                    >
                      <Typography variant='subtitle1'>
                        {messages['TotalRejectedCheckSum']}:
                      </Typography>
                      <Typography variant='subtitle1'>
                        {totalChecksRejectedSum.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      mb={2}
                    >
                      <Typography variant='subtitle1'>
                        {messages['TotalPaymentSum']}:
                      </Typography>
                      <Typography variant='subtitle1'>
                        {totalPaymentSum.toFixed(2)}
                      </Typography>
                    </Box>

                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      mb={2}
                      bgcolor={isDebtorInDebt ? '#ffebee' : '#e8f5e9'}
                      p={1}
                      borderRadius='4px'
                    >
                      <Typography variant='subtitle1'>
                        {messages['FinalResult']}:
                      </Typography>
                      <Typography variant='subtitle1'>
                        {isDebtorInDebt
                          ? `${messages['StillInDebt']}: -${Math.abs(
                              debtorBalance,
                            ).toFixed(2)}`
                          : `${messages['Balance']}: ${debtorBalance.toFixed(
                              2,
                            )}`}
                      </Typography>
                    </Box>
                  </Box>
                  {/* Add other debtor fields here */}
                </Box>
              )
            )}
          </CardContent>
        </Card>
      </Box>
      {/* New History Card */}
      {debtorBalance === 0 && hasDebts && hasPayments && (
        <Box mt={4}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                {messages['ClearDebtorHistory']}
              </Typography>
              <Typography>{messages['DebtorNoDebtMessage']}</Typography>
              <Box mt={2}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={handleOpenClearHistoryModal}
                >
                  {messages['ClearHistory']}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      <Box mt={4}>
        <Card>
          <CardContent>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography variant='h5' gutterBottom>
                {messages['Debts']}
              </Typography>
              <Button
                variant='contained'
                color='primary'
                onClick={handleOpenModal}
              >
                {messages['AddDebts']}
              </Button>
            </Box>
            {debtor && debtor.debts.length > 0 ? (
              <DebtsList
                debts={debtor.debts}
                debtorId={debtorId}
                onUpdateDebt={updateDebtsAfterDeletion}
              />
            ) : (
              <Typography>{messages['NoDebtsYet']}</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
      <Box mt={4}>
        <Card>
          <CardContent>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <Typography variant='h6' gutterBottom>
                  {messages['DebtSummary']}
                </Typography>
                <Typography>
                  {messages['TotalDebtSum']}: {totalDebtSum}
                </Typography>
              </div>
              {debtor && debtor.debts && debtor.debts.length > 0 ? (
                <IconButton
                  variant='contained'
                  color='primary'
                  onClick={() =>
                    handleOpenInvoiceReportModal('debts', debtorId, debtor)
                  }
                >
                  <FileDownloadIcon />
                </IconButton>
              ) : (
                ''
              )}
            </div>
          </CardContent>
        </Card>
      </Box>

      <Box mt={4}>
        <Card>
          <CardContent>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography variant='h5' gutterBottom>
                {messages['Payments']}
              </Typography>
              <Button
                variant='contained'
                color='primary'
                onClick={handelOepenAddPayment}
              >
                {messages['AddNewPayment']}
              </Button>
            </Box>
            {debtor && debtor.payments.length > 0 ? (
              <PaymentsList
                payments={debtor.payments}
                debtorId={debtorId}
                onUpdatePayment={updatePaymentInList}
              />
            ) : (
              <Typography>{messages['NoPaymentsYet']}</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
      <Box mt={4}>
        <Card>
          <CardContent>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <Typography variant='h6' gutterBottom>
                  {messages['PaymentsSummary']}
                </Typography>
                <Typography>
                  {messages['TotalPaymentSum']}: {totalPaymentSum}
                </Typography>
              </div>
              {debtor && debtor.payments && debtor.payments.length > 0 ? (
                <IconButton
                  variant='contained'
                  color='primary'
                  onClick={() =>
                    handleOpenInvoiceReportModal('payments', debtorId)
                  }
                >
                  <FileDownloadIcon />
                </IconButton>
              ) : (
                ''
              )}
            </div>
          </CardContent>
        </Card>
      </Box>
      <Box mt={4}>
        <Card>
          <CardContent>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography variant='h5' gutterBottom>
                {messages['Checks']}
              </Typography>
              <Button
                variant='contained'
                color='primary'
                onClick={handelOepenAddCheck}
              >
                {messages['AddNewChecks']}
              </Button>
            </Box>
            {debtor && debtor.checks.length > 0 ? (
              <ChacksList
                setTotalChecksRejectedSum={setTotalChecksRejectedSum}
                checks={debtor.checks}
                setTotalChecksSum={setTotalChecksSum}
                debtorId={debtorId}
              />
            ) : (
              <Typography>{messages['NoChecksyet']}</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
      <Box mt={4}>
        <Card>
          <CardContent>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <Typography variant='h6' gutterBottom>
                  {messages['ChecksSummary']}
                </Typography>
                <Typography>
                  {messages['TotalCheckSum']}: {totalChecksSum}
                </Typography>
                <Typography>
                  {messages['TotalRejectedCheckSum']}: {totalChecksRejectedSum}
                </Typography>
              </div>
              {debtor && debtor.checks && debtor.checks.length > 0 ? (
                <IconButton
                  variant='contained'
                  color='primary'
                  onClick={() => handleCreateInvoice('checks', debtorId)}
                >
                  <FileDownloadIcon />
                </IconButton>
              ) : (
                ''
              )}
            </div>
          </CardContent>
        </Card>
      </Box>
      {/* Add Debt Button */}

      {/* Debt Modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: '90%', // Adjust the width for larger screens
            maxWidth: '400px', // Limit the maximum width for very large screens
          }}
        >
          <Typography variant='h6' gutterBottom>
            {messages['AddDebts']}
          </Typography>
          <TextField
            variant='outlined'
            fullWidth
            placeholder={messages['EnterDebtValue']}
            margin='normal'
            value={debtValue}
            onChange={(e) => setDebtValue(e.target.value)}
          />
          {debtValue && isNaN(debtValue) ? (
            <Typography variant='body2' color='error' gutterBottom>
              {messages['PleaseEnterAValidBumberForTheDebtValue']}
            </Typography>
          ) : null}
          <DatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            renderInput={(params) => (
              <>
                <TextField
                  {...params}
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  placeholder='Select Debt Date'
                />
                <Typography variant='body2' gutterBottom>
                  {messages['PleaseSelectTheDebtDate']}
                </Typography>
              </>
            )}
          />
          <TextField
            variant='outlined'
            fullWidth
            multiline
            rows={4}
            placeholder={messages['common.general.notes']}
            margin='normal'
            value={debtNote}
            onChange={(e) => setDebtNote(e.target.value)}
          />
          {loadingModal ? (
            <Button variant='contained' color='primary' disabled>
              {messages['Submitting']}...
            </Button>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '16px',
              }}
            >
              {debtValue && !isNaN(debtValue) && debtNote ? (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleDebtSubmit}
                >
                  {messages['SubmitDebt']}
                </Button>
              ) : (
                <Button variant='contained' color='primary' disabled>
                  {messages['SubmitDebt']}
                </Button>
              )}
              <Button
                variant='outlined'
                color='secondary'
                onClick={handleCloseModal}
              >
                {messages['mangment.close']}
              </Button>
            </div>
          )}
        </Box>
      </Modal>
      <Modal open={isChecksModalOpen} onClose={handleCloseChecksModal}>
        <ChecksReportsModal
          invoiceType={currentInvoiceType}
          debtorId={currentDebtorId}
        />
      </Modal>
      <ConfirmationDeleteHistoryModal
        open={showClearHistoryConfirmModal}
        onClose={handleCloseClearHistoryModal}
        onConfirm={handleClearDebtorHistory}
        title={messages['ClearDebtorHistory']}
        message={messages['DebtorNoDebtMessage']}
      />
      <InvoiceReportModal
        open={isInvoiceReportModalOpen}
        onClose={handleCloseInvoiceReportModal}
        invoiceType={selectedInvoiceType}
        debtorId={debtorId}
        debtor={debtor}
      />
    </>
  );
};

export default DebtorsDetails;

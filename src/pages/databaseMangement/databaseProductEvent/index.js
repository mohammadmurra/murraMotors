import React, {useState} from 'react';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  CardHeader,
  CircularProgress,
  Box,
} from '@mui/material';
import {firebase} from '@crema/services/auth/firebase/firebase';
import {useIntl} from 'react-intl';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // For success status
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // For error status

const InitializeEventFlags = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);
  const [successfulUpdates, setSuccessfulUpdates] = useState(0);
  const [failedUpdates, setFailedUpdates] = useState(0);
  const {messages} = useIntl();

  const initializeEventFlags = async () => {
    setIsProcessing(true);
    setProcessComplete(false);
    setSuccessfulUpdates(0);
    setFailedUpdates(0);

    let snapshot;
    let localSuccessCount = 0;
    let localFailedCount = 0;

    try {
      const productsRef = firebase.firestore().collection('products');
      snapshot = await productsRef.get();
      const batch = firebase.firestore().batch();

      snapshot.forEach((doc) => {
        if (doc.exists && doc.data().eventFlag === undefined) {
          batch.update(doc.ref, {eventFlag: false});
          localSuccessCount++;
        }
      });

      await batch.commit();
      setSuccessfulUpdates(localSuccessCount);
      console.log('All products have been initialized with an eventFlag.');
    } catch (error) {
      console.error('Error initializing eventFlags: ', error);
      localFailedCount = snapshot ? snapshot.size - localSuccessCount : 0;
      setFailedUpdates(localFailedCount);
    }

    setIsProcessing(false);
    setProcessComplete(true);
  };

  return (
    <>
      <CardHeader
        title={messages['sidebar.app.dashboard.ProductEventPageSetting']}
        sx={{backgroundColor: '#f5f5f5'}}
      />
      <Card sx={{m: 2}}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Initialize Event Flags
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Use this tool to initialize the eventFlag for all products in the
            database. Products without an eventFlag will have it set to false.
          </Typography>
          {processComplete && (
            <Box
              display='flex'
              flexDirection='column'
              alignItems='flex-start'
              mt={2}
            >
              <Box display='flex' alignItems='center'>
                <CheckCircleOutlineIcon color='success' />
                <Typography variant='body2' sx={{ml: 1}}>
                  Successful Updates: {successfulUpdates}
                </Typography>
              </Box>
              {failedUpdates > 0 && (
                <Box display='flex' alignItems='center'>
                  <ErrorOutlineIcon color='error' />
                  <Typography variant='body2' sx={{ml: 1}}>
                    Failed Updates: {failedUpdates}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            color='primary'
            disabled={isProcessing}
            onClick={initializeEventFlags}
            fullWidth
            startIcon={isProcessing ? <CircularProgress size={24} /> : null}
          >
            {isProcessing ? 'Processing...' : 'Initialize'}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default InitializeEventFlags;

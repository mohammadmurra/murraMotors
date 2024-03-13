import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,

  Link as MuiLink,
  ListItem,
  ListItemText,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { getFirestore, doc, getDoc } from 'firebase/firestore';



const CheckbookDetails = () => {
  const { checkbookId } = useParams();
  const [checkbook, setCheckbook] = useState(null);

  useEffect(() => {
    const fetchCheckbook = async () => {
      try {
        const db = getFirestore();
        const docRef = doc(db, 'checkbooks', checkbookId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCheckbook(docSnap.data());
        } else {
          setCheckbook(null);
        }
      } catch (error) {
        console.error('Error fetching checkbook:', error);
      }
    };

    if (checkbookId) {
      fetchCheckbook();
    }
  }, [checkbookId]);

  if (!checkbook) {
    return <Typography>No checkbook found</Typography>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h4' gutterBottom>
              Checkbook Details
            </Typography>
            <Box display='flex' alignItems='center' marginBottom={2}>
              <AccountBalanceIcon color='action' />
              <Typography variant='subtitle1' marginLeft={1}>
                Bank Name: {checkbook.bankName}
              </Typography>
            </Box>
            <Box display='flex' alignItems='center' marginBottom={2}>
              <AccountCircleIcon color='action' />
              <Typography variant='subtitle1' marginLeft={1}>
                Owner Name: {checkbook.ownerName}
              </Typography>
            </Box>
            <Box display='flex' alignItems='center'>
              <ListAltIcon color='action' />
              <Typography variant='subtitle1' marginLeft={1}>
                Number of Checks: {checkbook.checks?.length}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h5' gutterBottom>
              Checks
            </Typography>
            <List>
              {checkbook.checks?.map((check, index) => (
                <ListItem key={index} secondaryAction={
                  check.issuedCheckId ? (
                    <MuiLink component={Link} to={`/management/Checks/IssuedCheckDetails/${check.issuedCheckId}`}>
                      View Details
                    </MuiLink>
                  ) : "Not issued"
                }>
          
                  <ListItemText primary={`Check ID: ${check.checkId}`} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CheckbookDetails;

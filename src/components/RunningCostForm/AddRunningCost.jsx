import {
  Button,
  CardContent,
  Grid,
  InputAdornment,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { useState } from 'react';
import { addRuningCost } from '../../@crema/services/auth/firebase/firebase';
import { useIntl } from 'react-intl';
import { LoadingButton } from '@mui/lab';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const AddRunningCost = ({ handleCloseVariantModal, setToggleAddRunningCost }) => {
  const { messages } = useIntl();
  const [formData, updateFormData] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value.trim(),
    });
  };
  const cheakOutTrigger = (e) => {
    e.preventDefault();
    formData.time = Date.now();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    formData.date = today;
    formData.amount = Number(formData.amount);
    setLoading(true);
    addRuningCost(formData).then(() => {
      setToggleAddRunningCost(prev => !prev);
      handleCloseVariantModal();
    }).catch(e => { console.log(e); }).finally(() => {
      setLoading(false);
    });
  };
  return (
    <form onSubmit={(e) => cheakOutTrigger(e)}>
      <Box style={style} minWidth={{ xs: '90%', sm: '40%' }}>
        <Paper elevation={3}>
          <CardContent xs={{ px: 10, pt: 1 }} sm={{ px: 10, pt: 1 }}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography
                  mt={2}
                  mb={3}
                  component='h3'
                  variant='h3'
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    fontSize: { xs: 18, sm: 20 },
                  }}
                >
                  {messages['sidebar.ecommerce.addrunningCost']}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  id='outlined-basic'
                  name='name'
                  fullWidth
                  label={messages['mangment.addRunigCost']}
                  variant='outlined'
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <OutlinedInput
                  id='outlined-adornment-amount'
                  name='amount'
                  type='Number'
                  fullWidth
                  onChange={handleChange}
                  startAdornment={
                    <InputAdornment position='start'>₪</InputAdornment>
                  }
                />
              </Grid>
              
              <Grid item xs={12} mt={2} mb={2}>
                <TextField
                  id='outlined-basic'
                  fullWidth
                  name='short_desc'
                  label={messages['NoteRunningCost']}
                  variant='outlined'
                  size='large'
                  inputProps={{ style: { minHeight: 70 } }}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                {
                  loading ?
                    <LoadingButton loading variant='outlined'>
                          {messages['sidebar.ecommerce.addrunningBtn']}
                    </LoadingButton> :
                    <Button type='submit' variant='contained'>
                          {messages['sidebar.ecommerce.addrunningBtn']}
                    </Button>
                }
              </Grid>
            </Grid>
          </CardContent>
        </Paper>
      </Box>
    </form>
  );
};

AddRunningCost.propTypes = {
  handleCloseVariantModal: PropTypes.func.isRequired,
  setToggleAddRunningCost: PropTypes.func.isRequired
};
export default AddRunningCost;

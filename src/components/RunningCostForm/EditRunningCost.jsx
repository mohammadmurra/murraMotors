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
import {Box} from '@mui/system';
import {useState} from 'react';
import PropTypes from 'prop-types';
import {editRuningCost} from '../../@crema/services/auth/firebase/firebase';
import {useIntl} from 'react-intl';
import {CircularProgress} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const EditRunningCost = ({data}) => {
  const {messages} = useIntl();
  const [formData, updateFormData] = useState(data);
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value.trim(),
    });
  };
  const cheakOutTrigger = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true

    formData.date = data.date;
    formData.amount = Number(formData.amount);

    try {
      await editRuningCost(formData, data); // Assuming this is an async operation
      setLoading(false); // Set loading back to false
      window.location.reload(); // Reload page
    } catch (error) {
      console.error('Failed to edit running cost:', error);
      setLoading(false); // Set loading back to false even if there's an error
      // Here you can also display an error message to the user if you wish
    }
  };
  return (
    <form onSubmit={(e) => cheakOutTrigger(e)}>
      <Box style={style} minWidth={{xs: '90%', sm: '40%'}}>
        <Paper elevation={3}>
          <CardContent xs={{px: 10, pt: 1}} sm={{px: 10, pt: 1}}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography
                  mt={2}
                  mb={3}
                  component='h3'
                  variant='h3'
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    fontSize: {xs: 18, sm: 20},
                  }}
                >
                  {messages['sidebar.ecommerce.editrunningCost']}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  id='outlined-basic'
                  name='name'
                  fullWidth
                  label={messages['sidebar.ecommerce.editrunningCost']}
                  variant='outlined'
                  onChange={handleChange}
                  defaultValue={data.name}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <OutlinedInput
                  id='outlined-adornment-amount'
                  name='amount'
                  defaultValue={data.amount}
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
                  defaultValue={data.short_desc}
                  size='large'
                  inputProps={{style: {minHeight: 70}}}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={loading} // Disable button while loading
                  startIcon={loading ? <CircularProgress size='20px' /> : null} // Show loading spinner
                >
                  {messages['mangment.update']}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Paper>
      </Box>
    </form>
  );
};
export default EditRunningCost;
EditRunningCost.propTypes = {
  data: PropTypes.object.isRequired,
};

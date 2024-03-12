import {
  Button,
  CardContent,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import {Box} from '@mui/system';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {
  addMainCategory,
  getMainCategories,
} from '@crema/services/auth/firebase/firebase';
import PropTypes from 'prop-types';
import {LoadingButton} from '@mui/lab';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const MainCategoryGenFrom = ({setOpenVariantModal}) => {
  const initialForm = {
    Categorytitle: '',
    SubCategories: [],
  };
  const {messages} = useIntl();
  const [formData, updateFormData] = useState(initialForm);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(' ');
  const [formChanged, setFormChanged] = useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  console.log(formChanged);
  const handleClose = () => {
    formChanged ? window.location.reload() : setOpenVariantModal(false);
  };

  const cheakOutTrigger = async (e) => {
    e.preventDefault();
    setFormError(' ');
    setFormLoading(true);
    formData.time = Date.now();
    try {
      const mainCategories = await getMainCategories();
      const isCategoryExists = mainCategories.find(
        (category) => category.Categorytitle === formData.Categorytitle,
      );
      if (isCategoryExists) {
        setFormError('Category already exists');
      } else {
        await addMainCategory(formData);

        setFormError('Category has been created');
        setFormChanged(true);
      }
    } catch (error) {
      console.log('Error:', error);
      setFormError(error.message);
    }
    setFormLoading(false);
  };

  return (
    <form onSubmit={async (e) => await cheakOutTrigger(e)}>
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
                  {messages['sidebar.app.dashboard.CreateMainCategory']}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id='outlined-basic'
                  name='Categorytitle'
                  fullWidth
                  label={messages['sidebar.app.dashboard.NameMainCategory']}
                  variant='outlined'
                  onChange={handleChange}
                  required
                />
              </Grid>
              {formError && (
                <Grid item xs={12}>
                  <Typography color='sucsses'>{formError}</Typography>
                </Grid>
              )}
              {!formLoading ? (
                <>
                  <Grid item xs={6}>
                    <Button type='submit' variant='contained'>
                      {messages['sidebar.app.dashboard.CreateMainCategory']}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{display: 'flex', justifyContent: 'flex-end'}}
                  >
                    <Button onClick={() => handleClose()} variant='contained'>
                      {messages['mangment.close']}
                    </Button>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={6}>
                    <LoadingButton loading variant='outlined'>
                      {messages['sidebar.app.dashboard.CreateMainCategory']}
                    </LoadingButton>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{display: 'flex', justifyContent: 'flex-end'}}
                  >
                    <Button onClick={() => handleClose()} variant='contained'>
                      {messages['mangment.close']}
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </CardContent>
        </Paper>
      </Box>
    </form>
  );
};
MainCategoryGenFrom.propTypes = {
  setOpenVariantModal: PropTypes.func.isRequired,
};
export default MainCategoryGenFrom;

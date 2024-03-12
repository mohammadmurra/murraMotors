import {
  Autocomplete,
  Button,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import {Box} from '@mui/system';
import React, {useState} from 'react';
// import {  addRuningCost
// } from "../../@crema/services/auth/firebase/firebase";
import {useIntl} from 'react-intl';
import {LoadingButton,MobileDateRangePicker} from '@mui/lab';
import {addCopun} from '@crema/services/auth/firebase/firebase';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const CopounGenFrom = () => {
  var voucher_codes = require('voucher-code-generator');
  const inaitalForm = {
    Percentage: false,
    Fixed: false,
    amount: 0,
    title: '',
    spicalUsers: [],
    fixed_pepole_number: null,
    fixedPepole: false,
    spicalicUserCheak: false,
    usedPepole: [],

    code: '',
  };
  const {messages} = useIntl();
  const [formData, updateFormData] = useState(inaitalForm);

  const [copounDate, setcopounDate] = useState([new Date(), new Date()]);
  const [showFixedpepole, setFixedpepole] = useState(false);
  const [showFixedUsers, setFixedUsers] = useState(false);
  const [tempOnChangeValueSize, setTempOnChangeValueSize] = useState('');
  const [loading, setLoading] = useState(false);
  const [sizesOptions, setSizesOption] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [code, setCode] = useState();
  const handleChange = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value.trim(),
    });
  };

  const handlecheakBox = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.checked ? e.target.checked : null,
    });
  };
  const dateFromater = (date) => {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    date = mm + '/' + dd + '/' + yyyy;
    return date;
  };
  function codeGenret() {
    try {
      let code = voucher_codes.generate({
        postfix: '-2022',
        pattern: '####',
      });
      setCode(code[0]);
    } catch (e) {
      console.log('Sorry, not possible.');
    }
  }
  const cheakOutTrigger = async (e) => {
    e.preventDefault();

    console.log(sizesOptions);

    if (!showFixedpepole) {
      formData.fixed_pepole_number = null;
      formData.fixedPepole = false;
    } else {
      formData.fixedPepole = true;
    }
    if (!showFixedUsers) {
      formData.spicalicUserCheak = false;
      formData.spicalUsers = [];
    } else {
      formData.spicalicUserCheak = true;
      formData.spicalUsers = sizesOptions;
    }
    formData.fromDate = dateFromater(copounDate[0]);
    formData.EndDate = dateFromater(copounDate[1]);
    formData.time = Date.now();
    formData.code = code;
    formData.amount = Number(formData.amount);
    setLoading(true);
    addCopun(formData)
      .then(() => window.location.reload())
      .finally(() => setLoading(false));
    console.log(formData);
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
                  {messages['sidebar.app.dashboard.addcopoun']}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  id='outlined-basic'
                  name='title'
                  fullWidth
                  label={messages['mangment.addCopoun']}
                  variant='outlined'
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={2}>
                <OutlinedInput
                  id='outlined-adornment-amount'
                  name='amount'
                  type='Number'
                  fullWidth
                  onChange={handleChange}
                  startAdornment={
                    <InputAdornment position='start'>₪/%</InputAdornment>
                  }
                />
              </Grid>

              <Grid item textAlign={{xs: 'start', lg: 'end'}} xs={12} lg={6}>
                <MobileDateRangePicker
                  startText={messages['sidebar.reports.startdate']}
                  endText={messages['sidebar.reports.enddate']}
                  value={copounDate}
                  onChange={(newValue) => {
                    setcopounDate(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField {...startProps} />
                      <Box sx={{mx: 2}}> to </Box>
                      <TextField {...endProps} />
                    </React.Fragment>
                  )}
                  buttonComp={() => {}}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid item xs={12} sm={4}>
                  <FormGroup title='fixedPeopleGroup'>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id='fixedpepole'
                          name='FixedPepole'
                          onChange={() => setFixedpepole(!showFixedpepole)}
                        />
                      }
                      label={messages['ecommerce.addCopoun.FixedPepole']}
                    />
                  </FormGroup>
                </Grid>
                {showFixedpepole && (
                  <>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        sm={4}
                        xs={12}
                        id='fixed_pepole_number'
                        name='fixed_pepole_number'
                        type='Number'
                        label={messages['ecommerce.addCopoun.PeopleNumber']}
                        variant='outlined'
                        onChange={handleChange}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              <Grid item xs={12} sm={5}>
                <Grid item xs={6} lg={6}>
                  <FormGroup title='properties'>
                    <FormLabel component='legend'>
                      {messages['ecommerce.addCopoun.properties']}{' '}
                    </FormLabel>

                    <FormControlLabel
                      control={
                        <Checkbox
                          id='Percentage'
                          name='Percentage'
                          onChange={(e) => handlecheakBox(e)}
                        />
                      }
                      label='Percentage Discount'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id='Fixed'
                          name='Fixed'
                          onChange={(e) => handlecheakBox(e)}
                        />
                      }
                      label='Fixed Discount'
                    />
                  </FormGroup>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormLabel component='legend'>
                  {messages['ecommerce.addCopoun.FixedUser']}{' '}
                </FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      id='fixeduser'
                      name='FixedUser'
                      onChange={() => setFixedUsers(!showFixedUsers)}
                    />
                  }
                  label={messages['ecommerce.addCopoun.FixedUser']}
                />
              </Grid>
              {showFixedUsers && (
                <>
                  <Grid item xs={12} sm={8}>
                    <Autocomplete
                      fullWidth
                      onInputChange={(event, newInputValue) => {
                        setTempOnChangeValueSize(newInputValue);
                      }}
                      multiple
                      noOptionsText={
                        <Button
                          fullWidth
                          onClick={() => {
                            console.log(tempOnChangeValueSize);
                            setSizesOption((e) => [
                              ...e,
                              tempOnChangeValueSize,
                            ]);
                          }}
                        >
                          {messages['ecommerce.addcopune.AddUsers']}
                        </Button>
                      }
                      value={sizes}
                      onChange={(_, item) => {
                        setSizes(item);
                      }}
                      options={sizesOptions}
                      renderInput={(props) => (
                        <TextField {...props} fullWidth />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <OutlinedInput
                      id='outlined-adornment-amount'
                      name='amount'
                      type='Number'
                      fullWidth
                      onChange={handleChange}
                      startAdornment={
                        <InputAdornment position='start'>₪/%</InputAdornment>
                      }
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12} sm={12}>
                <Button type='Button' onClick={codeGenret} variant='contained'>
                  {messages['ecommerce.addCopoun.generate']}{' '}
                </Button>
              </Grid>
              <Grid item xs={12} sm={8}>
                <label>
                  <TextField
                    id='outlined-basic'
                    name='code'
                    fullWidth
                    value={code}
                    variant='outlined'
                    onChange={handleChange}
                    required
                  />
                </label>
              </Grid>
              <Grid item xs={12}>
                {loading ? (
                  <Grid mb={2} ml={2}>
                    <LoadingButton loading variant='outlined'>
                      {messages['ecommerce.addproduct.loding']}
                    </LoadingButton>
                  </Grid>
                ) : (
                  <Grid mb={2} ml={2}>
                    <Button type='submit' variant='contained'>
                      {' '}
                      {messages['sidebar.app.dashboard.addcopoun']}{' '}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Paper>
      </Box>
    </form>
  );
};
export default CopounGenFrom;

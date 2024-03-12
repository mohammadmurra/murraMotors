import React from 'react';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import {useNavigate} from 'react-router-dom';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@mui/material/Box';
import AppTextField from '../../../@crema/core/AppFormComponents/AppTextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import AppInfoView from '../../../@crema/core/AppInfoView';
import {useAuthMethod} from '../../../@crema/utility/AuthHooks';
import {Fonts} from '../../../shared/constants/AppEnums';
import {useSelector} from 'react-redux';
import {LoadingButton} from '@mui/lab';

const validationSchema = yup.object({
  email: yup
    .string()
    .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),
  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
});

const SigninFirebase = () => {
  const loading = useSelector((state) => state.common.loading);
  const {signInWithEmailAndPassword} = useAuthMethod();
  const navigate = useNavigate();

  const onGoToForgetPassword = () => {
    navigate('/forget-password', {tab: 'firebase'});
  };

  const {messages} = useIntl();

  return (
    <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
      <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', mb: 5}}>
        <Formik
          validateOnChange={true}
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            signInWithEmailAndPassword({
              ...data,
              email: data.email.toLowerCase(),
            });
            setSubmitting(false);
          }}
        >
          {({isSubmitting}) => (
            <Form style={{textAlign: 'left'}} noValidate autoComplete='off'>
              <Box sx={{mb: {xs: 5, xl: 8}}}>
                <AppTextField
                  placeholder={messages['common.email']}
                  name='email'
                  label={<IntlMessages id='common.email' />}
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{mb: {xs: 3, xl: 4}}}>
                <AppTextField
                  type='password'
                  placeholder={messages['common.password']}
                  label={<IntlMessages id='common.password' />}
                  name='password'
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  mb: {xs: 3, xl: 4},
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox sx={{ml: -3}} />
                  <Box
                    component='span'
                    sx={{
                      color: 'grey.500',
                    }}
                  >
                    <IntlMessages id='common.rememberMe' />
                  </Box>
                </Box>
                <Box
                  component='span'
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    fontWeight: Fonts.MEDIUM,
                    cursor: 'pointer',
                    display: 'block',
                    textAlign: 'right',
                  }}
                  onClick={onGoToForgetPassword}
                >
                  <IntlMessages id='common.forgetPassword' />
                </Box>
              </Box>

              <div>
                {loading ? (
                  <LoadingButton loading variant='outlined'>
                    <IntlMessages id='common.login' />
                  </LoadingButton>
                ) : (
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    disabled={isSubmitting}
                    sx={{
                      minWidth: 160,
                      fontWeight: Fonts.REGULAR,
                      fontSize: 16,
                      textTransform: 'capitalize',
                      padding: '4px 16px 8px',
                    }}
                  >
                    <IntlMessages id='common.login' />
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Box>

      <AppInfoView />
    </Box>
  );
};

export default SigninFirebase;

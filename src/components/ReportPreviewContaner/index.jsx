import React, {useEffect,useState} from 'react';
import {useIntl} from 'react-intl';
import {Button, Card} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CodeIcon from '@mui/icons-material/Code';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AppAnimate from '../../@crema/core/AppAnimate';
import {Fonts} from '../../shared/constants/AppEnums';
import {updateOreder} from '@crema/services/auth/firebase/firebase';
import ConfermationUpdateOrder from 'components/GeneralComponent/ConfermationUpdateOrder.jsx';
import {LoadingButton} from '@mui/lab';

const ReportPreviewContaner = ({
  title,
  description,
  source,
  buttonCompMethod,
}) => {
  const {messages} = useIntl();
  const [viewSource, setToggleViewSource] = useState(false);
  const [showConfermationUpdateOrder, setShowConfermationUpdateOrder] =
    useState(false);
  const [ConfermationUpdate, setConfermationUpdate] = useState(false);
  const [orderUpdateLoading, setOrderUpdateLoading] = useState(false);
  const [animation, setAnimation] = useState(false);
  const update = () => {
    setShowConfermationUpdateOrder(true);
    setOrderUpdateLoading(true);
    // var prod = JSON.parse(sessionStorage.getItem("items"));//no brackets
  };

  useEffect(() => {
    if (ConfermationUpdate) {
      var order = JSON.parse(sessionStorage.getItem('order')); //no brackets
      var Oldorder = JSON.parse(sessionStorage.getItem('Oldorder')); //no brackets

      // Call the method here
      updateOreder(order, Oldorder);
    }
  }, [ConfermationUpdate]);

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Card>
        <CardHeader
          sx={{
            py: 0,
            pb: 0,
            px: 5,
            display: 'flex',
            alignItems: 'center',

            boxSizing: 'border-box',
            '& .MuiTypography-h5': {
              fontSize: 14,
              fontWeight: Fonts.BOLD,
              marginBottom: 0.25,
            },
          }}
          title={title}
          subheader={description}
          root={{
            subheader: {
              fontSize: 13,
            },
          }}
          action={
            source ? (
              <Box>
                <IconButton
                  aria-label='view code'
                  onClick={() => {
                    if (animation) {
                      setAnimation(!animation);
                      setTimeout(() => setToggleViewSource(!viewSource), 400);
                    } else {
                      setAnimation(!animation);
                      setToggleViewSource(!viewSource);
                    }
                  }}
                  size='large'
                >
                  <CodeIcon />
                </IconButton>
              </Box>
            ) : null
          }
        />

        <CardContent
          sx={{px: 4, pt: 0}}
          style={{display: 'flex', justifyContent: 'flex-end'}}
        >
                       
          <Box
                mt={4}
                marginRight={2}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
                <Button variant='contained'  type="button" size='medium' style={{color:"#ffffff"}} onClick={buttonCompMethod}>
                    {messages['reports.datepicker.preview']}
                </Button>
              </Box> 
          {!orderUpdateLoading ? (
            <>
              <Box
                mt={4}
                marginRight={2}
                marginLeft={2}
                display='flex'
                justifyContent='flex-end'
                alignItems='flex-end'
              >
                <Button
                  variant='contained'
                  color='success'
                  size='medium'
                  style={{color: '#ffffff'}}
                  onClick={update}
                >
                  {messages['order.state.update']}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box
                mt={4}
                marginRight={2}
                marginLeft={2}
                display='flex'
                justifyContent='flex-end'
                alignItems='flex-end'
              >
                <LoadingButton loading variant='outlined'>
                  {messages['Banner.uploading']}
                </LoadingButton>
              </Box>
            </>
          )}
          <ConfermationUpdateOrder
            open={showConfermationUpdateOrder}
            setConfirm={setConfermationUpdate}
            setClose={setShowConfermationUpdateOrder}
            setLoading={setOrderUpdateLoading}
          />
        </CardContent>
      </Card>
    </AppAnimate>
  );
};

ReportPreviewContaner.propTypes = {
  component: PropTypes.any.isRequired,
  source: PropTypes.any,
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  buttonCompMethod:  PropTypes.any.isRequired,
};

export default ReportPreviewContaner;

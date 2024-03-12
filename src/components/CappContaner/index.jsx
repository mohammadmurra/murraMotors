import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Card } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CodeIcon from '@mui/icons-material/Code';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AppAnimate from './../../@crema/core/AppAnimate';
import { Fonts } from './../../shared/constants/AppEnums';
import { LoadingButton } from '@mui/lab';

const CAppContaner = ({
  title,
  description,
  component: Component,
  source,
  buttonCompMethod,
  IOloading,
  disbleBtn
}) => {
  const { messages } = useIntl();
  const [viewSource, setToggleViewSource] = useState(false);
  const [animation, setAnimation] = useState(false);

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Card>
        <CardHeader
          sx={{
            py: 4,
            pb: 1,
            px: 5,
            display: 'flex',
            alignItems: 'center',
            minHeight: 50,
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

        <CardContent sx={{ px: 4, pt: 0 }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            <Component />
          </Box>
          <Box
            mt={4}
            display='flex'
            justifyContent='flex-end'
            alignItems='flex-end'
          >
            {IOloading ?
              <LoadingButton loading variant='outlined'>
                {messages['ecommerce.addproduct.loding']}
              </LoadingButton> :
              <Button
                variant='contained'
                disabled={disbleBtn}
                size='medium'
                onClick={buttonCompMethod}
              >

                {messages['reports.datepicker.generate']}
              </Button>
            }
          </Box>
        </CardContent>
      </Card>
    </AppAnimate>
  );
};

CAppContaner.propTypes = {
  component: PropTypes.any.isRequired,
  source: PropTypes.any,
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  buttonCompMethod: PropTypes.any.isRequired,
  IOloading: PropTypes.bool.isRequired,
  disbleBtn: PropTypes.bool.isRequired,

};

export default CAppContaner;

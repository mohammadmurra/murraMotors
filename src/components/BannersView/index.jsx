import React, {useState} from 'react';
// import {useIntl} from 'react-intl';
import {Card} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CodeIcon from '@mui/icons-material/Code';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AppAnimate from '../../@crema/core/AppAnimate';
import {Fonts} from '../../shared/constants/AppEnums';
// import {updateProdact} from '@crema/services/auth/firebase/firebase';

const ReportPreviewContaner = ({
  title,
  description,
  source,
  // buttonCompMethod,
}) => {
  // const {messages} = useIntl();
  const [viewSource, setToggleViewSource] = useState(false);
  const [animation, setAnimation] = useState(false);


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
          style={{display: 'flex', justifyContent: 'flex-end',height:'400px'}}
        >
          {/*              
          <Box
                mt={4}
                marginRight={2}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
                <Button variant='contained'  type="button" size='medium' style={{color:"#ffffff"}} onClick={buttonCompMethod}>
                    {messages['reports.datepicker.preview']}
                </Button>
              </Box> */}


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
  // buttonCompMethod:  PropTypes.any.isRequired,
};

export default ReportPreviewContaner;

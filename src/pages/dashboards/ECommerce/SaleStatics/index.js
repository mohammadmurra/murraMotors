import React from 'react';
import AppCard from '@crema/core/AppCard';
import {useIntl} from 'react-intl';
import AppSelect from '@crema/core/AppSelect';
import {AppGridContainer} from '@crema';
import {Box, Grid} from '@mui/material';
import Typography from '@mui/material/Typography';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import AppCircularProgress from '@crema/core/AppCircularProgress';
import SaleStaticChart from './SaleStaticChart';

const SaleStatics = () => {
  const {messages} = useIntl();
  const handleSelectionType = (data) => {
    console.log('data: ', data);
  };

  return (
    <AppCard
      title={messages['eCommerce.saleStatics']}
      action={
        <AppSelect
          menus={[
            messages['dashboard.thisWeek'],
            messages['dashboard.lastWeeks'],
            messages['dashboard.lastMonth'],
          ]}
          defaultValue={messages['dashboard.thisWeek']}
          onChange={handleSelectionType}
        />
      }
    >
      <AppGridContainer>
        <Grid item xs={12} md={9}>
          <SaleStaticChart />
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: 1,
            }}
          >
            <Box
              sx={{
                mb: 9,
                pl: {xl: 8},
              }}
            >
              <AppCircularProgress
                activeColor='#0A8FDC'
                pathColor='#F44D50'
                hidePercentage
                value={70}
                centerNode={
                  <LoyaltyIcon fontSize='large' style={{color: '#111827'}} />
                }
                thickness={2}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  mr: 6,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#0A8FDC',
                    height: 10,
                    width: 10,
                    mr: 2,
                    borderRadius: '50%',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 14,
                  }}
                >
                  Orders
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#F44D50',
                    height: 10,
                    width: 10,
                    mr: 2,
                    borderRadius: '50%',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 14,
                  }}
                >
                  Retutns
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </AppGridContainer>
    </AppCard>
  );
};

export default SaleStatics;

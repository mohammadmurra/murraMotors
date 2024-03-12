import {Box, Grid} from '@mui/material';
// import Button from '@mui/material/Button';
// import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';

import {AppGridContainer} from '../../../@crema';
import CartTable from './CartTable';
import AppCard from '../../../@crema/core/AppCard';

import {Fonts} from '../../../shared/constants/AppEnums';
import OrderSummary from '../OrderSummary';
import AppAnimate from '../../../@crema/core/AppAnimate';

const Carts = ({data}) => {
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box>
        <Box
          component='h2'
          sx={{
            color: 'text.primary',
            fontWeight: Fonts.BOLD,
            mb: 6,
            fontSize: 16,
          }}
        ></Box>
        <AppGridContainer>
          <Grid item xs={12} md={12}>
            <AppCard contentStyle={{px: 0}}>
              <CartTable cartItems={data.CartItem} OrderState={data.status}/>
            </AppCard>
          </Grid>

          <Grid item xs={12} md={12}>
            <OrderSummary cartItems={data.CartItem} shippingInfo={data.shipping} OrderState={data.status} />
          </Grid>
        </AppGridContainer>
      </Box>
    </AppAnimate>
  );
};
Carts.propTypes = {
  data: PropTypes.object.isRequired,
  stat: PropTypes.func,
};
export default Carts;

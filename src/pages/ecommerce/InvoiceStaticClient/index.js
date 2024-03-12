import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Header from './Header';
import ItemList from './ItemList';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppTableContainer from '../../../@crema/core/AppTableContainer';
import AppAnimate from '../../../@crema/core/AppAnimate';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
// import invoiceData from '../../../@crema/services/db/extraPages/invoice/invoiceData';
import Table from '@mui/material/Table';

const Invoice1 = ({dateRage, orders, customerData}) => {
  const [productsToShow, setProductsToShow] = useState([]);
  const [billingInfo, setBillingInfo] = useState();
  const [sum, setSum] = useState(0);
  console.log(billingInfo);
  useEffect(() => {
    if (!orders.length) {
      return;
    }
    let sum = 0;
    let products = [];
    orders.map((order) => {
      if (
        new Date(order.time) >= dateRage[0] &&
        new Date(order.time) < dateRage[1]
      ) {
        order.CartItem.map((item) => {
          products.push({...item});
          sum += item.sum;
        });
      }
    });
    setProductsToShow([...products]);
    setSum(sum);
    setBillingInfo({...orders[0].BilingInformtion});
  }, [dateRage, orders]);

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{flex: 1, maxWidth: 900, width: '100%'}}>
          <Card
            sx={{
              p: {xs: 6, xl: 8},
              minHeight: 1000,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Header customerData={customerData} dateRage={dateRage} />
            <Box sx={{mb: 5}}>
              <AppTableContainer>
                <ItemList products={productsToShow} />
              </AppTableContainer>
            </Box>

            <Box
              sx={{
                mt: 'auto',
                display: 'flex',
                flexDirection: {xs: 'column', sm: 'row'},
                justifyContent: {sm: 'space-between'},
                borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                pt: 4,
              }}
            >
              <Box>
                <Box
                  component='h4'
                  sx={{
                    mb: {xs: 3, lg: 4},
                    color: 'text.secondary',
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: Fonts.REGULAR,
                  }}
                >
                  <IntlMessages id='invoice.thankYou' />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AppTableContainer
                  sxStyle={{
                    width: {xs: 'auto', sm: '100%'},
                  }}
                >
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          colSpan='3'
                          component='th'
                          scope='row'
                          sx={{border: '0 none', p: 1.5}}
                        >
                          <Box
                            sx={{
                              textAlign: 'right',
                              mr: 10,
                              color: 'text.secondary',
                              fontSize: 13,
                              fontWeight: Fonts.MEDIUM,
                            }}
                          >
                            <IntlMessages id='invoice.subTotal' />
                          </Box>
                        </TableCell>
                        <TableCell sx={{border: '0 none', p: 1.5}}>
                          <Box
                            sx={{
                              color: 'text.primary',
                              textAlign: 'right',
                              fontSize: 13,
                              fontWeight: Fonts.MEDIUM,
                            }}
                          >
                            {sum}
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </AppTableContainer>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default Invoice1;

Invoice1.propTypes = {
  orders: PropTypes.array,
  customerData: PropTypes.object,
  dateRage: PropTypes.array,
};

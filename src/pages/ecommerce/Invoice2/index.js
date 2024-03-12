import React from 'react';
import Card from '@mui/material/Card';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Box from '@mui/material/Box';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Header from './Header';
// import CustomerHeader from './CustomerHeader';
import ItemList from './ItemList';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppTableContainer from '../../../@crema/core/AppTableContainer';
import AppAnimate from '../../../@crema/core/AppAnimate';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import PropTypes from 'prop-types';
import {Divider, IconButton, Tooltip} from '@mui/material';
import {downloadPDF} from '../../reports/utils';
import {PrintOutlined} from '@mui/icons-material';
import {generatePDFBlob} from './generatePDFBlob';
const handleDownloadPDF = async (id) => {
  console.log(id);
  downloadPDF('pdf-content', id);
};
export const printPDF = async (elementId) => {
  try {
      const pdfBlob = await generatePDFBlob(elementId);
      const url = URL.createObjectURL(pdfBlob);

      window.open(url, '_blank');
  } catch (error) {
      console.error('Error generating PDF:', error);
  }
};

const Invoice2 = ({data}) => {
  const ref = React.createRef();
  console.log(data);
  let tofer = data.discount;
  // data.CartItem.map((item) => {
  //   item.sale_price
  //     ? (tofer += (item.price - item.sale_price) * item.qty)
  //     : tofer;
  // });

  tofer = tofer.toFixed(2);
  // let total = data.totalPrice ;
  return (
    <>
      <div ref={ref} id='pdf-content'>
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{flex: 1, maxWidth: 1200, width: '100%'}}>
              <Card
                sx={{
                  p: {xs: 6, xl: 8},
                  minHeight: 1000,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Header data={data} />
                <Divider />
                {/* <CustomerHeader data={data} /> */}
                <Box sx={{mb: 5}}>
                  <AppTableContainer>
                    <ItemList data={data} />
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
                                ₪{data.price}
                              </Box>
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell
                              colSpan='3'
                              component='th'
                              scope='row'
                              sx={{border: '0 none', p: 1.5}}
                            >
                              <Box
                                sx={{
                                  color: 'text.secondary',
                                  textAlign: 'right',
                                  mr: 10,
                                  fontSize: 13,
                                  fontWeight: Fonts.MEDIUM,
                                }}
                              >
                                <IntlMessages id='invoice.rebate' />
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
                                ₪{tofer}
                              </Box>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              colSpan='3'
                              component='th'
                              scope='row'
                              sx={{border: '0 none', p: 1.5}}
                            >
                              <Box
                                sx={{
                                  color: 'text.secondary',
                                  textAlign: 'right',
                                  mr: 10,
                                  fontSize: 13,
                                  fontWeight: Fonts.MEDIUM,
                                }}
                              >
                                <IntlMessages id='ShippingCharge' />
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
                                ₪{data.shipping}
                              </Box>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              colSpan='3'
                              component='th'
                              scope='row'
                              sx={{border: '0 none', p: 1.5}}
                            >
                              <Box
                                sx={{
                                  color: 'text.secondary',
                                  textAlign: 'right',
                                  mr: 10,
                                  fontSize: 13,
                                  fontWeight: Fonts.MEDIUM,
                                }}
                              >
                                <IntlMessages id='invoice.grandTotal' />
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
                                ₪{data.totalPrice}
                              </Box>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </AppTableContainer>
                  </Box>
                </Box>
                <Divider />
              </Card>
            </Box>
          </Box>
        </AppAnimate>
      </div>
      <Box textAlign={'end'} id='downloadPdf'>
        <Tooltip title='Download PDF'>
          <IconButton onClick={() => handleDownloadPDF(data.orderId)}>
            <FileDownloadIcon color='primary' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Print invoice'>
          <IconButton onClick={() => printPDF('pdf-content')}>
            <PrintOutlined color='primary' />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};
Invoice2.propTypes = {
  data: PropTypes.object.isRequired,
};
export default Invoice2;

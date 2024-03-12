import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/utility/IntlMessages';
import Header from './component/Header';
import ItemList from './component/ItemList';
import { Fonts } from 'shared/constants/AppEnums';
import AppTableContainer from '@crema/core/AppTableContainer';
import AppAnimate from '@crema/core/AppAnimate';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';

const CInvoiceUI = ({ products, orderSummary, clientInfo, orderId }) => {
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

                <Box sx={{ flex: 1, maxWidth: 900, width: '100%' }}>
                    <Card
                        sx={{
                            p: { xs: 6, xl: 8 },
                            minHeight: 1000,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >

                        <Header orderId={orderId} userInfo={clientInfo} />
                        <Box sx={{ mb: 5 }}>
                            <AppTableContainer>
                                <ItemList products={products} />
                            </AppTableContainer>
                        </Box>

                        <Box
                            sx={{
                                mt: 'auto',
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                justifyContent: { sm: 'space-between' },
                                borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                                pt: 4,
                            }}
                        >
                            <Box>
                                <Box
                                    component='h4'
                                    sx={{
                                        mb: { xs: 3, lg: 4 },
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
                                        width: { xs: 'auto', sm: '100%' },
                                    }}
                                >
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell
                                                    colSpan='3'
                                                    component='th'
                                                    scope='row'
                                                    sx={{ border: '0 none', p: 1.5 }}
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
                                                <TableCell sx={{ border: '0 none', p: 1.5 }}>
                                                    <Box
                                                        sx={{
                                                            color: 'text.primary',
                                                            textAlign: 'right',
                                                            fontSize: 13,
                                                            fontWeight: Fonts.MEDIUM,
                                                        }}
                                                    >
                                                        ₪{orderSummary.totalPrice + orderSummary.shipping}
                                                    </Box>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell
                                                    colSpan='3'
                                                    component='th'
                                                    scope='row'
                                                    sx={{ border: '0 none', p: 1.5 }}
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
                                                <TableCell sx={{ border: '0 none', p: 1.5 }}>
                                                    <Box
                                                        sx={{
                                                            color: 'text.primary',
                                                            textAlign: 'right',
                                                            fontSize: 13,
                                                            fontWeight: Fonts.MEDIUM,
                                                        }}
                                                    >
                                                        ₪{orderSummary.discount}
                                                    </Box>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell
                                                    colSpan='3'
                                                    component='th'
                                                    scope='row'
                                                    sx={{ border: '0 none', p: 1.5 }}
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
                                                <TableCell sx={{ border: '0 none', p: 1.5 }}>
                                                    <Box
                                                        sx={{
                                                            color: 'text.primary',
                                                            textAlign: 'right',
                                                            fontSize: 13,
                                                            fontWeight: Fonts.MEDIUM,
                                                        }}
                                                    >
                                                        ₪{orderSummary.price}
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
CInvoiceUI.propTypes = {
    products: PropTypes.any,
    orderSummary: PropTypes.any,
    clientInfo: PropTypes.any,
    orderId: PropTypes.any
};

export default CInvoiceUI;

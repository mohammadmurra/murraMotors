import React from 'react';
import CInvoiceUI from './CInvoiceUI';
import PropTypes from 'prop-types';

const CInvoice = ({ products, orderSummary, clientInfo, orderId }) => {
  if (!products || products.length == 0) {
    return <></>;
  };
  return (

    <CInvoiceUI orderId={orderId} clientInfo={clientInfo} products={products} orderSummary={orderSummary} />
  );
};
CInvoice.propTypes = {
  products: PropTypes.any,
  orderSummary: PropTypes.any,
  clientInfo: PropTypes.any,
  orderId: PropTypes.any
};
export default CInvoice;

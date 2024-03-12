import React from 'react';
import {styled} from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
// import invoiceData from '../../../../@crema/services/db/extraPages/invoice/invoiceData';
import Table from '@mui/material/Table';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import PropTypes from 'prop-types';

const StyledTable = styled(Table)(() => ({
  '& > thead > tr > th, & > tbody > tr > th, & > tfoot > tr > th, & > thead > tr > td, & > tbody > tr > td, & > tfoot > tr > td':
    {
      padding: 8,
    },
}));

const ItemList = ({data}) => {
  return (
    <StyledTable>
      <TableHead>
        <TableHeading />
      </TableHead>

      <TableBody>
        {data.CartItem.map((product,index) => {
          return <TableItem key={product.id+index} product={product} />;
        })}
      </TableBody>
    </StyledTable>
  );
};
ItemList.propTypes = {
  data: PropTypes.object.isRequired,
};
export default ItemList;

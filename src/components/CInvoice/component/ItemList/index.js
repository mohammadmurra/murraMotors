import React from 'react';
import {styled} from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
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

const ItemList = ({products}) => {
  return (
    <StyledTable>
      <TableHead>
        <TableHeading />
      </TableHead>

      <TableBody>
        {products.map((product) => {
          return <TableItem key={product.id} product={product} />;
        })}
      </TableBody>
    </StyledTable>
  );
};

ItemList.propTypes = {
  products: PropTypes.any,
};

export default ItemList;

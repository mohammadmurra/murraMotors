import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHeader from '../../../../@crema/core/AppTable/TableHeader';
import {useIntl} from 'react-intl';
const TableHeading = () => {
  const {messages} = useIntl();
  return (
    <TableHeader>
      <TableCell align='left'>{messages['Product']}</TableCell>
      <TableCell align='left'>{messages['UnitPrice']}</TableCell>
      <TableCell align='left'>{messages['ecommerce.addproduct.count']}</TableCell>
      <TableCell align='left'>{messages['Total']}</TableCell>
      <TableCell />
    </TableHeader>
  );
};

export default TableHeading;

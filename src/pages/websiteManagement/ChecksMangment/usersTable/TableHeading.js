import React from 'react';
import {TableCell} from '@mui/material';
import TableHeader from '@crema/core/AppTable/TableHeader';
import {useIntl} from 'react-intl';
const TableHeading = () => {
  const {messages} = useIntl();
  return (
    <TableHeader>
      <TableCell>{messages['RowNumber']}</TableCell>
      <TableCell align='letf'>{messages['invoice.name']}</TableCell>{' '}
      <TableCell align='right'>{messages['common.edit']}</TableCell>
    </TableHeader>
  );
};

export default TableHeading;

import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHeader from '@crema/core/AppTable/TableHeader';
import { useIntl } from 'react-intl';

const TableHeading = () => {
  const { messages } = useIntl();
  return (
    <TableHeader>
      <TableCell align='left'>{messages['costID']}</TableCell>
      <TableCell align='left'>{messages['invoice.name']}</TableCell>
      <TableCell align='left'>{messages['common.amount']}</TableCell>
      <TableCell align='left'>{messages['ShortDescrption']}</TableCell>
      <TableCell align='left'>{messages['dashboard.createDate']}</TableCell>
      <TableCell align='left'>{messages['dashboard.deleteDate']}</TableCell>
    </TableHeader>
  );
};

export default TableHeading;

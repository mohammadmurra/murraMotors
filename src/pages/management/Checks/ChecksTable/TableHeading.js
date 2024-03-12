import React from 'react';
import {TableCell} from '@mui/material';
import TableHeader from '@crema/core/AppTable/TableHeader';
import {useIntl} from 'react-intl';
const TableHeading = () => {
  const {messages} = useIntl();
  return (
    <TableHeader>
      <TableCell>{messages['RowNumber']}</TableCell>
      <TableCell align='right'>{messages['CheckNumber']}</TableCell>{' '}
      <TableCell align='right'>{messages['OwnerName']}</TableCell>{' '}
      <TableCell align='right'>{messages['common.date']}</TableCell>{' '}
      <TableCell align='right'>{messages['invoice.value']}</TableCell>{' '}
      <TableCell align='right'>{messages['currency']}</TableCell>
      <TableCell align='right'>{messages['ConversionRateFaild2']}</TableCell>

      <TableCell align='right'>{messages['check.from']} </TableCell>
      <TableCell align='right'>{messages['common.status']}</TableCell>
      <TableCell align='right'>{messages['isDue']} </TableCell>
      <TableCell align='right'>{messages['common.edit']}</TableCell>
    </TableHeader>
  );
};

export default TableHeading;

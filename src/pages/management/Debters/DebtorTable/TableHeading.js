import React from 'react';
import { TableCell } from '@mui/material';
import TableHeader from '@crema/core/AppTable/TableHeader';
import { useIntl } from 'react-intl';

const TableHeading = () => {
  const { messages } = useIntl();
  return (
    <TableHeader>
      <TableCell align='left'>{messages['common.debtorName']}</TableCell>
      <TableCell align='left'>{messages['common.address']}</TableCell>
      <TableCell align='left'>{messages['common.phoneNumber']}</TableCell>
      <TableCell align='left'>{messages['common.general.notes']}</TableCell>
      <TableCell align='left'>{messages['common.createdDate']}</TableCell>
      <TableCell align='right'>{messages['Actions']}</TableCell>
    </TableHeader>
  );
};

export default TableHeading;

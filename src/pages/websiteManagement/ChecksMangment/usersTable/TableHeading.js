import React from 'react';
import {TableCell} from '@mui/material';
import TableHeader from '@crema/core/AppTable/TableHeader';
import {useIntl} from 'react-intl';
const TableHeading = () => {
  const {messages}=useIntl();
  return (
    <TableHeader>
     <TableCell>{messages['RowNumber']}</TableCell>
            <TableCell align='left'>{messages['checkbookNmae']}</TableCell>{' '}
            <TableCell align='letf'>{messages['OwnerName']}</TableCell>{' '}
            <TableCell align='letf'>{messages['bankName']}</TableCell>{' '}

            <TableCell align='right'>{messages['common.edit']}</TableCell>
    </TableHeader>
  );
};

export default TableHeading;

import React from 'react';
import {TableCell} from '@mui/material';
import TableHeader from '@crema/core/AppTable/TableHeader';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';

const TableHeading = ({hasUsd}) => {
  // Destructure hasUsd from props
  const {messages} = useIntl();
  return (
    <TableHeader>
      <TableCell>{messages['RowNumber']}</TableCell>
      <TableCell align='right'>{messages['CheckNumber']}</TableCell>
      <TableCell align='right'>{messages['OwnerName']}</TableCell>
      <TableCell align='right'>{messages['common.date']}</TableCell>
      <TableCell align='right'>{messages['invoice.value']}</TableCell>
      <TableCell align='right'>{messages['currency']}</TableCell>
      {hasUsd && (
        <TableCell align='right'>{messages['ConversionRateFaild2']}</TableCell>
      )}{' '}
      {/* Conditionally render */}
      {!hasUsd && <TableCell align='right'></TableCell>}{' '}
      {/* Conditionally render */}
      <TableCell align='right'>{messages['common.status']}</TableCell>
      <TableCell align='right'>{messages['isDue']}</TableCell>
      <TableCell align='right'>{messages['common.edit']}</TableCell>
    </TableHeader>
  );
};

export default TableHeading;

TableHeading.propTypes = {
  hasUsd: PropTypes.bool,
};

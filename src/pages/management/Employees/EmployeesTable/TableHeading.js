import React from 'react';
import {TableCell} from '@mui/material';
import TableHeader from '@crema/core/AppTable/TableHeader';

const TableHeading = () => {
  return (
    <TableHeader>
      <TableCell align='left'>Name</TableCell>
      <TableCell align='left'>Email</TableCell>
      <TableCell align='left'>Phone Number</TableCell>
      <TableCell align='left'>Role</TableCell>
      <TableCell align='left'>Adress</TableCell>
      <TableCell align='left'>Join Date</TableCell>
      <TableCell align='right'>Action</TableCell>
    </TableHeader>
  );
};

export default TableHeading;

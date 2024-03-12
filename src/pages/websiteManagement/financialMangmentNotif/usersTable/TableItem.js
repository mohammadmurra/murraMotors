import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import MainCateActions from './MainCateActions';

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: 14,
  padding: 8,
  '&:first-of-type': {
    paddingLeft: 20,
  },
  '&:last-of-type': {
    paddingRight: 20,
  },
}));

const TableItem = ({ data, index }) => {
  return (
    <TableRow className='item-hover'>
      <StyledTableCell component='th' scope='row'>
        {index + 1}
      </StyledTableCell>
      <StyledTableCell align='left'>{data.name}</StyledTableCell>
      <StyledTableCell align='left'>{data.email}</StyledTableCell>
      <TableCell align='right'>
        <MainCateActions data={data} />
      </TableCell>
    </TableRow>
  );
};

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default TableItem;

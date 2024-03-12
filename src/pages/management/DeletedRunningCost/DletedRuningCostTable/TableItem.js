import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';

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
const TableItem = ({data}) => {
  return (
    <TableRow key={data.id} className='item-hover'>
      <StyledTableCell component='th' scope='row'>
        <Box
          sx={{
            color: 'primary.main',
            borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`,
            display: 'inline-block',
          }}
        >
          {data.id}
        </Box>
      </StyledTableCell>
      <StyledTableCell align='left'>{data.name}</StyledTableCell>
      <StyledTableCell align='left'>{data.amount}</StyledTableCell>
      <StyledTableCell align='left'>{data.short_desc}</StyledTableCell>
      <StyledTableCell align='left'>{data.date}</StyledTableCell>
      <StyledTableCell align='left'>{data.EndDate}</StyledTableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};

import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import EmployeeActions from './EmployeeActions';
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
          {data.name}
        </Box>
      </StyledTableCell>
      <StyledTableCell align='left'>{data.email}</StyledTableCell>
      <StyledTableCell align='left'>{data.phone_Number}</StyledTableCell>
      <StyledTableCell align='left'>{data.role}</StyledTableCell>
      <StyledTableCell align='left'>{data.address}</StyledTableCell>
      <StyledTableCell align='left'>{data.addDate}</StyledTableCell>
      <StyledTableCell align='right'>
        <EmployeeActions employee={data} />
      </StyledTableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};

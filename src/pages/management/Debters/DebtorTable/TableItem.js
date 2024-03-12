import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CustomerTableActions from './DebtorsTableActions';
import { styled } from '@mui/material/styles';

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

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const TableItem = ({ data }) => {
  const formattedDate = formatDate(data.time);
  const truncatedAddress = truncateText(data.address, 30);
  const truncatedNotes = truncateText(data.notes, 50);

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
      <StyledTableCell align='left'>{truncatedAddress}</StyledTableCell>
      <StyledTableCell align='left'>{data.phoneNumber}</StyledTableCell>
      <StyledTableCell align='left'>{truncatedNotes}</StyledTableCell>
      <StyledTableCell align='left'>{formattedDate}</StyledTableCell>
      <StyledTableCell align='right'>
        <CustomerTableActions data={data} />
      </StyledTableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};

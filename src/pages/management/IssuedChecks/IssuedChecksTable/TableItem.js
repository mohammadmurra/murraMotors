import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import {styled} from '@mui/material/styles';
import {useIntl} from 'react-intl';
import {useNavigate} from 'react-router-dom';

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

const formatDate = (dateString) => {
  const date = new Date(parseInt(dateString));
  return date.toLocaleDateString();
};

const isCheckDatePassed = (checkDate) => {
  const today = new Date();
  const checkDateObject = new Date(parseInt(checkDate));
  return checkDateObject < today;
};

const TableItem = ({data, index}) => {
  const navigate = useNavigate();

  const {messages} = useIntl();

  // Conditional styling based on check status
  const rowStyle = data.rejected
    ? {backgroundColor: '#ffebee'} // Highlight row in red if rejected
    : isCheckDatePassed(data.date) && !data.cashed
    ? {backgroundColor: '#e8f5e9'} // Highlight row in green if date passed, not cashed, not rejected
    : data.cashed
    ? {backgroundColor: '#9ec3ff'}
    : {};

  // Function to navigate to the check details/edit page
  const handleEditCheck = (checkId) => {
    navigate(`/management/Checks/IssuedCheckDetails/${checkId}`); // Update with the correct path
  };

  return (
    <TableRow key={data.id} style={rowStyle}>
      <StyledTableCell>{index + 1}</StyledTableCell>

      <StyledTableCell>{data.checkNumber}</StyledTableCell>
      <StyledTableCell align='right'>{data.ownerName}</StyledTableCell>
      <StyledTableCell align='right'>{formatDate(data.date)}</StyledTableCell>
      <StyledTableCell align='right'>{data.value}</StyledTableCell>
      <StyledTableCell align='right'>{data.currency}</StyledTableCell>
      <StyledTableCell align='right'>{data.conversionRate}</StyledTableCell>

      <StyledTableCell align='right'>
        {data.rejected
          ? messages['Rejected']
          : data.cashed
          ? messages['checkCahsed']
          : messages['NotCashedYet']}
      </StyledTableCell>
      <StyledTableCell align='right'>
        {!data.cashed
          ? isCheckDatePassed(data.date)
            ? messages['common.yes']
            : messages['common.no']
          : ''}
      </StyledTableCell>

      <StyledTableCell align='right'>
        <IconButton onClick={() => handleEditCheck(data.id)}>
          <EditIcon />
        </IconButton>
      </StyledTableCell>
    </TableRow>
  );
};

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default TableItem;

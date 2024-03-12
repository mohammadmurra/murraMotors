import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '../../../../@crema/core/AppTableContainer';

const CustomerTable = ({checks}) => {
  return (
    <AppTableContainer>
      <Table stickyHeader className='table'>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {checks.map((data,index) => (
            <TableItem data={data} key={data.id} index={index}  />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default CustomerTable;

CustomerTable.defaultProps = {
  checks: [],
};

CustomerTable.propTypes = {
  checks: PropTypes.array,
};

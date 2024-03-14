import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '../../../../@crema/core/AppTableContainer';

const usersTable = ({employees,handleAddSuccess}) => {
  
  return (
    <AppTableContainer>
      <Table stickyHeader className='table'>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {employees.map((data,index) => (
            <TableItem data={data} key={data.orderId} index={index} handleAddSuccess={handleAddSuccess}/>
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default usersTable;

usersTable.defaultProps = {
  employees: [],
};

usersTable.propTypes = {
  employees: PropTypes.array,
  handleAddSuccess:PropTypes.func.isRequired,
};

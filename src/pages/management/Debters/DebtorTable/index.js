import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '../../../../@crema/core/AppTableContainer';

const DebtorTable = ({debtors}) => {
  console.log(debtors);
  return (
    <AppTableContainer>
      <Table stickyHeader className='table'>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {debtors.map((data) => (
            <TableItem data={data} key={data.id} />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default DebtorTable;

DebtorTable.defaultProps = {
  debtors: [],
};

DebtorTable.propTypes = {
  debtors: PropTypes.array,
};

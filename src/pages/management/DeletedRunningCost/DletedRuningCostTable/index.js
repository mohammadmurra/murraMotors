import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '../../../../@crema/core/AppTableContainer';

const DletedRuningCostTable = ({runingCostData}) => {
  console.log('table', runingCostData);
  return (
    <AppTableContainer>
      <Table stickyHeader className='table'>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {runingCostData.map((data) => (
            <TableItem data={data} key={data.orderId} />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default DletedRuningCostTable;

DletedRuningCostTable.defaultProps = {
  runingCostData: [],
};

DletedRuningCostTable.propTypes = {
  runingCostData: PropTypes.array,
};
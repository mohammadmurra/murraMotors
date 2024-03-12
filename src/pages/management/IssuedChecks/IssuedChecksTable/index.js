import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '../../../../@crema/core/AppTableContainer';

const IssuedChecksTable = ({ checks }) => {
  const [hasUsd, setHasUsd] = useState(false);

  useEffect(() => {
    // Check if any check has the currency set to "USD"
    const checkForUsd = checks.some(check => check.currency === 'USD');
    setHasUsd(checkForUsd);
  }, [checks]); // This effect runs whenever the 'checks' array changes.

  return (
    <AppTableContainer>
      <Table stickyHeader className='table'>
        <TableHead>
          <TableHeading hasUsd={hasUsd} />
        </TableHead>
        <TableBody>
          {checks.map((data, index) => (
            <TableItem data={data} key={data.id} index={index} />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default IssuedChecksTable;

IssuedChecksTable.defaultProps = {
  checks: [],
};

IssuedChecksTable.propTypes = {
  checks: PropTypes.array,
};

import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';
import {Fonts} from '../../../../shared/constants/AppEnums';

const TableItem = (props) => {
  const {product} = props;
  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        <Box
          sx={{
            mb: 2,

            fontSize: 13,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          {product.name}
        </Box>
        <Box component='p' sx={{color: 'text.secondary', mb: 0}}>
          {product.short_desc} {product.id}
        </Box>
      </TableCell>
      <TableCell
        sx={{
          verticalAlign: 'top',
        }}
      >
        <Box
          sx={{
            mb: 2,

            textAlign: 'right',
            fontSize: 13,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          {product.slug}
        </Box>
      </TableCell>
      <TableCell
        sx={{
          verticalAlign: 'top',
        }}
      >
        <Box
          sx={{
            mb: 2,

            textAlign: 'right',
            fontSize: 13,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          {product.qty}
        </Box>
      </TableCell>
      <TableCell
        sx={{
          verticalAlign: 'top',
        }}
      >
        <Box
          sx={{
            mb: 2,

            textAlign: 'right',
            fontSize: 13,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          ₪{product.price}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  product: PropTypes.object.isRequired,
};

import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import {Avatar, Box} from '@mui/material';
import {Fonts} from '../../../../shared/constants/AppEnums';

const TableItem = (props) => {
  const {product} = props;
  // console.log(product);
  // let type = '';
  // product.sale_price ? (type = 'on Sale') : (type = 'Defult');
  return (
    <TableRow>
      <TableCell component='th' scope='row'>
      <>
          
      <Box display='flex'>
          <Avatar
           style={{cursor: 'pointer'}}
           sx={{mr: 5}}
            src={product.sm_pictures[0].url}
          />
          <Box>
            <Box
              fontSize={14}
              fontWeight={Fonts.MEDIUM}
              style={{cursor: 'pointer'}}
            >
               {product.name}
            </Box>
            <Box
              color='text.secondary'
              fontSize={14}
              style={{cursor: 'pointer'}}
            >
              Brand: {product.brand[0].name}
            </Box>
          </Box>
        </Box>
        </>

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

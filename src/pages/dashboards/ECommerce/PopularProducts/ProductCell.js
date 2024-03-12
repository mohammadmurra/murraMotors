import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import {Fonts} from '../../../../shared/constants/AppEnums';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';

const ProductCell = ({data}) => {
  const navigation = useNavigate();
  const handleViewOrder = () => {
    navigation('/product-management/product_detail/' + data.id, {
      state: data,
    });
  };
  return (
    <Box
      key={data.id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 2,
        px: 5,
      }}
      className='item-hover'
    >
      <Avatar
        sx={{
          mr: 4,
          height: 70,
          width: 70,
        }}
        variant='rounded'
        alt=''
        src={data.sm_pictures[0].url}
      />

      <Box
        sx={{
          flex: 1,
        }}
      >
        <Box
          component='h3'
          sx={{
            color: 'primary.main',
            fontWeight: Fonts.MEDIUM,
            mb: 0.5,
            fontSize: 14,
          }}
          onClick={handleViewOrder}
        >
          {data.name}
        </Box>
        <Box
          component='p'
          sx={{
            fontSize: 14,
            color: 'text.secondary',
            mb: 1,
          }}
        >
          {data.short_desc}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCell;

ProductCell.propTypes = {
  data: PropTypes.object,
};

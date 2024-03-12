import React, {useEffect, useState} from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {styled} from '@mui/material/styles';
import {getCartProduct} from '@crema/services/auth/firebase/firebase';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {removeCartItem, updateCartItem} from '../../../../redux/actions';

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

const TableItem = ({data, stat, orderState}) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState();
  const [item, setItem] = useState();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(0);
  var order = JSON.parse(sessionStorage.getItem('order')); //no brackets
  useEffect(() => {
    setQuantity(data.qty);
    var p = new Promise(function (resolve) {
      setTimeout(function () {
        resolve(getCartProduct(data));
        console.log('hereeeeeeeee');
      }, 300);
    });

    p.then((result) => {
      console.log(result);
      setItems(result);
    }).catch((err) => {
      console.log(err);
    });
  }, [data]);

  useEffect(async () => {
    stat(await item);
  }, [item]);

  const onRemoveItem = (data) => {
    setItem(getCount(data, 'X'));
  };

  const onDecrement = async () => {
    setItem(getCount(data, '-'));
    // if (data.qty > 0) {
    // dispatch(updateCartItem({...data, qty: data.qty - 1}));
    // } else {
    //   // dispatch(removeCartItem(data));
    // }
  };
  const onIncrement = async () => {
    setItem(getCount(data, '+'));
  };
  async function getCount(data, opration) {
    let prodact = data.name.split(/ [,. ,-\s]/);
    if (prodact.length == 1) {
      if (opration === '+') {
        if (items.stock > 1) {
          data.qty++;
          setQuantity(data.qty);
          items.stock--;
        }
      } else if (opration === '-') {
        items.qty++;
        data.qty--;
        setQuantity(data.qty);
      } else {
        items.qty += data.qty;
        data.qty = 0;
        setQuantity(data.qty);
      }
    } else if (prodact[2] == ' Regular') {
      let index = items.variants.findIndex(
        (item) => item.color_name == prodact[1].trim(),
      );
      if (opration === '+') {
        if ( items.variants[index].count> 0) {
          items.stock--;
          items.sold++;
          items.variants[index].count > 0
            ? items.variants[index].count-- && data.qty++
            : '';
          setQuantity(data.qty);
        }
      } else if (opration === '-') {
        items.stock++;
        items.variants[index].count++;
        items.sold--;
        data.qty--;
        setQuantity(data.qty);
      } else {
        items.variants[index].count += data.qty;
        items.sold -= data.qty;
        data.qty = 0;
        setQuantity(data.qty);
      }
    } else if (prodact[1] === ' default') {
      let index = items.variants[0].size.findIndex(
        (item) => item.name == prodact[2].trim(),
      );

      if (opration === '+') {
        if (items.stock > 0) {
          items.stock--;
          items.sold++;
          items.variants[0].size[index].count--;
          data.qty++;
          setQuantity(data.qty);
        }
      } else if (opration === '-') {
        items.variants[0].size[index].count++;
        items.stock++;

        items.sold--;
        data.qty--;
        setQuantity(data.qty);
      } else {
        items.variants[0].size[index].count += data.qty;
        items.sold -= data.qty;
        data.qty = 0;
        setQuantity(data.qty);
      }
    } else {
      let colerindex = items.variants.findIndex(
        (item) => item.color_name == prodact[1].trim(),
      );

      let Sizeindex = items.variants[colerindex].size.findIndex(
        (item) => item.name == prodact[2].trim(),
      );
      if (opration === '+') {
        if (items.stock > 0) {
          items.stock--;
          items.sold++;
          items.variants[colerindex].size[Sizeindex].count--;
          data.qty++;
          setQuantity(data.qty);
        }
      } else if (opration === '-') {
        items.variants[colerindex].size[Sizeindex].count++;
        items.stock++;

        items.sold--;
        data.qty--;
        setQuantity(data.qty);
      } else {
        items.variants[colerindex].size[Sizeindex].count += data.qty;
        items.sold -= data.qty;
        data.qty = 0;
        setQuantity(data.qty);
      }
    }
    if (data.qty == 0) {
      dispatch(removeCartItem(data));
    } else dispatch(updateCartItem(data));
    data.sum = data.qty * data.price;

    let index = order.CartItem.findIndex((item) => item.id == data.id);
    order.CartItem[index] = data;
    window.sessionStorage.setItem('order', JSON.stringify(order));
    items.id = Number(items.id);
    return await items;
  }
  const handleViewProduct = () => {
    console.log(data.id);
    navigate('/product-management/product_detail/' + data.id);
  };
  return (
    <TableRow key={data.id} className='item-hover'>
      <StyledTableCell>
        <Box display='flex'>
          <Avatar
            sx={{mr: 3.5}}
            src={data.sm_pictures[0].url}
            onClick={handleViewProduct}
            style={{cursor: 'pointer'}}
          />
          <Box>
            <Box
              fontSize={14}
              fontWeight={Fonts.MEDIUM}
              onClick={handleViewProduct}
              style={{cursor: 'pointer'}}
            >
              {data.name}
            </Box>
            <Box
              color='text.secondary'
              fontSize={14}
              onClick={handleViewProduct}
              style={{cursor: 'pointer'}}
            >
              Brand: {data.slug}
            </Box>
          </Box>
        </Box>
      </StyledTableCell>

      <StyledTableCell align='left' fontWeight={Fonts.MEDIUM}>
        ₪{data.price.toFixed(2)}
      </StyledTableCell>
      {orderState == 'Pending' ? (
        <>
          <StyledTableCell align='left'>
            <Box
              border={1}
              borderRadius={4}
              display='flex'
              borderColor='text.secondary'
              alignItems='center'
              justifyContent='center'
              width={100}
              height={36}
            >
              <AddIcon className='pointer' onClick={onIncrement} />
              <Box component='span' px={3}>
                {quantity ? quantity : 0}
              </Box>
              <RemoveIcon className='pointer' onClick={onDecrement} />
            </Box>
          </StyledTableCell>
        </>
      ) : (
        <StyledTableCell align='left' fontWeight={Fonts.MEDIUM}>
          {quantity}
        </StyledTableCell>
      )}
      <StyledTableCell align='left' fontWeight={Fonts.MEDIUM}>
        ₪{data.price.toFixed(2) * quantity}
      </StyledTableCell>
      {orderState != 'Pending' ? (
        <StyledTableCell
          align='left'
          fontWeight={Fonts.MEDIUM}
        ></StyledTableCell>
      ) : (
        ''
      )}
      {orderState == 'Pending' ? (
        <StyledTableCell component='th' scope='row'>
          <CancelIcon onClick={() => onRemoveItem(data)} />
        </StyledTableCell>
      ) : (
        ''
      )}
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
  orderState: PropTypes.any.isRequired,
  items: PropTypes.array,
  stat: PropTypes.func,
};

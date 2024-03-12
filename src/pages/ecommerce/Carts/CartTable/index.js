import React, {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '../../../../@crema/core/AppTableContainer';
import PropTypes from 'prop-types';
import {getCartItems} from 'redux/actions';
import {useDispatch, useSelector} from 'react-redux';

const CartTable = ({cartItems ,OrderState}) => {
  //  const [temp ,setTemp] = useState();

  const dispatch = useDispatch();
  console.log(OrderState);
  let x = useSelector(({ecommerce}) => ecommerce);
  console.log(x);
  useEffect(() => {
    dispatch(getCartItems(cartItems));
  }, [dispatch]);
  const setData = (e) => {
    if (e) {
      var prod = JSON.parse(sessionStorage.getItem('items')); //no brackets
      if (prod.length !== 0 && prod.length) {
        console.log(prod);

        let index = prod.findIndex((item) => item.id == e.id);
        if (index !== -1) {
          console.log(index);
          prod[index] = e;
        } else {
          prod.push(e);
        }
      } else {
        prod.push(e);
      }
      window.sessionStorage.setItem('items', JSON.stringify(prod));
    }
  };
  return (
    <AppTableContainer>
      <Table stickyHeader className='table'>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {cartItems.map((data) => (
            <TableItem data={data} orderState={OrderState} stat={(e) => setData(e)} key={data.id} />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default CartTable;

CartTable.propTypes = {
  cartItems: PropTypes.array,
  OrderState: PropTypes.any,
  stat: PropTypes.func,
};

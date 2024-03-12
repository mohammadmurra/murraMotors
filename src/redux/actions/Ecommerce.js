import {
  ADD_CART_ITEM,
  FETCH_ERROR,
  FETCH_START,
  GET_CHECKS,
  FETCH_SUCCESS,
  GET_CUSTOMERS,
  GET_ECOMMERCE_LIST,
  GET_RECENT_ORDER,
  GET_RECENT_TRANS,
  GET_DEBTORS,
  GET_ISSUED_CHECKS,
  REMOVE_CART_ITEM,
  SET_FILTER_DATA,
  SET_PRODUCT_DATA,
  SET_PRODUCT_VIEW_TYPE,
  GET_MAIL,
  GET_FINANCIAL_NOTIF_USERS,
  UPDATE_CART_ITEM,
  // SET_SearchFILTER_DATA,
  GET_EMPlOYEES,
  GET_OLDEMPlOYEES,
  GET_COUPON,
  GET_AllMainCategories,
  GET_RUNING_COST,
  GET_TRANSACTION,
  GET_DELRUNING_COST,
  SET_CART_ITEMS,
  GET_SALEPOINT,
  GET_OLDSALEPOINT,
} from '../../shared/constants/ActionTypes';
import jwtAxios from '@crema/services/auth/jwt-auth';

export const onGetEcommerceData = (filterData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/list', {
        params: {filterData},
      })
      .then((data) => {
        if (data.status === 200) {
          
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_ECOMMERCE_LIST, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const getProductDetail = (id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/get', {
        params: {id: id},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SET_PRODUCT_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const getRecentOrders = (searchOrder,search, page, index, isNext) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/orders', {
        params: {searchOrder,search, page, index, isNext},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_RECENT_ORDER, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const resetOrder = () => {
  return (dispatch) => {
    dispatch({
      type: GET_RECENT_ORDER,
      payload: {
        recentOrders: [],
        orderCount: 0,
        lastVisible: '',
      },
    });
  };
};
export const resetTrans = () => {
  return (dispatch) => {
    dispatch({
      type: GET_RECENT_TRANS,
      payload: {
        Transaction: [],
        transactionCount: 0,
        lastVisible: '',
      },
    });
  };
};
export const getCustomers = (search, page, index, isNext) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/customers', {
        params: {search, page, index, isNext},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_CUSTOMERS, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const getChecks = (search, page, index, isNext) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/checks', {
        params: {search, page, index, isNext},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_CHECKS, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const getDebtors = (search, page, index, isNext) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/debtors', {
        params: {search, page, index, isNext},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_DEBTORS, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const getIssuedChecks = (search, page, index, isNext) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/issuedChecks', {
        params: {search, page, index, isNext},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_ISSUED_CHECKS, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const getEmployee = (search, page, index, isNext) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/employees', {
        params: {search, page, index, isNext},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_EMPlOYEES, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const getOldEmployee = (search, page, index, isNext) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/Oldemployees', {
        params: {search, page, index, isNext},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_OLDEMPlOYEES, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const getCartItems = (item) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/cart/get', {
        params: {item},
      })
      .then((data) => {
        if (data.status === 200) {
          
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SET_CART_ITEMS, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const setViewType = (viewType) => {
  return (dispatch) => {
    dispatch({type: SET_PRODUCT_VIEW_TYPE, payload: viewType});
  };
};

export const removeCartItem = (data) => {
  return (dispatch) => {
    dispatch({type: REMOVE_CART_ITEM, payload: data});
  };
};

export const updateCartItem = (data) => {
  return (dispatch) => {
    
    dispatch({type: UPDATE_CART_ITEM, payload: data});
  };
};

export const addItemToCart = (data) => {
  return (dispatch) => {
    dispatch({type: ADD_CART_ITEM, payload: data});
  };
};

export const setCurrentProduct = (product) => {
  return (dispatch) => {
    dispatch({type: SET_PRODUCT_DATA, payload: product});
  };
};

export const setFilters = (filters) => {
  return (dispatch) => {
    dispatch({type: SET_FILTER_DATA, payload: filters});
  };
};
export const searchFilter = (data) => {
  
  return (dispatch) => {
    dispatch({type: FETCH_SUCCESS});
    dispatch({type: GET_ECOMMERCE_LIST, payload: data});
  };
};
export const getruningCost = (search, page, index, isNext) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/RuningCost', {
        params: {search, page, index, isNext},
      })
      .then((data) => {
        
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_RUNING_COST, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const getMail = (search, page, index, isNext) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/Mail', {
        params: {search, page, index, isNext},
      })
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_MAIL, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
/////////////////////////readed feedbacks
export const getReadedMail = (search, page, index, isNext) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/ReadedMail', {
        params: {search, page, index, isNext},
      })
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_MAIL, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
//////////////////////////////
export const getTransaction = (search, page, index, isNext,typeOfRequst) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/Transaction', {
        params: {search, page, index, isNext,typeOfRequst},
      })
      .then((data) => {
        // console.log(data);
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_TRANSACTION, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};


export const getDeletedRuningCost = (search, page, index, isNext) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/DeletedRuningCost', {
        params: {search, page, index, isNext},
      })
      .then((data) => {
        
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_DELRUNING_COST, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const getSalePoint = (search, page, index, isNext) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/salePoint', {
        params: {search, page, index, isNext},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_SALEPOINT, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const getCoupn = (search, page, index, isNext) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/coupon', {
        params: {search, page, index, isNext},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_COUPON, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
/////////////////////////////////////////////
export const getMainCategories = (search, page, index, isNext) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/MainCategories', {
        params: {search, page, index, isNext},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_AllMainCategories, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };

};
///////////////////////////////
// redux/actions.js
export const getFinancialNotifications = (search, page, index, isNext) => {
  console.log("getFinancialNotifications1");
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/getFinancialNotificationUsers', {
        params: {search, page, index, isNext},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_FINANCIAL_NOTIF_USERS, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };

};


export const getOldSalePoint = (search, page, index, isNext) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/api/ecommerce/OldsalePoint', {
        params: {search, page, index, isNext},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_OLDSALEPOINT, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

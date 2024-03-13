import {
  ADD_CART_ITEM,
  GET_CUSTOMERS,
  GET_DEBTORS,
  GET_ISSUED_CHECKS,

  GET_ECOMMERCE_LIST,
  GET_RECENT_ORDER,
  GET_RECENT_TRANS,
  REMOVE_CART_ITEM,
  GET_MAIL,
  GET_CHECKBOOKS,
  SET_CART_ITEMS,
  SET_FILTER_DATA,
  SET_SearchFILTER_DATA,
  SET_PRODUCT_DATA,
  SET_PRODUCT_VIEW_TYPE,
  UPDATE_CART_ITEM,
  GET_EMPlOYEES,
  GET_OLDEMPlOYEES,
  GET_RUNING_COST,
  GET_FINANCIAL_NOTIF_USERS,
  GET_DELRUNING_COST,
  GET_CHECKS,
  GET_TRANSACTION,
  GET_SALEPOINT,
  GET_COUPON,
  GET_AllMainCategories,
  GET_OLDSALEPOINT,
} from '../../shared/constants/ActionTypes';
import { cartItems } from '../../@crema/services/db/ecommerce/ecommerceData';

export const VIEW_TYPE = Object.freeze({ LIST: 1, GRID: 2 });
const initialState = {
  ecommerceList: [],
  viewType: VIEW_TYPE.LIST,
  currentProduct: null,
  orderCount: 0,
  filterData: {
    title: '',
    brand: [],
    ideaFor: [],
    discount: [],
    color: [],
    rating: [],
  },
  cartItems: cartItems,
  recentOrders: [],
  customers: [],
  customerCount: 0,
};

const ecommerceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ECOMMERCE_LIST:
      return {
        ...state,
        ecommerceList: action.payload,
      };
    case SET_PRODUCT_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload,
      };

    case SET_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };
    case SET_SearchFILTER_DATA:
      return {
        ...state,
        ecommerceList: action.payload,
      };

    case SET_PRODUCT_DATA:
      return {
        ...state,
        currentProduct: action.payload,
      };
    case GET_RECENT_TRANS:
      return {
        ...state,
        transactionCount: action.payload.transactionCount,
        Transaction: action.payload.Transaction,
        lastVisible: action.payload.lastVisible,
      };
    case GET_MAIL: {
      return {
        ...state,
        mailCount: action.payload.mailCount,
        Mail: action.payload.Mail,
        lastVisible: action.payload.lastVisible,
      };


    };
    case GET_RECENT_ORDER:
      return {
        ...state,
        recentOrders: action.payload.orders,
        orderCount: action.payload.orderCount,
        lastVisible: action.payload.lastVisible,
      };
    case GET_RUNING_COST:
      return {
        ...state,
        runingcostCount: action.payload.runingcostCount,
        runingcost: action.payload.runingcost,
        lastVisible: action.payload.lastVisible,
      };
    case GET_TRANSACTION:
      return {
        ...state,
        transactionCount: action.payload.transactionCount,
        Transaction: action.payload.Transaction,
        lastVisible: action.payload.lastVisible,
      };

    case GET_DELRUNING_COST:
      return {
        ...state,
        delruningcostCount: action.payload.delruningcostCount,
        delruningcost: action.payload.delruningcost,
        lastVisible: action.payload.lastVisible,
      };
      case GET_CHECKS:
        return {
          ...state,
          checksCount: action.payload.checksCount,
          checks: action.payload.checks,
          lastVisible: action.payload.lastVisible,
        };
        case GET_FINANCIAL_NOTIF_USERS:
          return {
            ...state,
            notifUsersCount: action.payload.notifUsersCount,
            notifUsers: action.payload.notifUsers,
            lastVisible: action.payload.lastVisible,
          };
          case GET_CHECKBOOKS:
            return {
              ...state,
              checkbooksCount: action.payload.checkbooksCount,
              checkbooks: action.payload.checkbooks,
              lastVisible: action.payload.lastVisible,
            };
    case SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
        dataItems: action.payload,
      };

    case UPDATE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),
      };

    case ADD_CART_ITEM: {
      let cartItems = [];

      cartItems = state.cartItems.map((item) => {
        if (+item.id === +action.payload.id) {
          item.qty = +item.count + 1;
        }
        return item;
      });
      return {
        ...state,
        cartItems: cartItems,
      };
    }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id,
        ),
      };

    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload.customers,
        customerCount: action.payload.customerCount,
        lastVisible: action.payload.lastVisible,
      };
      case GET_DEBTORS:
        return {
          ...state,
          debtors: action.payload.debtors,
          debtorCount: action.payload.debtorCount,
          lastVisible: action.payload.lastVisible,
        };
        case GET_ISSUED_CHECKS:
          return {
            ...state,
            checks: action.payload.checks,
            checksCount: action.payload.checksCount,
            lastVisible: action.payload.lastVisible,
          };
    case GET_COUPON:
      return {
        ...state,
        coupon: action.payload.coupon,
        couponCount: action.payload.couponCount,
        lastVisible: action.payload.lastVisible,
      };
    case GET_AllMainCategories:
      return {
        ...state,
        AllMainCategories: action.payload.mainCategories,
        AllMainCategoriesCount: action.payload.mainCategoriesCount,
        lastVisible: action.payload.lastVisible,
      };
    case GET_EMPlOYEES:
      return {
        ...state,
        employees: action.payload.employees,
        employeesCount: action.payload.employeesCount,
        lastVisible: action.payload.lastVisible,
      };
    case GET_OLDEMPlOYEES:
      return {
        ...state,
        Oldemployees: action.payload.Oldemployees,
        OldemployeesCount: action.payload.OldemployeesCount,
        lastVisible: action.payload.lastVisible,
      };

    case GET_SALEPOINT:
      return {
        ...state,
        salePoint: action.payload.salePoint,
        salePointCount: action.payload.salePointCount,
        lastVisible: action.payload.lastVisible,
      };
    case GET_OLDSALEPOINT:
      return {
        ...state,
        OldsalePoint: action.payload.OldsalePoint,
        OldsalePointCount: action.payload.OldsalePointCount,
        lastVisible: action.payload.lastVisible,
      };
    default:
      return state;
  }
};
export default ecommerceReducer;

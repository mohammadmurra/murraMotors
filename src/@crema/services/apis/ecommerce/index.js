import mock from '../MockConfig';
// import {cartItems} from '../../db/ecommerce/ecommerceData';
import {multiPropsFilter} from '../../../utility/helper/Utils';
import {firebase} from '../../auth/firebase/firebase';

const getProducts = async (request) => {
  // console.log(request.params);
  const {index} = request.params.filterData;
  const {title} = request.params.filterData;

  // if (request.params.filterData.brand
  //     ){

  //     }else
  if (title) {
    console.log('e');
  } else {
    let total = await firebase
      .firestore()
      .collection('databaseCount')
      .doc('products')
      .get();
    let sum = total.data().sum;

    total = total.data().count;
    const demoProducts = [];
    let lastVisible;
    if (!index) {
      console.log(' no index');
      await firebase
        .firestore()
        .collection('products')
        .orderBy('time', 'desc')
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
          querySnapshot.forEach((doc) => {
            demoProducts.push({...doc.data(), id: doc.id});
          });
        });
    } else if (request.params?.filterData?.isNext) {
      console.log('index with next');
      await firebase
        .firestore()
        .collection('products')
        .orderBy('time', 'desc')
        .startAfter(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            demoProducts.push({...doc.data(), id: doc.id});
          });
        });
    } else {
      console.log('index with no next');
      await firebase
        .firestore()
        .collection('products')
        .orderBy('time', 'asc')
        .endAt(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            demoProducts.push({...doc.data(), id: doc.id});
          });
        });
    }
    const {filterData} = request.params;

    const list = multiPropsFilter(demoProducts, filterData);
    return [200, {list, sum, lastVisible}];
  }
};

mock.onGet('/api/ecommerce/list').reply((request) => {
  let products = [];
  products = getProducts(request);

  return products;
});
const getSingleProduct = async (request) => {
  const {id} = request.params;
  let product = await firebase.firestore().collection('products').doc(id).get();

  product = product.data();

  return [200, product];
};
mock.onGet('/api/ecommerce/get').reply((request) => {
  return getSingleProduct(request);
});
mock.onGet('/api/product/damaged').reply(async (request) => {
  return await getDamagedProduct(request);
});

const getDamagedProduct = async (request) => {
  const {index} = request.params;
  const {isNext} = request.params;
  let length = await firebase
    .firestore()
    .collection('databaseCount')
    .doc('damagedProduct')
    .get();

  length = length.data().count;

  let damagedData = [];
  let lastVisible;
  if (!index) {
    await firebase
      .firestore()
      .collection('damaged_product')
      .orderBy('time', 'desc')
      .limit(40)
      .get()
      .then((querySnapshot) => {
        lastVisible =
          querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
        querySnapshot.forEach((doc) => {
          damagedData.push({...doc.data(), id: doc.id});
        });
      });
  } else if (isNext) {
    await firebase
      .firestore()
      .collection('damaged_product')
      .orderBy('time', 'desc')
      .startAfter(index)
      .limit(40)
      .get()
      .then((querySnapshot) => {
        lastVisible =
          querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

        querySnapshot.forEach((doc) => {
          damagedData.push({...doc.data(), id: doc.id});
        });
      });
  } else {
    await firebase
      .firestore()
      .collection('damaged_product')
      .orderBy('time', 'desc')
      .endAt(index)
      .limit(40)
      .get()
      .then((querySnapshot) => {
        lastVisible =
          querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
        querySnapshot.forEach((doc) => {
          damagedData.push({...doc.data(), id: doc.id});
        });
      });
  }

  return [
    200,
    {
      length: length,
      data: damagedData,
      lastVisible: lastVisible,
    },
  ];
};
const getSearchOrder = async (shearhORder, search) => {
  let field = '';
  let orders = [];

  if (search === 'Pending') field = 'Pending';
  else if (search === 'In Progress') field = 'InProgress';
  else if (search === 'In Delivery') field = 'InDelivery';
  else if (search === 'Completed') field = 'Completed';
  else if (search === 'Canceled') field = 'Canceled';
  else field = 'all';
  console.log(field);
  if (field === 'all') {
    console.log('hereee');

    await firebase
      .firestore()
      .collection('Orders')
      .where('orderId', '==', shearhORder)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          orders.push({...doc.data(), id: doc.id});
        });
      });
  } else {
    await firebase
      .firestore()
      .collection('Orders')
      .where('orderId', '==', shearhORder)
      .where('status', '==', field)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          orders.push({...doc.data(), id: doc.id});
        });
      });
  }
  return [
    200,
    {
      orderCount: orders.length,
      orders: orders,
      lastVisible: '',
    },
  ];
};
const getOrder = async (request) => {
  const {index} = request.params;
  const {isNext} = request.params;
  let length = await firebase
    .firestore()
    .collection('databaseCount')
    .doc('orderCount')
    .get();

  length = length.data().couont;

  let orders = [];
  let lastVisible;
  if (!index) {
    await firebase
      .firestore()
      .collection('Orders')
      .orderBy('time', 'desc')
      .limit(40)
      .get()
      .then((querySnapshot) => {
        lastVisible =
          querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
        querySnapshot.forEach((doc) => {
          orders.push({...doc.data(), id: doc.id});
        });
      });
  } else if (isNext) {
    console.log(index);
    await firebase
      .firestore()
      .collection('Orders')
      .orderBy('time', 'desc')
      .startAfter(index)
      .limit(40)
      .get()
      .then((querySnapshot) => {
        lastVisible =
          querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

        querySnapshot.forEach((doc) => {
          orders.push({...doc.data(), id: doc.id});
        });
      });
  } else {
    await firebase
      .firestore()
      .collection('Orders')
      .orderBy('time', 'desc')
      .endAt(index)
      .limit(40)
      .get()
      .then((querySnapshot) => {
        lastVisible =
          querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
        querySnapshot.forEach((doc) => {
          orders.push({...doc.data(), id: doc.id});
        });
      });
  }

  return [
    200,
    {
      orderCount: length,
      orders: orders,
      lastVisible: lastVisible,
    },
  ];
};

mock.onGet('/api/ecommerce/orders').reply((request) => {
  let orders = [];

  const {search} = request.params;

  const {searchOrder} = request.params;
  if (searchOrder) {
    orders = getSearchOrder(searchOrder, search);
  } else {
    if (search === 'all') {
      orders = getOrder(request);
    } else orders = getOrderStatus(request);
  }
  return orders;
});
mock.onGet('/api/ecommerce/RuningCost').reply((request) => {
  let runingcost = [];
  runingcost = getRuningCost(request);
  return runingcost;
});
mock.onGet('/api/ecommerce/Mail').reply((request) => {
  let mail = [];
  mail = getMail(request);
  console.log(mail);
  return mail;
});
mock.onGet('/api/ecommerce/ReadedMail').reply((request) => {
  let mail = [];
  mail = getReadedMail(request);
  console.log(mail);
  return mail;
});
mock.onGet('/api/ecommerce/Transaction').reply((request) => {
  console.log(request.params);
  let transaction = [];
  if (request.params.typeOfRequst == 'faild')
    transaction = getTransactionFaild(request);
  else if (request.params.typeOfRequst == 'suss')
    transaction = getTransactionSucess(request);
  return transaction;
});
////////////////////////////////////////////
const getTransactionFaild = async (request) => {
  const {index} = request.params;
  const {isNext} = request.params;
  const {search} = request.params;
  let transaction = [];

  if (search) {
    await firebase
      .firestore()
      .collection('Transaction')
      .where('status', '==', 'Failed')
      .where('BilingInformtion.firstname', '==', search.trim())

      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          transaction.push({...doc.data(), id: doc.id});
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
    return [
      200,
      {
        transactionCount: transaction.length,
        Transaction: transaction,
        lastVisible: '',
      },
    ];
  } else {
    console.log(request.params);
    let length = await firebase
      .firestore()
      .collection('databaseCount')
      .doc('Transaction')
      .get();

    length = length.data().faieldCount;
    console.log(length);
    let lastVisible;
    if (!index) {
      await firebase
        .firestore()
        .collection('Transaction')
        .where('status', '==', 'Failed')
        .orderBy('time', 'desc')
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
          querySnapshot.forEach((doc) => {
            transaction.push({...doc.data(), id: doc.id});
          });
        });
    } else if (isNext) {
      await firebase
        .firestore()
        .collection('Transaction')
        .orderBy('time', 'desc')
        .startAfter(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            transaction.push({...doc.data(), id: doc.id});
          });
        });
    } else {
      await firebase
        .firestore()
        .collection('Transaction')
        .orderBy('time', 'desc')
        .endAt(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            transaction.push({...doc.data(), id: doc.id});
          });
        });
    }

    return [
      200,
      {
        transactionCount: length,
        Transaction: transaction,
        lastVisible: lastVisible,
      },
    ];
  }
};
//////////////////////////////////////////
const getTransactionSucess = async (request) => {
  const {index} = request.params;
  const {isNext} = request.params;
  const {search} = request.params;
  let transaction = [];

  if (search) {
    await firebase
      .firestore()
      .collection('Transaction')
      .where('status', '==', 'Sucsess')
      .where('BilingInformtion.firstname', '==', search.trim())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          transaction.push({...doc.data(), id: doc.id});
        });
      });

    return [
      200,
      {
        transactionCount: transaction.length,
        Transaction: transaction,
        lastVisible: '',
      },
    ];
  } else {
    // console.log(request.params);
    let length = await firebase
      .firestore()
      .collection('databaseCount')
      .doc('Transaction')
      .get();

    length = length.data().sucessCount;
    // console.log(length);
    let lastVisible;
    if (!index) {
      await firebase
        .firestore()
        .collection('Transaction')
        .where('status', '==', 'Sucsess')
        .orderBy('time', 'desc')
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
          querySnapshot.forEach((doc) => {
            transaction.push({...doc.data(), id: doc.id});
          });
        });
    } else if (isNext) {
      await firebase
        .firestore()
        .collection('Transaction')
        .orderBy('time', 'desc')
        .startAfter(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            transaction.push({...doc.data(), id: doc.id});
          });
        });
    } else {
      await firebase
        .firestore()
        .collection('Transaction')
        .orderBy('time', 'desc')
        .endAt(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            transaction.push({...doc.data(), id: doc.id});
          });
        });
    }

    console.log(transaction);
    return [
      200,
      {
        transactionCount: length,
        Transaction: transaction,
        lastVisible: lastVisible,
      },
    ];
  }
};

///////////////////////////////////////////
const getRuningCost = async (request) => {
  const {index} = request.params;
  const {isNext} = request.params;
  const {search} = request.params;
  let runingcost = [];

  if (search) {
    await firebase
      .firestore()

      .collection('RuningCost')
      .where('isDeleted', '==', false)
      .where('id', '==', search)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          runingcost.push({...doc.data(), id: doc.id});
        });
      });
    return [
      200,
      {
        runingcostCount: runingcost.length,
        runingcost: runingcost,
        lastVisible: '',
      },
    ];
  } else {
    let length = await firebase
      .firestore()
      .collection('databaseCount')
      .doc('RuningCost')
      .get();

    length = length.data().sum;

    let lastVisible;
    if (!index) {
      await firebase
        .firestore()

        .collection('RuningCost')
        .where('isDeleted', '==', false)
        .orderBy('time', 'desc')
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
          querySnapshot.forEach((doc) => {
            runingcost.push({...doc.data(), id: doc.id});
          });
        });
    } else if (isNext) {
      await firebase
        .firestore()

        .collection('RuningCost')
        .where('isDeleted', '==', false)

        .orderBy('time', 'desc')
        .startAfter(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            runingcost.push({...doc.data(), id: doc.id});
          });
        });
    } else {
      await firebase
        .firestore()

        .collection('RuningCost')
        .where('isDeleted', '==', false)

        .orderBy('time', 'desc')
        .endAt(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            runingcost.push({...doc.data(), id: doc.id});
          });
        });
    }

    return [
      200,
      {
        runingcostCount: length,
        runingcost: runingcost,
        lastVisible: lastVisible,
      },
    ];
  }
};

///////////////////////////////

const getMail = async (request) => {
  const {index} = request.params;
  const {isNext} = request.params;
  const {search} = request.params;
  let mail = [];
  if (search) {
    console.log(search);

    await firebase
      .firestore()

      .collection('Mail')
      .where('Id', '==', search.trim())
      .where('isDeleted', '==', false)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          mail.push({...doc.data(), id: doc.id});
        });
      });
    console.log(mail);

    return [
      200,
      {
        mailCount: mail.length,
        Mail: mail,
        lastVisible: '',
      },
    ];
  } else {
    let length = await firebase
      .firestore()
      .collection('databaseCount')
      .doc('customerFeedbacksCount')
      .get();

    length = length.data().sum;

    let lastVisible;
    if (!index) {
      await firebase
        .firestore()
        .collection('Mail')
        .where('isDeleted', '==', false)
        .orderBy('time', 'desc')
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
          querySnapshot.forEach((doc) => {
            mail.push({...doc.data(), id: doc.id});
          });
        });
    } else if (isNext) {
      await firebase
        .firestore()
        .collection('Mail')
        .where('isDeleted', '==', false)
        .orderBy('time', 'desc')
        .startAfter(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            mail.push({...doc.data(), id: doc.id});
          });
        });
    } else {
      await firebase
        .firestore()
        .collection('Mail')
        .where('isDeleted', '==', false)
        .orderBy('time', 'desc')
        .endAt(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            mail.push({...doc.data(), id: doc.id});
          });
        });
    }
    console.log(mail);
    console.log(length);
    return [
      200,
      {
        mailCount: length,
        Mail: mail,
        lastVisible: lastVisible,
      },
    ];
  }
};
///////////////////////////////READED EMAIL

const getReadedMail = async (request) => {
  const {index} = request.params;
  const {isNext} = request.params;
  const {search} = request.params;
  let mail = [];

  if (search) {
    await firebase
      .firestore()

      .collection('Mail')
      .where('Id', '==', search.trim())
      .where('isDeleted', '==', true)

      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          mail.push({...doc.data(), id: doc.id});
        });
      });
    console.log(mail);

    return [
      200,
      {
        mailCount: mail.length,
        Mail: mail,
        lastVisible: '',
      },
    ];
  } else {
    let length = await firebase
      .firestore()
      .collection('databaseCount')
      .doc('customerFeedbacksCount')
      .get();

    length = length.data().count - length.data().sum;

    let lastVisible;
    if (!index) {
      await firebase
        .firestore()
        .collection('Mail')
        .where('isDeleted', '==', true)
        .orderBy('time', 'desc')
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
          querySnapshot.forEach((doc) => {
            mail.push({...doc.data(), id: doc.id});
          });
        });
    } else if (isNext) {
      await firebase
        .firestore()
        .collection('Mail')
        .where('isDeleted', '==', true)
        .orderBy('time', 'desc')
        .startAfter(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            mail.push({...doc.data(), id: doc.id});
          });
        });
    } else {
      await firebase
        .firestore()
        .collection('Mail')
        .where('isDeleted', '==', true)
        .orderBy('time', 'desc')
        .endAt(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            mail.push({...doc.data(), id: doc.id});
          });
        });
    }
    console.log(mail);
    console.log(length);
    return [
      200,
      {
        mailCount: length,
        Mail: mail,
        lastVisible: lastVisible,
      },
    ];
  }
};
////////////////////////////
const getCustmor = async (request) => {
  const {index} = request.params;
  const {isNext} = request.params;

  const {search} = request.params;
  let users = [];

  if (search) {
    await firebase
      .firestore()
      .collection('users')
      .where('email', '==', search.trim())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          users.push({...doc.data(), id: doc.id});
        });
      });

    return [
      200,
      {customerCount: users.length, customers: users, lastVisible: ''},
    ];
  } else {
    console.log(request.params);
    let length = await firebase
      .firestore()
      .collection('databaseCount')
      .doc('users')
      .get();

    length = length.data().count;

    let lastVisible;
    if (!index) {
      await firebase
        .firestore()

        .collection('users')
        .orderBy('time', 'desc')
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
          querySnapshot.forEach((doc) => {
            users.push({...doc.data(), id: doc.id});
          });
        });
    } else if (isNext) {
      await firebase
        .firestore()
        .collection('users')
        .orderBy('time', 'desc')
        .startAfter(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            users.push({...doc.data(), id: doc.id});
          });
        });
    } else {
      await firebase
        .firestore()
        .collection('users')
        .orderBy('time', 'desc')
        .endAt(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            users.push({...doc.data(), id: doc.id});
          });
        });
    }

    return [
      200,
      {customerCount: length, customers: users, lastVisible: lastVisible},
    ];
  }
};
/////////////////////////////////////
const getDebtors = async (request) => {
  const {index, isNext, search} = request.params;
  let debtors = [];
  let query = firebase.firestore().collection('Debtors');

  if (search) {
    // Search for debtors by a specific field (e.g., name)
    const searchString = search.trim();
    const endString =
      searchString.slice(0, -1) +
      String.fromCharCode(searchString.charCodeAt(searchString.length - 1) + 1);

    // Search for debtors whose names contain the search string
    query = query
      .where('name', '>=', searchString)
      .where('name', '<', endString);
  } else {
    // Pagination logic
    query = query.orderBy('time', 'desc').limit(40);
    if (index) {
      if (isNext) {
        query = query.startAfter(index);
      } else {
        query = query.endBefore(index);
      }
    }
  }

  const querySnapshot = await query.get();
  querySnapshot.forEach((doc) => {
    debtors.push({...doc.data(), id: doc.id});
  });

  // Get the last visible document for pagination
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  // Get the total count of debtors from a separate counter document
  const countSnapshot = await firebase
    .firestore()
    .collection('databaseCount')
    .doc('Debtors')
    .get();
  const totalDebtorsCount = countSnapshot.exists
    ? countSnapshot.data().count
    : 0;

  return [
    200,
    {
      debtorCount: totalDebtorsCount,
      debtors: debtors,
      lastVisible: lastVisible ? lastVisible.data().time : null,
    },
  ];
};

/////////////////////////////////
/////////////////////////////////////
const getissuedChecks = async (request) => {
  const {index, isNext, search} = request.params;
  let checks = [];
  let query = firebase.firestore().collection('issuedChecks');

  try {
    if (search) {
      const searchString = search.trim();
      const endString =
        searchString.slice(0, -1) +
        String.fromCharCode(
          searchString.charCodeAt(searchString.length - 1) + 1,
        );
      query = query
        .where('ownerName', '>=', searchString)
        .where('ownerName', '<', endString);
    } else {
      query = query.orderBy('date', 'desc').limit(40);
      if (index) {
        if (isNext) {
          query = query.startAfter(index);
        } else {
          query = query.endBefore(index);
        }
      }
    }

    const querySnapshot = await query.get();
    querySnapshot.forEach((doc) => {
      checks.push({...doc.data(), id: doc.id});
    });

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const totalChecksCount = querySnapshot.size;

    console.log('Checks fetched:', checks);
    console.log('Total checks count:', totalChecksCount);

    return [
      200,
      {
        checksCount: totalChecksCount,
        checks: checks,
        lastVisible: lastVisible ? lastVisible.data().time : null,
      },
    ];
  } catch (error) {
    console.error('Error fetching checks:', error);
    return [500, {error: 'Failed to fetch checks'}];
  }
};

/////////////////////////////////

const getOrderStatus = async (request) => {
  console.log(request);
  const {search, index, isNext} = request.params;
  // let field = '';
  // if (search === 'Pending') field = 'Pending';
  // else if (search === 'In Progress') field = 'InProgress';
  // else if (search === 'In Delivery') field = 'InDelivery';
  // else if (search === 'Completed') field = 'Completed';
  // else if (search === 'Canceled') field = 'Canceled';
  let length = await firebase
    .firestore()
    .collection('databaseCount')
    .doc('orderCount')
    .get();

  length = length.data()[search];

  let orders = [];
  let lastVisible;
  if (!index) {
    await firebase
      .firestore()
      .collection('Orders')
      .where('status', '==', search)
      .orderBy('time', 'desc')
      .limit(40)
      .get()
      .then((querySnapshot) => {
        lastVisible =
          querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
        querySnapshot.forEach((doc) => {
          orders.push({...doc.data(), id: doc.id});
        });
      });
  } else if (isNext) {
    console.log(index);
    await firebase
      .firestore()
      .collection('Orders')
      .where('status', '==', search)
      .orderBy('time', 'desc')
      .startAfter(index)
      .limit(40)
      .get()
      .then((querySnapshot) => {
        lastVisible =
          querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

        querySnapshot.forEach((doc) => {
          orders.push({...doc.data(), id: doc.id});
        });
      });
  } else {
    await firebase
      .firestore()
      .collection('Orders')
      .where('status', '==', search)
      .orderBy('time', 'desc')
      .endBefore(index)
      .limit(40)
      .get()
      .then((querySnapshot) => {
        lastVisible =
          querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

        querySnapshot.forEach((doc) => {
          orders.push({...doc.data(), id: doc.id});
        });
      });
  }

  return [
    200,
    {
      orderCount: length,
      orders: orders,
      lastVisible: lastVisible,
    },
  ];
};

mock.onGet('/api/ecommerce/customers').reply((request) => {
  let user = [];
  user = getCustmor(request);
  return user;

  // if (search) {
  //   customers = customers.filter(
  //     (customer) =>
  //       customer.name.toLowerCase().includes(search.toLowerCase()) ||
  //       customer.email.toLowerCase().includes(search.toLowerCase()),
  //   );
  // }
});
mock.onGet('/api/ecommerce/checks').reply((request) => {
  let Checks = [];
  Checks = getChecks(request);
  return Checks;

  // if (search) {
  //   customers = customers.filter(
  //     (customer) =>
  //       customer.name.toLowerCase().includes(search.toLowerCase()) ||
  //       customer.email.toLowerCase().includes(search.toLowerCase()),
  //   );
  // }
});
/////////////////////////////////////
const getChecks = async (request) => {
  const {index, isNext, search} = request.params;
  let checks = [];
  let query = firebase.firestore().collection('Checks');

  try {
    if (search) {
      const searchString = search.trim();
      const endString =
        searchString.slice(0, -1) +
        String.fromCharCode(
          searchString.charCodeAt(searchString.length - 1) + 1,
        );
      query = query
        .where('ownerName', '>=', searchString)
        .where('ownerName', '<', endString);
    } else {
      query = query.orderBy('date', 'desc').limit(40);
      if (index) {
        if (isNext) {
          query = query.startAfter(index);
        } else {
          query = query.endBefore(index);
        }
      }
    }

    const querySnapshot = await query.get();
    querySnapshot.forEach((doc) => {
      checks.push({...doc.data(), id: doc.id});
    });

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const totalChecksCount = querySnapshot.size;

    console.log('Checks fetched:', checks);
    console.log('Total checks count:', totalChecksCount);

    return [
      200,
      {
        checksCount: totalChecksCount,
        checks: checks,
        lastVisible: lastVisible ? lastVisible.data().time : null,
      },
    ];
  } catch (error) {
    console.error('Error fetching checks:', error);
    return [500, {error: 'Failed to fetch checks'}];
  }
};

mock.onGet('/api/ecommerce/debtors').reply((request) => {
  let user = [];
  user = getDebtors(request);
  console.log(user);
  return user;

  // if (search) {
  //   customers = customers.filter(
  //     (customer) =>
  //       customer.name.toLowerCase().includes(search.toLowerCase()) ||
  //       customer.email.toLowerCase().includes(search.toLowerCase()),
  //   );
  // }
});

mock.onGet('/api/ecommerce/issuedChecks').reply((request) => {
  let user = [];
  user = getissuedChecks(request);
  console.log(user);
  return user;

  // if (search) {
  //   customers = customers.filter(
  //     (customer) =>
  //       customer.name.toLowerCase().includes(search.toLowerCase()) ||
  //       customer.email.toLowerCase().includes(search.toLowerCase()),
  //   );
  // }
});
mock.onGet('/api/ecommerce/salePoint').reply((request) => {
  let salePoint = [];
  salePoint = getSalePoint(request);
  return salePoint;

  // if (search) {
  //   customers = customers.filter(
  //     (customer) =>
  //       customer.name.toLowerCase().includes(search.toLowerCase()) ||
  //       customer.email.toLowerCase().includes(search.toLowerCase()),
  //   );
  // }
});
mock.onGet('/api/ecommerce/employees').reply((request) => {
  let user = [];
  user = getEmployee(request);
  return user;

  // if (search) {
  //   customers = customers.filter(
  //     (customer) =>
  //       customer.name.toLowerCase().includes(search.toLowerCase()) ||
  //       customer.email.toLowerCase().includes(search.toLowerCase()),
  //   );
  // }
});

mock.onGet('/api/ecommerce/coupon').reply((request) => {
  let coupon = [];
  coupon = getCoupn(request);
  return coupon;

  // if (search) {
  //   customers = customers.filter(
  //     (customer) =>
  //       customer.name.toLowerCase().includes(search.toLowerCase()) ||
  //       customer.email.toLowerCase().includes(search.toLowerCase()),
  //   );
  // }
});
//////////////////
mock.onGet('/api/ecommerce/MainCategories').reply((request) => {
  let MainCategories = [];
  MainCategories = getMainCategories(request);

  return MainCategories;

  // if (search) {
  //   customers = customers.filter(
  //     (customer) =>
  //       customer.name.toLowerCase().includes(search.toLowerCase()) ||
  //       customer.email.toLowerCase().includes(search.toLowerCase()),
  //   );
  // }
});
mock.onGet('/api/ecommerce/getFinancialNotificationUsers').reply((request) => {
  console.log('onget mock');
  let users = [];
  users = getFinancialNotificationsUsers(request);
  console.log('users');
  console.log(users);

  return users;

  // if (search) {
  //   customers = customers.filter(
  //     (customer) =>
  //       customer.name.toLowerCase().includes(search.toLowerCase()) ||
  //       customer.email.toLowerCase().includes(search.toLowerCase()),
  //   );
  // }
});
//////////////////////
mock.onGet('/api/cart/get').reply((request) => {
  //  console.log(request.params.item);

  return [200, request.params.item];
});

const getEmployee = async (request) => {
  const {index} = request.params;
  const {isNext} = request.params;
  const {search} = request.params;

  let employees = [];

  if (search) {
    await firebase
      .firestore()
      .collection('employees')
      .where('isDeleted', '==', false)
      .where('email', '==', search.trim())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          employees.push({...doc.data(), id: doc.id});
        });
      });

    return [
      200,
      {employeesCount: employees.length, employees: employees, lastVisible: ''},
    ];
  } else {
    let length = await firebase
      .firestore()
      .collection('databaseCount')
      .doc('employee')
      .get();

    length = length.data().sum;

    let lastVisible;
    if (!index) {
      await firebase
        .firestore()
        .collection('employees')
        .where('isDeleted', '==', false)
        .orderBy('time', 'desc')

        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
          querySnapshot.forEach((doc) => {
            employees.push({...doc.data(), id: doc.id});
          });
        });
    } else if (isNext) {
      await firebase
        .firestore()
        .collection('employees')
        .where('isDeleted', '==', false)
        .orderBy('time', 'desc')
        .startAfter(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            employees.push({...doc.data(), id: doc.id});
          });
        });
    } else {
      await firebase
        .firestore()
        .collection('employees')
        .where('isDeleted', '==', false)
        .orderBy('time', 'desc')
        .endAt(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            employees.push({...doc.data(), id: doc.id});
          });
        });
    }

    return [
      200,
      {employeesCount: length, employees: employees, lastVisible: lastVisible},
    ];
  }
};

const getSalePoint = async (request) => {
  const {index} = request.params;
  const {isNext} = request.params;
  let salePoint = [];

  const {search} = request.params;
  if (search) {
    await firebase
      .firestore()
      .collection('salePoint')
      .where('isDeleted', '==', false)
      .where('email', '==', search.trim())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          salePoint.push({...doc.data(), id: doc.id});
        });
      });

    return [
      200,
      {salePointCount: salePoint.length, salePoint: salePoint, lastVisible: ''},
    ];
  } else {
    let length = await firebase
      .firestore()
      .collection('databaseCount')
      .doc('salePoint')
      .get();

    length = length.data().sum;

    let lastVisible;
    if (!index) {
      await firebase
        .firestore()
        .collection('salePoint')
        .where('isDeleted', '==', false)

        .orderBy('time', 'desc')
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
          querySnapshot.forEach((doc) => {
            salePoint.push({...doc.data(), id: doc.id});
          });
        });
    } else if (isNext) {
      await firebase
        .firestore()

        .collection('salePoint')
        .where('isDeleted', '==', false)

        .orderBy('time', 'desc')
        .startAfter(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            salePoint.push({...doc.data(), id: doc.id});
          });
        });
    } else {
      await firebase
        .firestore()

        .collection('salePoint')
        .where('isDeleted', '==', false)

        .orderBy('time', 'desc')
        .endAt(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            salePoint.push({...doc.data(), id: doc.id});
          });
        });
    }

    return [
      200,
      {salePointCount: length, salePoint: salePoint, lastVisible: lastVisible},
    ];
  }
};

const getCoupn = async (request) => {
  const {index} = request.params;
  const {isNext} = request.params;
  let coupon = [];
  const {search} = request.params;
  if (search) {
    await firebase
      .firestore()
      .collection('coupon')
      .where('title', '==', search.trim())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          coupon.push({...doc.data(), id: doc.id});
        });
      });
    console.log(coupon);
    return [200, {couponCount: coupon.length, coupon: coupon, lastVisible: ''}];
  } else {
    let length = await firebase
      .firestore()
      .collection('databaseCount')
      .doc('coupon')
      .get();

    length = length.data().sum;

    let lastVisible;
    if (!index) {
      await firebase
        .firestore()
        .collection('coupon')
        .orderBy('time', 'desc')
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
          querySnapshot.forEach((doc) => {
            coupon.push({...doc.data(), id: doc.id});
          });
        });
    } else if (isNext) {
      await firebase
        .firestore()
        .collection('coupon')
        .orderBy('time', 'desc')
        .startAfter(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            coupon.push({...doc.data(), id: doc.id});
          });
        });
    } else {
      await firebase
        .firestore()
        .collection('coupon')
        .orderBy('time', 'desc')
        .endAt(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            coupon.push({...doc.data(), id: doc.id});
          });
        });
    }

    return [
      200,
      {couponCount: length, coupon: coupon, lastVisible: lastVisible},
    ];
  }
};
/////////////////////////////////////////////////////////////////////////////////////////
async function getFinancialNotificationsUsers(request) {
  const { index, isNext, search } = request.params;
  let users = [];
  let query = firebase.firestore().collection('financialUsersNoti'); // Make sure this is the correct collection name

  try {
    if (search) {
      const searchString = search.trim();
      const endString = searchString.slice(0, -1) +
        String.fromCharCode(searchString.charCodeAt(searchString.length - 1) + 1);
      query = query
        .where('name', '>=', searchString)
        .where('name', '<', endString);
    } else {
      query = query.orderBy('time', 'desc').limit(40);
      if (index) {
        const snapshot = await firebase.firestore().collection('financialUsersNoti').doc(index).get();
        if (!snapshot.exists) {
          return [
            200,
            {
              notifUsersCount: 0,
              notifUsers: [],
              lastVisible: null,
            },
          ];
        }

        if (isNext) {
          query = query.startAfter(snapshot);
        } else {
          query = query.endBefore(snapshot);
        }
      }
    }

    const querySnapshot = await query.get();
    querySnapshot.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const totalUsersCount = querySnapshot.size;
    return [
      200,
      {
        notifUsersCount: totalUsersCount,
        notifUsers: users,
        lastVisible: lastVisible ? lastVisible.data().date : null, // Adjust the field name if necessary
      },
    ];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [500, { error: 'Failed to fetch users' }];
  }
};


//////////////////////////////////////////////////////////get main category//////////////
const getMainCategories = async (request) => {
  const {index} = request.params;
  const {isNext} = request.params;
  let mainCategories = [];
  const {search} = request.params;
  if (search) {
    console.log(search);
    await firebase
      .firestore()
      .collection('mainCategories')
      .where('Categorytitle', '==', search.trim())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          mainCategories.push({...doc.data(), id: doc.id});
        });
      });
    return [
      200,
      {
        mainCategoriesCount: mainCategories.length,
        mainCategories: mainCategories,
        lastVisible: '',
      },
    ];
  } else {
    let length = await firebase
      .firestore()
      .collection('databaseCount')
      .doc('mainCategoriesCount')
      .get();

    length = length.data().sum;

    let lastVisible;
    if (!index) {
      await firebase
        .firestore()
        .collection('mainCategories')
        .orderBy('time', 'desc')
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
          querySnapshot.forEach((doc) => {
            mainCategories.push({...doc.data(), id: doc.id});
          });
        });
    } else if (isNext) {
      await firebase
        .firestore()
        .collection('mainCategories')
        .orderBy('time', 'desc')
        .startAfter(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            mainCategories.push({...doc.data(), id: doc.id});
          });
        });
    } else {
      await firebase
        .firestore()
        .collection('mainCategories')
        .orderBy('time', 'desc')
        .endAt(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            mainCategories.push({...doc.data(), id: doc.id});
          });
        });
    }
    console.log('fireabse read');
    console.log(mainCategories);
    return [
      200,
      {
        mainCategoriesCount: length,
        mainCategories: mainCategories,
        lastVisible: lastVisible,
      },
    ];
  }
};
//////////////////////////////////////////////////////////Deleted Secion ????????????????

mock.onGet('/api/ecommerce/DeletedRuningCost').reply((request) => {
  let runingcost = [];
  runingcost = getDelRuningCost(request);
  return runingcost;
});
const getDelRuningCost = async (request) => {
  const {index} = request.params;
  const {search} = request.params;

  const {isNext} = request.params;
  let runingcost = [];
  let lastVisible;
  console.log(search);
  if (search) {
    await firebase
      .firestore()

      .collection('RuningCost')
      .where('isDeleted', '==', true)
      .where('id', '==', search.trim())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          runingcost.push({...doc.data(), id: doc.id});
          console.log(doc.data());
        });
      });
    return [
      200,
      {
        runingcostCount: runingcost.length > 1 ? runingcost.length : 0,
        runingcost: runingcost,
        lastVisible: '',
      },
    ];
  } else {
    let length = await firebase
      .firestore()
      .collection('databaseCount')
      .doc('RuningCost')
      .get();

    length = length.data().count - length.data().sum;
    if (!index) {
      await firebase
        .firestore()

        .collection('RuningCost')
        .where('isDeleted', '==', true)
        .orderBy('time', 'desc')
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
          querySnapshot.forEach((doc) => {
            runingcost.push({...doc.data(), id: doc.id});
          });
        });
    } else if (isNext) {
      await firebase
        .firestore()

        .collection('RuningCost')
        .where('isDeleted', '==', true)

        .orderBy('time', 'desc')
        .startAfter(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            runingcost.push({...doc.data(), id: doc.id});
          });
        });
    } else {
      await firebase
        .firestore()

        .collection('RuningCost')
        .where('isDeleted', '==', true)

        .orderBy('time', 'desc')
        .endAt(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            runingcost.push({...doc.data(), id: doc.id});
          });
        });
    }

    return [
      200,
      {
        delruningcostCount: length,
        delruningcost: runingcost,
        lastVisible: lastVisible,
      },
    ];
  }
};

mock.onGet('/api/ecommerce/Oldemployees').reply((request) => {
  let user = [];
  user = getOldEmployee(request);
  return user;

  // if (search) {
  //   customers = customers.filter(
  //     (customer) =>
  //       customer.name.toLowerCase().includes(search.toLowerCase()) ||
  //       customer.email.toLowerCase().includes(search.toLowerCase()),
  //   );
  // }
});

const getOldEmployee = async (request) => {
  const {index} = request.params;
  const {isNext} = request.params;
  const {search} = request.params;

  let employees = [];

  if (search) {
    await firebase
      .firestore()
      .collection('employees')
      .where('isDeleted', '==', false)
      .where('email', '==', search.trim())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          employees.push({...doc.data(), id: doc.id});
        });
      });

    return [
      200,
      {
        OldemployeesCount: employees.length,
        Oldemployees: employees,
        lastVisible: '',
      },
    ];
  } else {
    let length = await firebase
      .firestore()
      .collection('databaseCount')
      .doc('employee')
      .get();

    length = length.data().count - length.data().sum;

    let lastVisible;
    if (!index) {
      await firebase
        .firestore()
        .collection('employees')
        .where('isDeleted', '==', true)

        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
          querySnapshot.forEach((doc) => {
            employees.push({...doc.data(), id: doc.id});
          });
        });
    } else if (isNext) {
      await firebase
        .firestore()
        .collection('employees')
        .where('isDeleted', '==', true)
        .startAfter(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            employees.push({...doc.data(), id: doc.id});
          });
        });
    } else {
      await firebase
        .firestore()
        .collection('employees')
        .where('isDeleted', '==', true)

        .endAt(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            employees.push({...doc.data(), id: doc.id});
          });
        });
    }

    return [
      200,
      {
        OldemployeesCount: length,
        Oldemployees: employees,
        lastVisible: lastVisible,
      },
    ];
  }
};

mock.onGet('/api/ecommerce/OldsalePoint').reply((request) => {
  let salePoint = [];
  salePoint = getOldSalePoint(request);
  return salePoint;

  // if (search) {
  //   customers = customers.filter(
  //     (customer) =>
  //       customer.name.toLowerCase().includes(search.toLowerCase()) ||
  //       customer.email.toLowerCase().includes(search.toLowerCase()),
  //   );
  // }
});

const getOldSalePoint = async (request) => {
  const {index} = request.params;
  const {isNext} = request.params;
  const {search} = request.params;
  let salePoint = [];

  if (search) {
    await firebase
      .firestore()
      .collection('salePoint')
      .where('isDeleted', '==', true)
      .where('email', '==', search.trim())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          salePoint.push({...doc.data(), id: doc.id});
        });
      });

    return [
      200,
      {
        OldsalePointCount: salePoint.length,
        OldsalePoint: salePoint,
        lastVisible: '',
      },
    ];
  } else {
    let length = await firebase
      .firestore()
      .collection('databaseCount')
      .doc('salePoint')
      .get();

    length = length.data().count - length.data().sum;

    let lastVisible;
    if (!index) {
      await firebase
        .firestore()
        .collection('salePoint')
        .where('isDeleted', '==', true)

        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;
          querySnapshot.forEach((doc) => {
            salePoint.push({...doc.data(), id: doc.id});
          });
        });
    } else if (isNext) {
      await firebase
        .firestore()

        .collection('salePoint')
        .where('isDeleted', '==', true)

        .startAfter(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            salePoint.push({...doc.data(), id: doc.id});
          });
        });
    } else {
      await firebase
        .firestore()

        .collection('salePoint')
        .where('isDeleted', '==', true)

        .endAt(index)
        .limit(40)
        .get()
        .then((querySnapshot) => {
          lastVisible =
            querySnapshot.docs[querySnapshot.docs.length - 1].data().time;

          querySnapshot.forEach((doc) => {
            salePoint.push({...doc.data(), id: doc.id});
          });
        });
    }

    return [
      200,
      {
        OldsalePointCount: length,
        OldsalePoint: salePoint,
        lastVisible: lastVisible,
      },
    ];
  }
};

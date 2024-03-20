import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import {updateProducts} from 'utils';
// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyBf7ke4PRQZ9j16W_9lAygK20_YYvf7BtY",
  authDomain: "murramotors-cebdd.firebaseapp.com",
  projectId: "murramotors-cebdd",
  storageBucket: "murramotors-cebdd.appspot.com",
  messagingSenderId: "291719884620",
  appId: "1:291719884620:web:0d2da56bce11b7c086e9e9"
};

firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebase.initializeApp(firebaseConfig));
const auth = firebase.auth();
const storage = firebase.storage();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

const reauthenticate = (currentPassword) => {
  const user = firebase.auth().currentUser;
  const cred = firebase.auth.EmailAuthProvider.credential(
    user.email,
    currentPassword,
  );
  return user.reauthenticateAndRetrieveDataWithCredential(cred);
};

const changePassword = async (data) => {
  console.log(data);
  let changed = false;
  const user = firebase.auth().currentUser;
  try {
    // reauthenticating
    await reauthenticate(data.oldPassword);
    // updating password
    await user.updatePassword(data.newPassword).then(() => {
      confirm('Password Cganged');
      changed = true;
    });
  } catch (err) {
    confirm('Wrong Old Password');
    changed = false;
  }
  return changed;
};
const generateKey = () => firebase.firestore().collection('products').doc().id;

const storeImage = async (id, folder, imageFile) => {
  const snapshot = await storage.ref(folder).child(id).put(imageFile);
  await snapshot;
  const downloadURL = await snapshot.ref.getDownloadURL();

  return downloadURL;
};

const generateID = async () => {
  let count = await firebase
    .firestore()
    .collection('databaseCount')
    .doc('products')
    .get();
  count = count.data().count + 1;
  return count;
};
const generateEID = async () => {
  let count = await firebase
    .firestore()
    .collection('databaseCount')
    .doc('employee')
    .get();
  count = count.data().count + 1;
  return count;
};
const generateSPID = async () => {
  let count = await firebase
    .firestore()
    .collection('databaseCount')
    .doc('salePoint')
    .get();
  count = count.data().count + 1;
  return count;
};

const getCartProduct = async (data) => {
  let rez = [];
  await firebase
    .firestore()
    .collection('products')
    .where('id', '==', Number(data.id))
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        rez.push({...doc.data(), id: doc.id});
      });
    });

  return rez[0];
};

const addProduct = async (product) => {
  let count = firebase.firestore().collection('databaseCount').doc('products');
  let newCount = 0;
  return await firebase
    .firestore()
    .runTransaction(async (transaction) => {
      return transaction.get(count).then(async (sfDoc) => {
        if (!sfDoc.exists) {
          throw 'Document does not exist!';
        }
        newCount = sfDoc.data().count + 1;
        let sum = sfDoc.data().sum + 1;
        const prodToSave = {
          ...product,
          mainCategory: product.mainCategory.Categorytitle,
          id: sum,
          slug: product.slug + '-' + sum,
        };
        console.log(prodToSave);
        await firebase
          .firestore()
          .collection('products')
          .doc(sum + '')
          .set(prodToSave);
        transaction.update(count, {count: newCount, sum: sum});
        console.log('#' + product.mainCategory.Categorytitle);

        const mainCategoryRef = firebase
          .firestore()
          .collection('mainCategories')
          .doc('#' + product.mainCategory.id);

        // update the SubCategories array with the categories in the product
        const categories = product.category || [];
        transaction.update(mainCategoryRef, {
          SubCategories: firebase.firestore.FieldValue.arrayUnion(
            ...categories,
          ),
        });
        // add the product's main category, brand, and sizes to the filterCollection collection
        const filterRef = firebase
          .firestore()
          .collection('filterCollection')
          .doc(product.mainCategory.Categorytitle);

        const filterDoc = await filterRef.get();
        if (!filterDoc.exists) {
          console.log('Document does not exist!');
          // extract sizes from variants array
          const sizesMap = new Map();
          product.variants.forEach((variant) => {
            variant.size.forEach((size) => {
              sizesMap.set(size.id, size.name);
            });
          });
          const colorsMap = new Map();
          product.variants.forEach((variant) => {
            if (
              variant.color_name !== 'default' &&
              variant.color !== 'default' &&
              !colorsMap.has(variant.color)
            ) {
              colorsMap.set(variant.color, variant.color_name);
            }
          });

          const sizesArray = Array.from(sizesMap, ([id, name]) => ({id, name}));

          const colorsArray = Array.from(colorsMap, ([color, name]) => ({
            color,
            name,
          }));

          // handle the error or create the document if it does not exist
          await filterRef.set({
            categorytitle: product.mainCategory.Categorytitle,
            subCategories: product.category || [],
            brands: product.brands || [],
            sizes: sizesArray.length ? sizesArray : [],
            colors: colorsArray.length ? colorsArray : [],
          });
        } else {
          const data = filterDoc.data();
          const subCategories = data.subCategories ?? []; // change to subCategories
          const brands = data.brands ?? [];
          const sizes = data.sizes ?? [];

          const colors = data.colors ?? [];

          // add new main category if it does not exist in array
          if (
            !subCategories.some(
              (category) => category.id === product.mainCategory.id,
            )
          ) {
            // change to subCategories
            subCategories.push(product.mainCategory);
          }
          const newsubCategories = product.category.filter(
            (category) => !subCategories.includes(category),
          );
          const updatedsubCategories = [...newsubCategories];

          // add new brands if they do not exist in array
          const newBrands = product.brands.filter(
            (brand) => !brands.includes(brand),
          );
          const updatedBrands = [...newBrands];

          let updatedSizes = [];
          if (Array.isArray(sizes)) {
            const sizesArray = sizes.map((size) => size.name);
            const newSizesArray = [];
            product.variants.forEach((variant) => {
              variant.size.forEach((size) => {
                if (!sizesArray.includes(size.name)) {
                  newSizesArray.push(size.name);
                }
              });
            });
            updatedSizes = [...newSizesArray];
          }
          /////
          //////

          let updatedColors = [];
          const colorsArray = Array.from(colors);
          product.variants.forEach((variant) => {
            if (
              variant.color_name !== 'default' &&
              variant.color !== 'default'
            ) {
              const colorExists = colorsArray.some(
                (color) =>
                  color.color === variant.color &&
                  color.color_name === variant.color_name,
              );
              console.log(variant.color_name);
              console.log(colorExists);
              if (!colorExists) {
                updatedColors.push({
                  color: variant.color,
                  color_name: variant.color_name,
                });
              }
            }
          });

          updatedColors = [...colorsArray, ...updatedColors];

          transaction.update(filterRef, {
            subCategories: firebase.firestore.FieldValue.arrayUnion(
              ...updatedsubCategories,
            ),
            brands: firebase.firestore.FieldValue.arrayUnion(...updatedBrands),

            sizes: firebase.firestore.FieldValue.arrayUnion(...updatedSizes),
            colors: firebase.firestore.FieldValue.arrayUnion(...updatedColors),
            // sizes: firebase.firestore.FieldValue.arrayUnion(...sizes)
          });
        }

        return {...product, id: sum};
      });
    })
    .then((rez) => {
      console.log('Transaction successfully committed!');

      return rez;
    })
    .catch((error) => {
      console.log('Transaction failed: ', error);
    });
};
const updateProduct = async (product, slctedMainCAtgerot) => {
  console.log('update start committed!');
  console.log(product);
  await firebase
    .firestore()
    .collection('products')
    .doc(product.id + '')
    .set(product)
    .then(async () => {
      await firebase.firestore().runTransaction(async (transaction) => {
        console.log(slctedMainCAtgerot[0].id);
        console.log(slctedMainCAtgerot);

        const mainCategoryRef = firebase
          .firestore()
          .collection('mainCategories')
          .doc('#' + slctedMainCAtgerot[0].id);
        // update the SubCategories array with the categories in the product
        const categories = product.category || [];
        console.log((await mainCategoryRef.get()).data());

        transaction.update(mainCategoryRef, {
          SubCategories: firebase.firestore.FieldValue.arrayUnion(
            ...categories,
          ),
        });
        // add the product's main category, brand, and sizes to the filterCollection collection
        const filterRef = firebase
          .firestore()
          .collection('filterCollection')
          .doc(product.mainCategory + '');

        const filterDoc = await filterRef.get();
        if (!filterDoc.exists) {
          console.log('Document does not exist!');
          // extract sizes from variants array
          const sizesMap = new Map();
          product.variants?.forEach((variant) => {
            variant.size?.forEach((size) => {
              sizesMap.set(size.id, size.name);
            });
          });
          const colorsMap = new Map();
          product.variants?.forEach((variant) => {
            if (
              variant.color_name !== 'default' &&
              variant.color !== 'default' &&
              !colorsMap.has(variant.color)
            ) {
              colorsMap.set(variant.color, variant.color_name);
            }
          });

          const sizesArray = Array.from(sizesMap, ([id, name]) => ({id, name}));

          const colorsArray = Array.from(colorsMap, ([color, name]) => ({
            color,
            name,
          }));

          // handle the error or create the document if it does not exist
          await filterRef.set({
            categorytitle: product.mainCategory,
            subCategories: product.category || [],
            brands: product.brands || [],
            sizes: sizesArray.length ? sizesArray : [],
            colors: colorsArray.length ? colorsArray : [],
          });
        } else {
          const data = filterDoc.data();
          const subCategories = data.subCategories ?? []; // change to subCategories
          const brands = data.brands ?? [];
          const sizes = data.sizes ?? [];

          const colors = data.colors ?? [];

          // add new main category if it does not exist in array
          if (
            !subCategories.some(
              (category) => category.id === product.mainCategory.id,
            )
          ) {
            // change to subCategories
            subCategories.push(product.mainCategory);
          }
          const newsubCategories = product.category.filter(
            (category) => !subCategories.includes(category),
          );
          const updatedsubCategories = [...newsubCategories];

          // add new brands if they do not exist in array
          const newBrands = product.brands.filter(
            (brand) => !brands.includes(brand),
          );
          const updatedBrands = [...newBrands];

          let updatedSizes = [];
          if (Array.isArray(sizes)) {
            const sizesArray = sizes.map((size) => size.name);
            const newSizesArray = [];
            product.variants.forEach((variant) => {
              variant.size.forEach((size) => {
                if (!sizesArray.includes(size.name)) {
                  newSizesArray.push({name: size.name, id: size.id});
                }
              });
            });
            updatedSizes = [...newSizesArray];
          }
          /////
          //////

          let updatedColors = [];
          const colorsArray = Array.from(colors);
          product.variants.forEach((variant) => {
            if (
              variant.color_name !== 'default' &&
              variant.color !== 'default'
            ) {
              const colorExists = colorsArray.some(
                (color) =>
                  color.color === variant.color &&
                  color.color_name === variant.color_name,
              );
              console.log(variant.color_name);
              console.log(colorExists);
              if (!colorExists) {
                updatedColors.push({
                  color: variant.color,
                  color_name: variant.color_name,
                });
              }
            }
          });

          updatedColors = [...colorsArray, ...updatedColors];

          transaction.update(filterRef, {
            subCategories: firebase.firestore.FieldValue.arrayUnion(
              ...updatedsubCategories,
            ),
            brands: firebase.firestore.FieldValue.arrayUnion(...updatedBrands),

            sizes: firebase.firestore.FieldValue.arrayUnion(...updatedSizes),
            colors: firebase.firestore.FieldValue.arrayUnion(...updatedColors),
            // sizes: firebase.firestore.FieldValue.arrayUnion(...sizes)
          });
        }
      });

      console.log('update successfully committed!');
    })
    .catch((error) => {
      return 'update failed: ', error;
    });
};
const addRuningCost = async (data) => {
  data.isDeleted = false;
  data.EndDate = null;
  let count = await firebase
    .firestore()
    .collection('databaseCount')
    .doc('RuningCost')
    .get();
  let sum = count.data().sum + 1;
  count = count.data().count + 1;

  await firebase
    .firestore()
    .collection('RuningCost')
    .doc('#' + count)
    .set(data)
    .then(() => {
      firebase
        .firestore()
        .collection('databaseCount')
        .doc('RuningCost')
        .update({
          sum: sum,
          count: count,
        });
    });
};

const editRuningCost = async (data, oldData) => {
  data.isDeleted = false;
  data.EndDate = null;

  await firebase
    .firestore()
    .collection('RuningCost')
    .doc(oldData.id)
    .set(data)
    .then();
};
const addCopun = async (data) => {
  let couuntdata = await firebase
    .firestore()
    .collection('databaseCount')
    .doc('coupon')
    .get();
  let count = couuntdata.data().count + 1;
  let sum = couuntdata.data().sum + 1;
  await firebase
    .firestore()
    .collection('coupon')
    .doc('#' + count)
    .set(data)
    .then(() => {
      console.log('here');
      firebase.firestore().collection('databaseCount').doc('coupon').update({
        count: count,
        sum: sum,
      });
      if (data.spicalUsers?.length !== 0) {
        data.spicalUsers.reduce(async function (sum, item) {
          if (item !== '') {
            let userCopun = {
              EndDate: data.EndDate,
              fromDate: data.fromDate,
              amount: 1,
              code: data.code,
              title: data.title,
              discount: data.Fixed ? data.amount + 'ILS' : data.amount + '%',
            };
            firebase
              .firestore()
              .collection('users')
              .doc(item)
              .update({
                coupon: firebase.firestore.FieldValue.arrayUnion(userCopun),
              });
          }
        }, 0);

        console.log('here3');
      }
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);

      // ..
    });
};

//////////////////////////////////////
const addMainCategory = async (data) => {
  let couuntdata = await firebase
    .firestore()
    .collection('databaseCount')
    .doc('mainCategoriesCount')
    .get();
  let count = couuntdata.data().count + 1;
  let sum = couuntdata.data().sum + 1;

  await firebase
    .firestore()
    .collection('mainCategories')
    .doc('#' + count)
    .set({...data, id: sum})
    .then(() => {
      console.log('here');
      firebase
        .firestore()
        .collection('databaseCount')
        .doc('mainCategoriesCount')
        .update({
          count: count,
          sum: sum,
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);

      // ..
    });
};
/////////////////////////////////////////////////
const getMainCategories = async () => {
  try {
    const categoriesRef = firebase.firestore().collection('mainCategories');
    const snapshot = await categoriesRef.get();
    const categories = [];
    snapshot.forEach((doc) => {
      categories.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return categories;
  } catch (error) {
    console.error('Error getting main categories: ', error);
    throw error;
  }
};
const deletCoupne = async (data) => {
  await firebase
    .firestore()
    .collection('coupon')
    .doc(data.id)
    .delete()
    .then(async () => {
      let sum = await firebase
        .firestore()
        .collection('databaseCount')
        .doc('coupon')
        .get();
      sum = sum.data().sum - 1;
      firebase.firestore().collection('databaseCount').doc('coupon').update({
        sum: sum,
      });

      if (data.spicalUsers?.length !== 0) {
        data.spicalUsers.reduce(async function (sum, item) {
          if (item !== '') {
            firebase
              .firestore()
              .collection('users')
              .doc(item)
              .get()
              .then((querySnapshot) => {
                let coupon = querySnapshot.data().coupon;
                let index = coupon.filter((item) => item.code === data.code);
                if (index != -1) {
                  coupon.remove(index);
                  firebase
                    .firestore()
                    .collection('users')
                    .doc(item)
                    .update({
                      coupon: firebase.firestore.FieldValue.arrayUnion(coupon),
                    });
                }
              });
          }
        }, 0);
      }
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);

      // ..
    });
};
const getOrderRebort = async (date) => {
  console.log(await date);
  let orders = [];
  await firebase
    .firestore()

    .collection('Orders')

    .where('Date', '>=', date[0])
    .where('Date', '<=', date[1])
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        orders.push({...doc.data(), id: doc.id});
      });
    });

  return orders;
};

const getWearhouseRebort = async (date) => {
  let products = [];
  await firebase
    .firestore()
    .collection('products')

    .where('addDate', '>=', date[0])
    .where('addDate', '<=', date[1])
    .orderBy('addDate', 'desc')

    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        products.push({...doc.data(), id: doc.id});
      });
    });

  return products;
};
const addEmployees = async (id, employee) => {
  employee.isDeleted = false;
  employee.EndDate = null;
  return await auth
    .createUserWithEmailAndPassword(employee.email, employee.password)
    .then(async (userCredential) => {
      var user = userCredential.user;

      await user
        .updateProfile({
          displayName: employee.name,
          // photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(async () => {
          let sum = await firebase
            .firestore()
            .collection('databaseCount')
            .doc('employee')
            .get();
          sum = sum.data().sum + 1;
          await firebase
            .firestore()
            .collection('employees')
            .doc(id + '')
            .set({...employee, uid: user.uid});

          await firebase
            .firestore()
            .collection('databaseCount')
            .doc('employee')
            .update({
              count: id,
              sum: sum,
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          throw error;
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      throw error;
    });
};

const editEmployees = async (id, employee) => {
  employee.isDeleted = false;
  employee.EndDate = null;
  console.log(employee);
  firebase
    .firestore()
    .collection('employees')
    .doc(id + '')
    .set(employee)

    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  // ...
};
const EditSPoints = async () => {};
const addSalePoint = async (id, vendor) => {
  vendor.isDeleted = false;
  vendor.EndDate = null;
  let sum = await firebase
    .firestore()
    .collection('databaseCount')
    .doc('salePoint')
    .get();
  sum = sum.data().sum + 1;
  return await auth
    .createUserWithEmailAndPassword(vendor.email, vendor.password)
    .then(async (userCredential) => {
      var user = userCredential.user;

      await user
        .updateProfile({
          displayName: vendor.name,
          Role: 'salePoint',
          // photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(() => {
          firebase
            .firestore()
            .collection('salePoint')
            .doc(id + '')
            .set(vendor);

          firebase
            .firestore()
            .collection('databaseCount')
            .doc('salePoint')
            .update({
              count: id,
              sum: sum,
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          throw error;
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      throw error;
    });
};
async function updateOrder(order, orderID, odldStatus) {
  let cost = 0;
  order.status == 'Completed' ? (order.isPayed = 'paid') : '';
  order.CartItem = order.CartItem.filter((item) => item.qty > 0);

  await order.CartItem.reduce(async function (sum, item) {
    await firebase
      .firestore()
      .collection('products')
      .doc(item.id)
      .get()
      .then((i) => {
        let temp = i.data().cost;
        cost += temp * item.qty;
      });
    // set initial value as 0
  }, 0);

  order.cost = cost;
  await firebase
    .firestore()
    .collection('Orders')
    .doc(orderID)
    .set(order)
    .then(async () => {
      // window.location.replace('/Orders/AllOrders'); //need chage after change session storage to query
      if (order.status != odldStatus) {
        let length = await firebase
          .firestore()
          .collection('databaseCount')
          .doc('orderCount')
          .get();

        let data = await length.data();
        data[odldStatus] = data[odldStatus] - 1;
        data[order.status] = Number(data[order.status]) + 1;
        console.log(data);
        firebase
          .firestore()
          .collection('databaseCount')
          .doc('orderCount')
          .set(data);
      }
    });
}
async function addBaners(baners) {
  let res = firebase
    .firestore()
    .collection('Baners')
    .doc(baners.id)
    .set(baners)
    .then(() => {
      return 'Update Baner Done: :) ';
    });
  return res;
}

async function getBaners() {
  let baners = [];

  await firebase
    .firestore()

    .collection('Baners')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        baners.push({...doc.data(), id: doc.id});
      });
    });
  return baners;
}
async function updateOreder(order, oldData) {
  let odldStatus = oldData.status;

  let CartItem = order.CartItem;
  oldData = oldData.CartItem;
  const filteredArrayA = order.CartItem.map((obj) => ({
    name: obj.name,
    count: obj.qty,
    price: obj.price,
  }));
  const filteredArrayb = oldData.map((obj) => ({
    name: obj.name,
    count: obj.qty,
    price: obj.price,
  }));
  console.log(equalsCheck(filteredArrayA, filteredArrayb));
  console.log(oldData);
  console.log(CartItem);
  if (
    !equalsCheck(filteredArrayA, filteredArrayb) ||
    (order.status == 'Canceled' && odldStatus != 'Canceled') ||
    (order.status != 'Canceled' && odldStatus == 'Canceled')
  ) {
    console.log('heree');
    // console.log(oldData);
    const differentObjects = CartItem.filter(
      (obj1) => !oldData.some((obj2) => obj2.name === obj1.name),
    );

    let update = false;

    await oldData
      .reduce(async function (sum, item) {
        let index = CartItem.findIndex((newItem) => newItem.name == item.name);

        let count =
          index == -1 ? item.qty * -1 : CartItem[index].qty - item.qty;
        // console.log(item);
        // console.log(CartItem[index]);
        // console.log(CartItem[index].qty);
        // console.log(item.qty);
        console.log(count);
        if (
          count != 0 ||
          (order.status == 'Canceled' && odldStatus != 'Canceled') ||
          (order.status != 'Canceled' && odldStatus == 'Canceled')
        ) {
          var sfDocRef = firebase
            .firestore()
            .collection('products')
            .doc(item.id);
          return firebase
            .firestore()
            .runTransaction((transaction) => {
              // This code may get re-run multiple times if there are conflicts.
              return transaction.get(sfDocRef).then((sfDoc) => {
                if (!sfDoc.exists) {
                  throw 'Document does not exist!';
                }
                if (order.status == 'Canceled' && odldStatus != 'Canceled') {
                  count = item.qty * -1;
                }
                if (order.status != 'Canceled' && odldStatus == 'Canceled') {
                  count = item.qty;
                }
                let prod = updateProducts(item, sfDoc.data(), count);

                // var newPopulation = sfDoc.data().population + 1;
                if (prod === false) {
                  alert('update' + item.name + ' Filed  , out of Stock ');

                  CartItem[index].qty = item.qty;
                } else {
                  transaction.update(sfDocRef, prod);
                }
              });
            })
            .then(async () => {
              update = true;
              console.log('Transaction successfully committed!');
            })
            .catch((error) => {
              update = false;

              alert('update' + item.name + ' Filed  , out of Stock');
              console.log('Transaction failed: ', error);
            });
        }
      }, '')
      .then(async () => {
        if (differentObjects.length > 0) {
          await differentObjects
            .reduce(async function (sum, item) {
              let count = item.qty;

              var sfDocRef = firebase
                .firestore()
                .collection('products')
                .doc(item.id);
              return firebase
                .firestore()
                .runTransaction((transaction) => {
                  // This code may get re-run multiple times if there are conflicts.
                  return transaction.get(sfDocRef).then((sfDoc) => {
                    if (!sfDoc.exists) {
                      throw 'Document does not exist!';
                    }
                    let prod = updateProducts(item, sfDoc.data(), count);

                    // var newPopulation = sfDoc.data().population + 1;
                    if (prod === false) {
                      alert('update' + item.name + ' Filed  , out of Stock ');

                      throw item + '  not exist!';
                    } else {
                      transaction.update(sfDocRef, prod);
                    }
                  });
                })
                .then(async () => {
                  update = true;
                })
                .catch(() => {
                  update = false;
                });
            }, '')
            .then(() => {
              if (update) {
                updateOrder(order, order.id, odldStatus).catch((error) => {
                  console.log(error);
                  alert('UpdateOrderField failed: ', error);
                  console.log('UpdateOrderField failed: ', order);
                  console.log('UpdateOrderField failed: ', order.id);
                  console.log('UpdateOrderField failed: ', odldStatus);

                  console.log('UpdateOrderField failed: ', error);
                });
              }
            });
        } else {
          if (update) {
            updateOrder(order, order.id, odldStatus).catch((error) => {
              console.log(error);

              alert('UpdateOrderField failed: ', error);
              console.log('UpdateOrderField failed: ', order);
              console.log('UpdateOrderField failed: ', order.id);
              console.log('UpdateOrderField failed: ', odldStatus);

              console.log('UpdateOrderField failed: ', error);
            });
          }
        }
      })
      .catch((error) => {
        alert('UpdateOrderField failed: ', error);

        console.log('UpdateOrderField failed: ', error);
      });
  } else {
    updateOrder(order, order.id, odldStatus).catch((error) => {
      console.log(error);
      alert('UpdateOrderField failed: ', error);
      console.log('UpdateOrderField failed: ', order);
      console.log('UpdateOrderField failed: ', order.id);
      console.log('UpdateOrderField failed: ', odldStatus);

      console.log('UpdateOrderField failed: ', error);
    });
  }
  // prodArr.reduce(async function(ignore, item) {
  //   console.log(item.id);
  //    firebase.firestore().collection('products').doc(item.id+"").set(item);
  // },0);
}
const passwordReset = (email) => firebase.auth().sendPasswordResetEmail(email);
const getProduct = async (id) => {
  return (
    await firebase.firestore().collection('products').doc(id).get()
  ).data();
};

const getUserRole = async (email) => {
  let rez = {};
  await firebase
    .firestore()
    .collection('employees')
    .where('email', '==', email)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        rez = {...doc.data(), id: doc.id};
      });
    })
    .catch((e) => e);
  return rez.role;
};
const getOrder = async (id) => {
  let rez = {};
  rez = await firebase
    .firestore()
    .collection('Orders')
    .doc(id + '')
    .get()
    .then((querySnapshot) => {
      return {...querySnapshot.data(), id: querySnapshot.id};
    });
  return rez;
};
const equalsCheck = (a, b) => {
  return JSON.stringify(a) == JSON.stringify(b);
};

const UploadSetting = async (form) => {
  const collectionRef = firebase.firestore().collection('websiteSettings');
  const documentRef = collectionRef.doc('HomeCollectionsFlags');
  await documentRef.set({
    SalesCollection: form.SalesCollection,
    ElectronicsCollection: form.ElectronicsCollection,
    FashionCollection: form.FashionCollection,
    ShoesCollection: form.ShoesCollection,
    BestDealCollection: form.TopBestCollection,
  });
};

export {
  getMainCategories,
  getWearhouseRebort,
  getProduct,
  UploadSetting,
  getOrderRebort,
  getOrder,
  addEmployees,
  generateEID,
  generateID,
  generateKey,
  updateOrder,
  storeImage,
  addProduct,
  addRuningCost,
  editRuningCost,
  updateOreder,
  addSalePoint,
  generateSPID,
  editEmployees,
  getCartProduct,
  getUserRole,
  passwordReset,
  firebase,
  auth,
  EditSPoints,
  changePassword,
  updateProduct,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
  addCopun,
  addBaners,
  getBaners,
  deletCoupne,
  addMainCategory,
};

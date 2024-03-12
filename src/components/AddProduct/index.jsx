import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
// import AddPhotoIcon from '@mui/icons-material/AddAPhoto';
// import Fab from '@mui/material/Fab';
import {useIntl} from 'react-intl';
import {
  storeImage,
  generateKey,
  addProduct,
  firebase,
} from '../../@crema/services/auth/firebase/firebase';
import MainForm from './forms/MainForm';
import {useDispatch} from 'react-redux';
import {showError, showMessage} from 'redux/actions';

const AddProduct = ({description, source}) => {
  const dispatch = useDispatch();
  const [formData, updateFormData] = useState();
  const [loadingform, setLodingForm] = useState(false);
  const [showConfermationAddProduct, setShowConfermationAddProduct] =
    useState(false);

  //the images are in here
  const [imageFiles, setImageFiles] = useState([]);
  const [viewSource, setToggleViewSource] = useState(false);
  const [animation, setAnimation] = useState(false);
  const {messages} = useIntl();
  // const [imageUrls, setImageUrls] = useState();
  const [showImageRequiered, setShowImageRequiered] = useState(false);
  // const [productId, setProductId] = useState();
  const [clientPriceSaleDate, setClientPriceSaleDate] = useState('');
  const [vendorPriceSaleDate, setVendorPriceSaleDate] = useState('');
  const [showColorSizeCards, setshowColorSizeCards] = useState([false, false]);
  const [checkboxesPriceVia, setCheckboxesPriceVia] = useState([false, false]);
  const [selctedCatagort, setselctedCatagort] = useState([]);
  const [mainSelctedCatagort, setMainSelctedCatagort] = useState([]);
  const [inputCategoryValue, setinputCategoryValue] = React.useState('');
  const [categoryOption, setCategoryOption] = useState([]);
  const [categoryOptionLoading, setCategoryOptionLoading] = useState(true);
  const [mainCategoryOption, setMainCategoryOption] = useState([]);
  const [mainCategoryOptionLoading, setMainCategoryOptionLoading] =
    useState(true);
  const [brandOption, setBrandOption] = useState([]);
  const [brandOptionLoading, setBrandOptionLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [selctedBrands, setselctedBrands] = useState([]);
  const [showProduct, setShowProduct] = useState(true);
  const [showVendorFields, setShowVendorFields] = useState(false);
  const [showWholesaleFields, setShowWholesaleFields] = useState(false);
  const [showClientFields, setShowClientFields] = useState(false);
  const [priceFlage, setPriceFlage] = useState('');
  const [variants, setVariants] = useState([]);
  let picture = [];

  const uploadProduct = async () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    let stock = 0;

    variants.map((item) => {
      if (item.size.length != 0) {
        item.size.map((temp) => {
          stock += Number(temp.count);
        });
      } else {
        stock += Number(item.count);
      }
    });

    var offerDate = clientPriceSaleDate;
    if (offerDate) {
      var ddd = String(offerDate.getDate()).padStart(2, '0');
      var mmm = String(offerDate.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyyy = offerDate.getFullYear();
      offerDate = yyyyy + '-' + mmm + '-' + ddd;
    }
    var offerVendorDate = vendorPriceSaleDate;
    if (offerVendorDate) {
      var dddd = String(offerVendorDate.getDate()).padStart(2, '0');
      var mmmm = String(offerVendorDate.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyyyy = offerVendorDate.getFullYear();
      offerVendorDate = yyyyyy + '-' + mmmm + '-' + dddd;
    }
    let slug = formData.name.toLowerCase().trim().replaceAll('/', ' ');
    const form = {
      priceFlage: priceFlage,
      name: formData.name,
      id: 0,
      slug: slug.replaceAll(' ', '-'),
      short_desc: formData.short_desc,
      product_info: formData.product_info,
      price: formData.price ? Number(formData.price) : null,
      sale_price: formData.sale_price ? Number(formData.sale_price) : null,
      review: 0,
      showProduct: showProduct,
      ratings: 0,
      until: offerDate ? offerDate : null,
      sale: offerDate ? true : false,
      until_vendor: offerVendorDate ? offerVendorDate : null,
      vendorSale: offerVendorDate ? true : false,
      stock: stock ? Number(stock) : Number(formData.productCount),
      top: formData.top ? Boolean(formData.top) : null,
      featured: formData.featured ? Boolean(formData.featured) : null,
      new: formData.new ? Boolean(formData.new) : null,
      author: null,
      sold: 0,
      eventFlag: false,
      category: selctedCatagort,
      mainCategory: mainSelctedCatagort,
      brands: selctedBrands,
      pictures: picture.map((item) => ({...item, height: 600, width: 600})),
      sm_pictures: picture,
      variants:
        variants[0].id == 99999 && !variants[0].size.length ? [] : variants,
      vendor_price: !isNaN(formData.vendor_price)
        ? Number(formData.vendor_price)
        : null,
      vendor_sale_price: formData.vendor_sale_price
        ? Number(formData.vendor_sale_price)
        : null,
      time: Date.now(),
      addDate: today,
      vendorSalesCounter: 0,
      vendorSalesPriecsCount: 0,
      clintSalesCount: 0,
      clistSalesPriceCount: 0,
      damegdCouont: 0,
      cost: Number(formData.cost),
      reviews: [],
      vendorShow: showWholesaleFields,
    };
    let validation = formValidation(form);
    if (!validation) {
      return false;
    }
    await addProduct(form);
    return true;
  };

  useEffect(() => {
    getBrands();
    getCategories();
    getMainCategories();
  }, []);

  const getBrands = () => {
    let brand = [];
    setBrandOptionLoading(true);
    firebase
      .firestore()
      .collection('brands')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          brand.push({...doc.data()});
        });
        setBrandOptionLoading(false);
      });
    setBrandOption(brand);
  };

  const getCategories = () => {
    setCategoryOptionLoading(true);
    let category = [];
    firebase
      .firestore()
      .collection('category')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          category.push({...doc.data()});
        });
        setCategoryOptionLoading(false);
      });
    setCategoryOption(category);
  };

  const getMainCategories = () => {
    setMainCategoryOptionLoading(true);
    let mainCategory = [];
    firebase
      .firestore()
      .collection('mainCategories')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          mainCategory.push({...doc.data()});
        });
        setMainCategoryOptionLoading(false);
      });
    setMainCategoryOption(mainCategory);
  };

  async function addCategory() {
    console.log(inputCategoryValue);
    var shouldAddBrand = confirm(
      'Do you  want to add ' + {inputCategoryValue} + ' to brands',
    );

    if (shouldAddBrand) {
      let catCount = await firebase
        .firestore()
        .collection('databaseCount')
        .doc('catCount')
        .get();
      let sum = catCount.data().sum;
      catCount = catCount.data().count;
      let categoryName = inputCategoryValue.trim();
      let categorySlug = categoryName.toLowerCase().replaceAll(' ', '-');
      const category = {
        name: categoryName,
        slug: categorySlug,
      };
      await firebase
        .firestore()
        .collection('category')
        .doc(categoryName)
        .set(category)
        .then(() => {
          categoryOption.push(category);
          dispatch(showMessage('Category ' + categoryName + ' added '));
          firebase
            .firestore()
            .collection('databaseCount')
            .doc('catCount')
            .update({
              count: catCount + 1,
              sum: sum + 1,
            });
        })
        .catch(() => {
          alert('Category' + categoryName + 'added ');
        });
    }
  }

  async function addBrand() {
    console.log(inputValue);
    if (!inputValue.trim()) {
      // Alert the user or handle the empty input case
      alert('Please enter a brand name.');
      return;
    }
    var shouldAddBrand = confirm(
      'Do you  want to add  ' + {inputValue} + '  to brands',
    );

    if (shouldAddBrand) {
      let brandcount = await firebase
        .firestore()
        .collection('databaseCount')
        .doc('brandsCount')
        .get();

      let sum = brandcount.data().sum;
      brandcount = brandcount.data().count;
      let brandname = inputValue.trim();
      let brandslug = brandname.toLowerCase().replaceAll(' ', '-');
      const brand = {
        name: brandname,
        slug: brandslug,
      };
      await firebase
        .firestore()
        .collection('brands')
        .doc(brandname)
        .set(brand)
        .then(() => {
          brandOption.push(brand);
          dispatch(showMessage('Brand ' + brandname + ' added '));
          firebase
            .firestore()
            .collection('databaseCount')
            .doc('brandsCount')
            .update({
              count: brandcount + 1,
              sum: sum + 1,
            });
        })
        .catch(() => {
          alert('Brand not  add ');
        });
    }
  }

  async function getImg() {
    console.log('start uploading the images');
    // pictures: [{width: 600, height: 600, url: imageUrls}],

    console.log(imageFiles);
    for (let item of imageFiles) {
      console.log(item);
      picture.push(await uploadImage(item));
      console.log('finished image', item);
    }

    console.log('finished images');
  }

  const uploadImage = async (image) => {
    const imageKeys = generateKey();
    const imageUrls = await storeImage(imageKeys, 'products', image);
    // setImageUrls(imageUrls);
    return {width: 300, height: 300, url: imageUrls};
  };

  const handlecheakBox = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.checked ? e.target.checked : null,
    });
  };
  const handleChangeProdactInfromatin = (e) => {
    const newValue = e.target.value.replace(/\r?\n|\r/g, '&&&');

    updateFormData({
      ...formData,
      [e.target.name]: newValue.trim(),
    });
  };
  const handleChangeProdactDescription = (e) => {
    const newValue = e.target.value.replace(/\r?\n|\r/g, '&&&');

    updateFormData({
      ...formData,
      [e.target.name]: newValue.trim(),
    });
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.name.includes('-')) {
      e.target.name = e.target.name.value(/-/g, ' '); // replace all occurrences of "-" with a space
    }
    // Prevent setting the value to '0' or empty
    if (
      e.target.name === 'cost' &&
      (e.target.value === '0' || e.target.value.trim() === '')
    ) {
      return;
    }
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleBlur = (e) => {
    // Validate on blur
    if (
      e.target.name === 'cost' &&
      (e.target.value === '0' || e.target.value.trim() === '')
    ) {
      // Handle invalid input, e.g., show an error message or reset to a default value
    }
  };
  const handleWheel = (event) => {
    event.target.blur(); // This will take focus away from the input when scrolling
  };
  const addprod = (e) => {
    e.preventDefault();
    if (!imageFiles.length) {
      setShowImageRequiered(true);
    } else {
      setLodingForm(true);
      getImg(e).then(() => {
        uploadProduct().then((rez) => {
          setLodingForm(false);
          if (!rez) {
            return;
          }
          setShowConfermationAddProduct(true);
        });
      });
    }
  };

  const formValidation = (form) => {
    if (
      form.mainCategory &&
      (form.mainCategory?.length || form.mainCategory != '') &&
      form.category?.length &&
      form.brands?.length
    ) {
      return true;
    }
    setLodingForm(false);
    dispatch(showError('all fields are requered'));
    return false;
  };

  return (
    <MainForm
      handleChangeProdactInfromatin={handleChangeProdactInfromatin}
      handleChangeProdactDescription={handleChangeProdactDescription}
      setPriceFlage={setPriceFlage}
      loadingform={loadingform}
      setImageFiles={setImageFiles}
      showConfermationAddProduct={showConfermationAddProduct}
      showColorSizeCards={showColorSizeCards}
      description={description}
      source={source}
      viewSource={viewSource}
      setToggleViewSource={setToggleViewSource}
      animation={animation}
      messages={messages}
      setAnimation={setAnimation}
      setClientPriceSaleDate={setClientPriceSaleDate}
      setVendorPriceSaleDate={setVendorPriceSaleDate}
      showImageRequiered={showImageRequiered}
      setshowColorSizeCards={setshowColorSizeCards}
      checkboxesPriceVia={checkboxesPriceVia}
      setCheckboxesPriceVia={setCheckboxesPriceVia}
      setselctedCatagort={setselctedCatagort}
      setMainSelctedCatagort={setMainSelctedCatagort}
      setinputCategoryValue={setinputCategoryValue}
      setVariants={setVariants}
      handleWheel={handleWheel}
      showWholesaleFields={showWholesaleFields}
      showClientFields={showClientFields}
      setShowClientFields={setShowClientFields}
      categoryOptionLoading={categoryOptionLoading}
      mainCategoryOptionLoading={mainCategoryOptionLoading}
      brandOptionLoading={brandOptionLoading}
      setShowWholesaleFields={setShowWholesaleFields}
      setInputValue={setInputValue}
      showVendorFields={showVendorFields}
      setShowVendorFields={setShowVendorFields}
      setselctedBrands={setselctedBrands}
      setShowProduct={setShowProduct}
      handlecheakBox={handlecheakBox}
      handleChange={handleChange}
      handleBlur={handleBlur}
      addprod={addprod}
      addCategory={addCategory}
      addBrand={addBrand}
      imageFiles={imageFiles}
      setShowImageRequiered={setShowImageRequiered}
      setShowConfermationAddProduct={setShowConfermationAddProduct}
      showProduct={showProduct}
      brandOption={brandOption}
      categoryOption={categoryOption}
      mainCategoryOption={mainCategoryOption}
      vendorPriceSaleDate={vendorPriceSaleDate}
      clientPriceSaleDate={clientPriceSaleDate}
      setLodingForm={setLodingForm}
    />
  );
};

AddProduct.propTypes = {
  source: PropTypes.any,
  description: PropTypes.node,
};

export default AddProduct;

import React, {useEffect, useState} from 'react';
import {
  Card,
  Button,
  Grid,
  Autocomplete,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Divider,
  Typography,
} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CodeIcon from '@mui/icons-material/Code';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AppAnimate from '../../@crema/core/AppAnimate';
import TextField from '@mui/material/TextField';
import {Fonts} from '../../shared/constants/AppEnums';
// import AddPhotoIcon from '@mui/icons-material/AddAPhoto';
// import Fab from '@mui/material/Fab';
import {useIntl} from 'react-intl';
import {
  storeImage,
  generateKey,
  updateProduct,
  firebase,
} from '../../@crema/services/auth/firebase/firebase';
import CDropZone from 'components/CDropZone';
import {LoadingButton, MobileDatePicker} from '@mui/lab';
import VariantVariables from './forms/VariantVariables/VariantVariables';
import ImageRequierdModal from './components/ImageRequierdModal';
import ConfermationEditProduct from './components/ConfermationEditProduct';
import {useDispatch} from 'react-redux';
import {showMessage} from 'redux/actions';

const EditProduct = ({description, source, product}) => {
  const dispatch = useDispatch();
  const [formData, updateFormData] = useState(product);
  const [loadingform, setLodingForm] = useState(false);
  const [showConfermationEditProduct, setShowConfermationEditProduct] =
    useState(false);

  //the images are in here
  const [imageFiles, setImageFiles] = useState([]);
  const [viewSource, setToggleViewSource] = useState(false);
  const [animation, setAnimation] = useState(false);
  const {messages} = useIntl();
  // const [imageUrls, setImageUrls] = useState();
  const [showImageRequiered, setShowImageRequiered] = useState(false);
  const [productId] = useState(product.id);
  const [clientPriceSaleDate, setClientPriceSaleDate] = useState(null);
  const [vendorPriceSaleDate, setVendorPriceSaleDate] = useState(null);
  const [isFeatured, setisFeatured] = useState(false);
  const [isTop, setisTop] = useState(false);
  const [isNew, setisNew] = useState(false);
  const [selctedCatagort, setselctedCatagort] = useState(product.category);
  const [inputCategoryValue, setinputCategoryValue] = React.useState('');
  const [categoryOption, setCategoryOption] = useState([]);
  const [checkboxesPriceVia, setCheckboxesPriceVia] = useState(() => {
    if (product.priceFlage === 'both') {
      return [true, true];
    } else if (product.priceFlage === 'color') {
      return [true, false];
    } else if (product.priceFlage === 'size') {
      return [false, true];
    } else {
      return [false, false];
    }
  });
  const [categoryOptionLoading, setCategoryOptionLoading] = useState(true);
  const [brandOption, setBrandOption] = useState([]);
  const [mainCategoryOption, setMainCategoryOption] = useState([]);
  const [showWholesaleFields, setShowWholesaleFields] = useState(
    product.vendorShow ? true : false,
  );
  const [mainCategoryOptionLoading, setMainCategoryOptionLoading] =
    useState(true);
  const [MainSelctedCatagort, setMainSelctedCatagort] = useState(
    product.mainCategory,
  );
  const [brandOptionLoading, setBrandOptionLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [selctedBrands, setselctedBrands] = useState(product.brands);
  const [showProduct, setShowProduct] = useState(
    product.showProduct ? product.showProduct : true,
  );
  const [showVendorFields, setShowVendorFields] = useState(false);
  const [showClientFields, setShowClientFields] = useState(false);
  const [SalePrice, setSalePrice] = useState('');
  const [ClientSalePrice, setClientSalePrice] = useState('');
  const [isClinetSale, setIsClinetSale] = useState(false);
  const [showVendorSale, setShowVendorSale] = useState(false);
  const [priceFlage, setPriceFlage] = useState(product.priceFlage);
  const [variants, setVariants] = useState(product.variants);

  const [showColorSizeCards, setshowColorSizeCards] = useState([
    product?.variants?.length > 0 && product.variants[0]?.id != 99999,
    product?.variants?.length > 0 &&
      product.variants.findIndex((item) => item.size?.length > 0) > -1,
  ]);

  useEffect(() => {
    {
      product.vendor_sale_price ? SetVendorSaleOn() : SetVendorSaleOff();
    }
    {
      product.sale_price ? SetClentSaleOn() : SetClentSaleOff();
    }
    {
      product.featured ? setisFeatured(true) : setisFeatured(false);
    }
    {
      product.top ? setisTop(true) : setisTop(false);
    }

    {
      product.new ? setisNew(true) : setisNew(false);
    }
    {
      product.showProduct ? setShowProduct(true) : setShowProduct(false);
    }

    // product?.variants[0]?.color_name == 'color_name'
    //   ? setshowColorSizeCards(false, true)
    //   : product.variants?.map((item) => {
    //       if (item.size) {
    //         setshowColorSizeCards(true, true);
    //       }
    //     });
    const file = [];
    product.pictures.map((item) => {
      file.push({
        path: item.url,
        lastModified: new Date(),
        ' lastModifiedDate': '',
        name: item.url,
        size: item.height,
        type: 'image/png',
        webkitRelativePath: item.url,
      });
    });
    setImageFiles(file);
  }, [product]);

  let picture = [];
  const uploadProduct = async () => {
    console.log('befor ', product);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    let stock = 0;
    console.log(variants);
    if (variants && variants.length > 0) {
      variants.map((item) => {
        if (item.size?.length != 0) {
          item.size?.map((temp) => {
            stock += Number(temp.count);
          });
        } else {
          stock += Number(item.count);
        }
      });
    }
    var offerDate = clientPriceSaleDate
      ? clientPriceSaleDate
      : product.until
      ? product.until
      : null;

    if (offerDate && typeof offerDate == 'object') {
      var ddd = String(offerDate.getDate()).padStart(2, '0');
      var mmm = String(offerDate.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyyy = offerDate.getFullYear();
      offerDate = yyyyy + '-' + mmm + '-' + ddd;
    }

    var offerVendorDate = vendorPriceSaleDate
      ? vendorPriceSaleDate
      : product.until_vendor
      ? product.until_vendor
      : null;

    if (offerVendorDate && typeof offerVendorDate == 'object') {
      var dddd = String(offerVendorDate.getDate()).padStart(2, '0');
      var mmmm = String(offerVendorDate.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyyyy = offerVendorDate.getFullYear();
      offerVendorDate = yyyyyy + '-' + mmmm + '-' + dddd;
    }

    const form = {
      name: formData.name ? formData.name : product.name,
      id: productId,
      product_info: formData.product_Information
        ? formData.product_Information
        : product.product_info,
      slug: formData.name
        ? (formData.name + ' ' + product.id)
            .toLowerCase()
            .trim()
            .replaceAll(' ', '-')
        : product.slug,
      short_desc: formData.short_desc
        ? formData.short_desc
        : product.short_desc,
      price: formData.price ? Number(formData.price) : Number(product.price),
      sale_price: isClinetSale
        ? formData.sale_price
          ? Number(formData.sale_price)
          : product.sale_price
          ? Number(product.sale_price)
          : null
        : null,
      review: product.review ? product.review : 0,
      ratings: product.ratings ? product.ratings : 0,
      until: isClinetSale
        ? offerDate
          ? offerDate
          : product.until
          ? product.until
          : null
        : null,
      sale: isClinetSale
        ? offerDate
          ? true
          : product.until
          ? true
          : null
        : false,
      until_vendor: showVendorSale
        ? offerVendorDate
          ? offerVendorDate
          : product.until_vendor
          ? product.until_vendor
          : null
        : null,
      vendorSale: showVendorSale ? (offerVendorDate ? true : false) : false,
      stock: stock
        ? Number(stock)
        : formData.stock
        ? Number(formData.stock)
        : Number(product.stock),
      top: isTop,
      featured: isFeatured,
      new: isNew,
      author: null,
      sold: product.sold ? product.sold : 0,
      category: selctedCatagort ? selctedCatagort : product.category,
      brands: selctedBrands ? selctedBrands : product.brand,
      mainCategory: MainSelctedCatagort
        ? MainSelctedCatagort
        : product.mainCategory.Categorytitle,
      pictures: picture.map((item) => ({...item, height: 600, width: 600})),
      sm_pictures: picture,
      variants:
        variants[0]?.id == 99999 && !variants[0]?.size.length ? [] : variants,
      vendor_price: formData.vendor_price
        ? Number(formData.vendor_price)
        : product.vendor_price
        ? Number(product.vendor_price)
        : null,
      vendor_sale_price: showVendorSale
        ? formData.vendor_sale_price
          ? Number(formData.vendor_sale_price)
          : product.vendor_sale_price
          ? Number(product.vendor_sale_price)
          : null
        : null,
      time: product.time,
      addDate: product.addDate,
      vendorSalesCounter: product.vendorSalesCounter,
      vendorSalesPriecsCount: product.vendorSalesPriecsCount,
      clintSalesCount: product.clintSalesCount,
      clistSalesPriceCount: product.clistSalesPriceCount,
      damegdCouont: product.damegdCouont,
      cost: formData.cost ? Number(formData.cost) : Number(product.cost),
      reviews: product.reviews ? product.reviews : [],
      vendorShow: showWholesaleFields,
      showProduct: showProduct,
      priceFlage: priceFlage,
    };
    console.log(' upload Object');
    let slctedMainCAtgerot = mainCategoryOption.filter(
      (item) => item.Categorytitle === form.mainCategory,
    );
    await updateProduct(form, slctedMainCAtgerot);
  };

  useEffect(() => {
    getBrands();
    getMainCategories(), getCategories();
  }, []);

  const SetClentSaleOn = () => {
    setShowClientFields(true);
    setIsClinetSale(true);
    setClientSalePrice(product.sale_price);
    setClientPriceSaleDate(product.until);
  };

  const SetClentSaleOff = () => {
    setShowClientFields(false);
  };
  const SetVendorSaleOn = () => {
    setShowVendorFields(true);
    setShowVendorSale(true);
    setSalePrice(product.vendor_sale_price);
    setVendorPriceSaleDate(product.until_vendor);
  };
  const SetVendorSaleOff = () => {
    setShowVendorFields(false);
    setShowVendorSale(false);
  };

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

  ////////////////////////////

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
    console.log(mainCategory);
  };

  //////////////////////

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
          dispatch(showMessage('Category' + categoryName + 'added '));
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
    var shouldAddBrand = confirm(
      'Do you  want to add ' + {inputValue} + ' to brands',
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
          dispatch(showMessage('brand has been added'));
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
      console.log(product.pictures);
      let index = product.pictures.findIndex((pitem) => pitem.url == item.path);
      console.log(index);
      index > -1
        ? picture.push(product.pictures[index])
        : picture.push(await uploadImage(item));
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

  const handleChange = (e) => {
    console.log(e.target.value);

    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleChangeDescription = (e) => {
    const newValue = e.target.value.replace(/\r?\n|\r/g, '&&&');

    console.log(e.target.value);

    updateFormData({
      ...formData,
      [e.target.name]: newValue.trim(),
    });
  };
  const handleChangeInformation = (e) => {
    const newValue = e.target.value.replace(/\r?\n|\r/g, '&&&');

    console.log(e.target.value);

    updateFormData({
      ...formData,
      [e.target.name]: newValue.trim(),
    });
  };

  const addprod = (e) => {
    e.preventDefault();
    if (!imageFiles.length) {
      setShowImageRequiered(true);
    } else {
      setLodingForm(true);
      getImg(e).then(() => {
        uploadProduct().then(() => {
          setLodingForm(false);
          setShowConfermationEditProduct(true);
        });
      });
    }
  };

  return (
    <form onSubmit={(e) => addprod(e)}>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <Card>
          <CardHeader
            xs={{
              py: 4,

              pb: 1,
              px: 5,
              display: 'flex',
              alignItems: 'center',
              minHeight: 50,
              boxSizing: 'border-box',
              '& .MuiTypography-h5': {
                fontSize: 14,
                fontWeight: Fonts.BOLD,
                marginBottom: 0.25,
              },
            }}
            // title={title}
            subheader={description}
            root={{
              subheader: {
                fontSize: 13,
              },
            }}
            action={
              source ? (
                <Box>
                  <IconButton
                    aria-label='view code'
                    onClick={() => {
                      if (animation) {
                        setAnimation(!animation);
                        setTimeout(() => setToggleViewSource(!viewSource), 400);
                      } else {
                        setAnimation(!animation);
                        setToggleViewSource(!viewSource);
                      }
                    }}
                    size='large'
                  >
                    <CodeIcon />
                  </IconButton>
                </Box>
              ) : null
            }
          />

          <CardContent xs={{px: 10, pt: 1}}>
            <Grid item xs={12} lg={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    id='producrtView'
                    name='producrtView'
                    checked={showProduct}
                    onChange={() => setShowProduct(!showProduct)}
                  />
                }
                label={messages['ecommerce.addproduct.producrtView']}
              />
            </Grid>
            <Grid container>
              <Grid
                container
                item
                xs={12}
                sm={5}
                spacing={4}
                textAlign={'start'}
              >
                <Grid item xs={12} lg={6}>
                  <TextField
                    id='outlined-basic'
                    name='name'
                    label={messages['product.addproduct.productName']}
                    variant='outlined'
                    defaultValue={product.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item textAlign={{lg: 'end', xs: 'start'}} xs={12} lg={6}>
                  <TextField
                    type='number'
                    id='outlined-basic'
                    name='price'
                    disabled={checkboxesPriceVia[0] || checkboxesPriceVia[1]}
                    label={messages['product.addproduct.productPrice']}
                    variant='outlined'
                    defaultValue={product.price}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    type='number'
                    id='cost'
                    name='cost'
                    label={messages['product.addproduct.productCost']}
                    defaultValue={product.cost}
                    variant='outlined'
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} lg={6} textAlign={{lg: 'end', xs: 'start'}}>
                  <TextField
                    type='number'
                    id='stock'
                    name='stock'
                    label={messages['product.addproduct.productUnits']}
                    variant='outlined'
                    disabled={showColorSizeCards[0] || showColorSizeCards[1]}
                    defaultValue={product.stock}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id='isVendorPrice'
                        name='isVendorPrice'
                        checked={showWholesaleFields}
                        onChange={() =>
                          setShowWholesaleFields(!showWholesaleFields)
                        }
                      />
                    }
                    label={messages['ecommerce.addproduct.wholesale']}
                  />
                </Grid>

                {showWholesaleFields ? (
                  <>
                    <Grid
                      item
                      xs={12}
                      lg={6}
                      textAlign={{lg: 'end', xs: 'start'}}
                    >
                      <TextField
                        type='number'
                        id='vendor_price'
                        disabled={
                          checkboxesPriceVia[0] || checkboxesPriceVia[1]
                        }
                        name='vendor_price'
                        label={messages['ecommerce.addproduct.vendor_price']}
                        variant='outlined'
                        defaultValue={
                          product.vendor_price ? product.vendor_price : 0
                        }
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
                {/* //////////////////////main category autocomplete */}
                <Grid item xs={12}>
                  <Autocomplete
                    loading={mainCategoryOptionLoading}
                    onChange={(event, value) =>
                      setMainSelctedCatagort(value.Categorytitle)
                    }
                    id='checkboxes-tags-demo'
                    options={mainCategoryOption}
                    getOptionLabel={(option) => option.Categorytitle}
                    renderOption={(props, option, {selected}) => (
                      <li {...props}>
                        <Checkbox style={{marginRight: 8}} checked={selected} />
                        {option.Categorytitle}
                      </li>
                    )}
                    defaultValue={{Categorytitle: MainSelctedCatagort}}
                    renderTags={(items) =>
                      items.map((item) => (
                        <Chip
                          key={item.Categorytitle}
                          label={item.Categorytitle}
                          size='small'
                          color='primary'
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={messages['ecommerce.addproduct.MainCatigorys']}
                        placeholder={
                          messages['ecommerce.addproduct.MainCatigorys']
                        }
                      />
                    )}
                  />
                </Grid>
                {/* ////////////////////////////////////// */}

                <Grid item xs={12} container>
                  <Grid item xs={9}>
                    <Autocomplete
                      loading={brandOptionLoading}
                      onChange={(event, value) => setselctedBrands(value)}
                      onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                      }}
                      noOptionsText={
                        <Button onClick={addBrand}>add brand</Button>
                      }
                      multiple
                      id='checkboxes-brand'
                      name='cheakboxAddbrand'
                      options={brandOption}
                      disablecloseonselectug='true'
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option, {selected}) => (
                        <li {...props}>
                          <Checkbox
                            style={{marginRight: 8}}
                            checked={selected}
                          />
                          {option.name}
                        </li>
                      )}
                      defaultValue={product.brands.filter((item) => item.name)}
                      renderTags={(items) =>
                        items.map((item) => (
                          <Chip
                            key={item.name}
                            label={item.name}
                            size='small'
                            color='primary'
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name='render'
                          label={messages['BRAND']}
                          placeholder={messages['BRAND']}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button onClick={addBrand}>{messages['add_brand']}</Button>
                  </Grid>
                </Grid>
                <Grid item xs={12} container>
                  <Grid xs={9} item>
                    <Autocomplete
                      loading={categoryOptionLoading}
                      onChange={(event, value) => setselctedCatagort(value)}
                      onInputChange={(event, newInputValue) => {
                        setinputCategoryValue(newInputValue);
                      }}
                      noOptionsText={
                        <Button onClick={addCategory}>
                          {messages['add_subCatigorys']}
                        </Button>
                      }
                      multiple
                      id='checkboxes-tags-demo'
                      options={categoryOption}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option, {selected}) => (
                        <li {...props}>
                          <Checkbox
                            style={{marginRight: 8}}
                            checked={selected}
                          />
                          {option.name}
                        </li>
                      )}
                      defaultValue={product.category.filter(
                        (item) => item.name,
                      )}
                      renderTags={(items) =>
                        items.map((item) => (
                          <>
                            <Chip
                              key={item.name}
                              label={item.name}
                              size='small'
                              color='primary'
                            />
                          </>
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={messages['SubCatigorys']}
                          placeholder={messages['SubCatigorys']}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Button onClick={addCategory}>
                      {messages['add_subCatigorys']}
                    </Button>
                  </Grid>
                </Grid>
                <Grid item container xs={12}>
                  <TextField
                    style={{width: '100%'}}
                    id='outlined-basic'
                    name='product_Information'
                    label={messages['product_info']}
                    variant='outlined'
                    size='large'
                    multiline
                    defaultValue={product.product_info.split('&&&').join('\n')}
                    inputProps={{style: {minHeight: 70}}}
                    onChange={handleChangeInformation}
                    required
                  />
                </Grid>
                <Grid item container xs={12}>
                  <TextField
                    style={{width: '100%'}}
                    id='outlined-basic'
                    name='short_desc'
                    label={messages['short_desc']}
                    variant='outlined'
                    size='large'
                    multiline
                    defaultValue={product.short_desc.split('&&&').join('\n')}
                    inputProps={{style: {minHeight: 70}}}
                    onChange={handleChangeDescription}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item container xs={12} spacing={4}>
                  {showWholesaleFields ? (
                    <Grid item xs={12} lg={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            id='vendorFields'
                            name='vendorFields'
                            checked={showVendorSale}
                            onChange={() => {
                              setShowVendorSale(!showVendorSale);
                              setShowVendorFields(!showVendorFields);
                            }}
                          />
                        }
                        label={messages['VendorSale']}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12} lg={6}></Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id='clientFields'
                          checked={isClinetSale}
                          name='clientFields'
                          onChange={() => {
                            setShowClientFields(!showClientFields);
                            setIsClinetSale(!isClinetSale);
                          }}
                        />
                      }
                      label={messages['ClientSales']}
                    />
                  </Grid>
                  {showVendorFields && (
                    <>
                      <Grid item xs={12} lg={6}>
                        <TextField
                          id='vendor_sale_price'
                          name='vendor_sale_price'
                          defaultValue={SalePrice}
                          label={messages['vendorSalePrice']}
                          variant='outlined'
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid
                        item
                        textAlign={{xs: 'start', lg: 'end'}}
                        xs={12}
                        lg={6}
                      >
                        <MobileDatePicker
                          id='outlined-basic'
                          label={messages['Saleuntil']}
                          name='until'
                          value={vendorPriceSaleDate}
                          onChange={(newValue) =>
                            setVendorPriceSaleDate(newValue)
                          }
                          renderInput={(params) => {
                            params.error = false;
                            return <TextField {...params} />;
                          }}
                        />
                      </Grid>
                    </>
                  )}

                  {showClientFields && (
                    <>
                      <Grid item xs={12} lg={6}>
                        <TextField
                          id='outlined-basic'
                          name='sale_price'
                          defaultValue={ClientSalePrice}
                          label={messages['sale_price']}
                          variant='outlined'
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid
                        item
                        textAlign={{lg: 'end', xs: 'start'}}
                        xs={12}
                        lg={6}
                      >
                        <MobileDatePicker
                          id='outlined-basic'
                          label={messages['Saleuntil']}
                          name='until'
                          value={clientPriceSaleDate}
                          onChange={(newValue) => {
                            setClientPriceSaleDate(newValue);
                          }}
                          renderInput={(params) => {
                            params.error = false;
                            return <TextField {...params} />;
                          }}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={6} lg={6}>
                  <FormGroup title='addons'>
                    <FormLabel component='legend'>
                      {messages['ADDONS']}
                    </FormLabel>

                    <FormControlLabel
                      control={
                        <Checkbox
                          id='featured'
                          checked={isFeatured}
                          name='featured'
                          onChange={() => setisFeatured(!isFeatured)}
                        />
                      }
                      label={messages['featured']}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id='top'
                          checked={isTop}
                          name='top'
                          onChange={() => setisTop(!isTop)}
                        />
                      }
                      label={messages['top']}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id='new'
                          checked={isNew}
                          name='new'
                          onChange={() => setisNew(!isNew)}
                        />
                      }
                      label={messages['new']}
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid item xs={0} sm={1}>
                <Divider
                  orientation='vertical'
                  style={{
                    marginRight: '50%',
                    marginLeft: '50%',
                    height: '100%',
                    width: '1px',
                  }}
                />
              </Grid>
              <Grid
                container
                item
                xs={12}
                sm={6}
                spacing={4}
                textAlign={'start'}
              >
                <Grid item xs={12}>
                  <Grid
                    m={5}
                    item
                    maxHeight={{xs: '270px', lg: '590px'}}
                    overflow={'auto'}
                    xs={12}
                  >
                    <CDropZone files={imageFiles} setFiles={setImageFiles} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            {/* <Fab
              color='primary'
              aria-label='add-image'
              xs={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                overflow: 'hidden',
              }}
            >
              <input
                name='file_name'
                onChange={theimage}
                id='file-id'
                type='file'
                accept='image/*'
                multiple
                style={{
                  //make this hidden and display only the icon
                  position: 'absolute',
                  top: '-35px',
                  left: 0,
                  height: 'calc(100% + 36px)',
                  width: 'calc(100% + 5px)',
                  outline: 'none',
                }}
              />
              <AddPhotoIcon />
            </Fab> */}
          </CardContent>
        </Card>
      </AppAnimate>
      <br />
      <AppAnimate>
        <>
          <Typography variant='h2' mb={2}>
            {messages['ecommerce.addproduct.AddVariants']}
          </Typography>

          <VariantVariables
            product={product}
            variants={variants}
            showColorSizeCards={showColorSizeCards}
            setshowColorSizeCards={setshowColorSizeCards}
            setCheckboxesPriceVia={setCheckboxesPriceVia}
            checkboxesPriceVia={checkboxesPriceVia}
            showWholesaleFields={showWholesaleFields}
            setVariants={setVariants}
            setPriceFlage={setPriceFlage}
          />
          <br />
        </>
      </AppAnimate>
      <br />
      <AppAnimate>
        <Card>
          <CardHeader
            action={
              source ? (
                <Box>
                  <IconButton
                    aria-label='view code'
                    onClick={() => {
                      if (animation) {
                        setAnimation(!animation);
                        setTimeout(() => setToggleViewSource(!viewSource), 400);
                      } else {
                        setAnimation(!animation);
                        setToggleViewSource(!viewSource);
                      }
                    }}
                    size='large'
                  >
                    <CodeIcon />
                  </IconButton>
                </Box>
              ) : null
            }
          />

          {loadingform ? (
            <Grid mb={2} ml={2}>
              <LoadingButton loading variant='outlined'>
                {messages['ecommerce.addproduct.loding']}
              </LoadingButton>
            </Grid>
          ) : (
            <Grid mb={2} ml={2}>
              <Button type='submit' variant='contained' color='primary'>
                {messages['ecommerce.updateProduct']}
              </Button>
            </Grid>
          )}
        </Card>
      </AppAnimate>
      <ImageRequierdModal
        open={showImageRequiered}
        setOpen={setShowImageRequiered}
      />
      <ConfermationEditProduct
        open={showConfermationEditProduct}
        setOpen={setShowConfermationEditProduct}
      />
    </form>
  );
};

EditProduct.propTypes = {
  source: PropTypes.any,
  description: PropTypes.node,
  product: PropTypes.object,
};

export default EditProduct;

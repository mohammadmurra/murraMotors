import React, {useEffect, useState} from 'react';
import {
  Card,
  Button,
  Grid,
  Autocomplete,
  Checkbox,
  Chip,
  Divider,
  OutlinedInput,
  InputAdornment,
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
  addBaners,
    firebase,
} from '../../@crema/services/auth/firebase/firebase';
import CDropZone from 'components/CDropZone';
import {LoadingButton} from '@mui/lab';
import ImageRequierdModal from './components/ImageRequierdModal';
import ConfermationAddBaner from './components/ConfermationAddBaner';

const EditBannersForm = ({description, source, id}) => {
  
  const  [res,setRes]=useState(null);
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

  const [selctedCatagort, setselctedCatagort] = useState([]);
  const [inputCategoryValue, setinputCategoryValue] = React.useState('');
  const [categoryOption, setCategoryOption] = useState([]);
  const [categoryOptionLoading, setCategoryOptionLoading] = useState(true);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    p: 4,
  };

  let picture = [];
  const uploadProduct = async () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const form = {
      name: formData.title,
      id: id,
      slug: formData.title.toLowerCase().trim().replaceAll(' ', '-'),
      banner_info: formData.bannerInfo,
      price:formData.price? Number(formData.price):0,

      category: selctedCatagort,
      pictures: picture,

      time: Date.now(),
      addDate: today,
    };
     setRes( await addBaners(form));
   
  };
useEffect(()=>{
if(res!==null)
setShowConfermationAddProduct(true);

},[res]);
  useEffect(() => {
    getCategories();
  }, []);

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
          alert('Category' + categoryName + 'added ');

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
    const imageUrls = await storeImage(id, 'banners', image);
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

  const addprod = (e) => {
    e.preventDefault();
    if (!imageFiles.length) {
      setShowImageRequiered(true);
    } else {
      setLodingForm(true);
      getImg(e).then(() => {
        uploadProduct().then(() => {
          setLodingForm(false);
         
        });
      });
    }
  };

  return (
    <form style={style} onSubmit={(e) => addprod(e)}>
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
                    name='title'
                    label={messages['Banner.Bannertitle']}
                    variant='outlined'
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <OutlinedInput
                    id='outlined-adornment-amount'
                    name='price'
                    type='Number'
                    required
                    fullWidth
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position='start'>₪</InputAdornment>
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    loading={categoryOptionLoading}
                    onChange={(event, value) => setselctedCatagort(value)}
                    onInputChange={(event, newInputValue) => {
                      setinputCategoryValue(newInputValue);
                    }}
                    noOptionsText={
                      <Button onClick={addCategory}>add catigory</Button>
                    }
                    multiple
                    id='checkboxes-tags-demo'
                    options={categoryOption}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option, {selected}) => (
                      <li {...props}>
                        <Checkbox style={{marginRight: 8}} checked={selected} />
                        {option.name}
                      </li>
                    )}
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
                        label='Catigorys'
                        placeholder='Catigorys'
                      />
                    )}
                  />
                </Grid>
                <Grid item container xs={12}>
                  <TextField
                    style={{width: '100%'}}
                    id='outlined-basic'
                    name='bannerInfo'
                    
                    label={['Banner Information']}
                    variant='outlined'
                    size='large'
                    inputProps={{style: {minHeight: 70}}}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
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
          </CardContent>
          {loadingform ? (
            <Grid mb={2} ml={2}>
              <LoadingButton loading variant='outlined'>
                {messages['Banner.uploading']}
              </LoadingButton>
            </Grid>
          ) : (
            <Grid mb={2} ml={2}>
              <Button type='submit' variant='contained' color='primary'>
                {messages['Banner.upload']}
              </Button>
            </Grid>
          )}
          <ImageRequierdModal
            open={showImageRequiered}
            setOpen={setShowImageRequiered}
          />
          <ConfermationAddBaner  data={res}   
            open={showConfermationAddProduct}
            setOpen={setShowConfermationAddProduct}
          />
        </Card>
      </AppAnimate>
    </form>
  );
};

EditBannersForm.propTypes = {
  source: PropTypes.any,
  description: PropTypes.node,
  id: PropTypes.string,
};

export default EditBannersForm;

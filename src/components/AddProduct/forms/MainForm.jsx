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
import PropTypes from 'prop-types';
import CDropZone from 'components/CDropZone';
import {LoadingButton, MobileDatePicker} from '@mui/lab';
import VariantVariables from './../forms/VariantVariables';
import ImageRequierdModal from './../components/ImageRequierdModal';
import ConfermationAddProduct from './../components/ConfermationAddProduct';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AppAnimate from '../../../@crema/core/AppAnimate';
import TextField from '@mui/material/TextField';
import {Fonts} from '../../../shared/constants/AppEnums';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CodeIcon from '@mui/icons-material/Code';

const MainForm = ({
  loadingform,
  setLodingForm,
  setImageFiles,
  showConfermationAddProduct,
  showColorSizeCards,
  description,
  source,
  handleWheel,
  viewSource,
  setToggleViewSource,
  animation,
  messages,
  setPriceFlage,
  setAnimation,
  setClientPriceSaleDate,
  setVendorPriceSaleDate,
  showImageRequiered,
  setshowColorSizeCards,
  checkboxesPriceVia,
  setCheckboxesPriceVia,
  setselctedCatagort,
  setMainSelctedCatagort,
  setinputCategoryValue,
  setVariants,
  showWholesaleFields,
  showClientFields,
  setShowClientFields,
  categoryOptionLoading,
  mainCategoryOptionLoading,
  handleBlur,
  brandOptionLoading,
  setShowWholesaleFields,
  setInputValue,
  showVendorFields,
  setShowVendorFields,
  setselctedBrands,
  setShowProduct,
  handlecheakBox,
  handleChange,
  handleChangeProdactInfromatin,
  handleChangeProdactDescription,
  addprod,
  addCategory,
  addBrand,
  imageFiles,
  setShowImageRequiered,
  setShowConfermationAddProduct,
  showProduct,
  brandOption,
  categoryOption,
  mainCategoryOption,
  vendorPriceSaleDate,
  clientPriceSaleDate,
}) => {
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
                    onWheel={handleWheel}
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
                    variant='outlined'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onWheel={handleWheel}
                    required
                  />
                </Grid>

                <Grid item xs={12} lg={6} textAlign={{lg: 'end', xs: 'start'}}>
                  <TextField
                    type='number'
                    id='productCount'
                    name='productCount'
                    label={messages['product.addproduct.productUnits']}
                    disabled={showColorSizeCards[0] || showColorSizeCards[1]}
                    variant='outlined'
                    onChange={handleChange}
                    onWheel={handleWheel}
                    required
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id='isVendorPrice'
                        name='isVendorPrice'
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
                        id='vendor_price'
                        name='vendor_price'
                        type='float'
                        step=''
                        min='0.01'
                        max='100'
                        disabled={
                          checkboxesPriceVia[0] || checkboxesPriceVia[1]
                        }
                        label={messages['ecommerce.addproduct.vendor_price']}
                        variant='outlined'
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
                    onChange={(event, value) => setMainSelctedCatagort(value)}
                    id='checkboxes-tags-demo'
                    options={mainCategoryOption}
                    getOptionLabel={(option) => option.Categorytitle}
                    renderOption={(props, option, {selected}) => (
                      <li {...props}>
                        <Checkbox style={{marginRight: 8}} checked={selected} />
                        {option.Categorytitle}
                      </li>
                    )}
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
                        <Button onClick={addBrand}>
                          {messages['add_brand']}
                        </Button>
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

                
                </Grid>
                <Grid item container xs={12}>
                  <TextField
                    style={{width: '100%'}}
                    id='outlined-basic'
                    name='product_info'
                    label={messages['product_info']}
                    variant='outlined'
                    size='large'
                    multiline
                    inputProps={{style: {minHeight: 70}}}
                    onChange={handleChangeProdactInfromatin}
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
                    inputProps={{style: {minHeight: 70}}}
                    onChange={handleChangeProdactDescription}
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
                            onChange={() =>
                              setShowVendorFields(!showVendorFields)
                            }
                          />
                        }
                        label={messages['VendorSale']}
                      />
                    </Grid>
                  ) : (
                    <></>
                  )}
                  <Grid item xs={12} lg={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id='clientFields'
                          name='clientFields'
                          onChange={() =>
                            setShowClientFields(!showClientFields)
                          }
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
                          type='float'
                          step=''
                          min='0.01'
                          max='100'
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
                          onChange={(newValue) => {
                            console.log(newValue);
                            setVendorPriceSaleDate(newValue);
                          }}
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
                          type='float'
                          step=''
                          min='0.01'
                          max='100'
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
                          name='featured'
                          onChange={(e) => handlecheakBox(e)}
                        />
                      }
                      label={messages['featured']}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id='top'
                          name='top'
                          onChange={(e) => handlecheakBox(e)}
                        />
                      }
                      label={messages['top']}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id='new'
                          name='new'
                          onChange={(e) => handlecheakBox(e)}
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
            setPriceFlage={setPriceFlage}
            showColorSizeCards={showColorSizeCards}
            setshowColorSizeCards={setshowColorSizeCards}
            setCheckboxesPriceVia={setCheckboxesPriceVia}
            checkboxesPriceVia={checkboxesPriceVia}
            showWholesaleFields={showWholesaleFields}
            setVariants={setVariants}
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
                {messages['ecommerce.addproduct']}
              </Button>
            </Grid>
          )}
        </Card>
      </AppAnimate>
      <ImageRequierdModal
        open={showImageRequiered}
        setOpen={setShowImageRequiered}
      />
      <ConfermationAddProduct
        open={showConfermationAddProduct}
        setOpen={setShowConfermationAddProduct}
        setLodingForm={setLodingForm}
      />
    </form>
  );
};

export default MainForm;

MainForm.propTypes = {
  loadingform: PropTypes.bool.isRequired,
  setImageFiles: PropTypes.func.isRequired,
  showConfermationAddProduct: PropTypes.bool.isRequired,
  showColorSizeCards: PropTypes.array.isRequired,
  description: PropTypes.node,
  source: PropTypes.any,
  viewSource: PropTypes.bool.isRequired,
  setToggleViewSource: PropTypes.func.isRequired,
  animation: PropTypes.bool.isRequired,
  messages: PropTypes.any,
  setAnimation: PropTypes.func.isRequired,
  setClientPriceSaleDate: PropTypes.func.isRequired,
  setVendorPriceSaleDate: PropTypes.func.isRequired,
  showImageRequiered: PropTypes.bool.isRequired,
  setshowColorSizeCards: PropTypes.func.isRequired,
  checkboxesPriceVia: PropTypes.array.isRequired,
  setCheckboxesPriceVia: PropTypes.func.isRequired,
  setselctedCatagort: PropTypes.func.isRequired,
  setMainSelctedCatagort: PropTypes.func.isRequired,
  setinputCategoryValue: PropTypes.func.isRequired,
  setVariants: PropTypes.func.isRequired,
  showWholesaleFields: PropTypes.bool.isRequired,
  showClientFields: PropTypes.bool.isRequired,
  setShowClientFields: PropTypes.func.isRequired,
  categoryOptionLoading: PropTypes.bool.isRequired,
  brandOptionLoading: PropTypes.bool.isRequired,
  setShowWholesaleFields: PropTypes.func.isRequired,
  setInputValue: PropTypes.func.isRequired,
  showVendorFields: PropTypes.bool.isRequired,
  setShowVendorFields: PropTypes.func.isRequired,
  setselctedBrands: PropTypes.func.isRequired,
  setShowProduct: PropTypes.func.isRequired,
  handlecheakBox: PropTypes.func.isRequired,
  handleWheel: PropTypes.func.isRequired,
  setLodingForm: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChangeProdactInfromatin: PropTypes.func.isRequired,
  handleChangeProdactDescription: PropTypes.func.isRequired,
  addprod: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  addBrand: PropTypes.func.isRequired,
  imageFiles: PropTypes.array.isRequired,
  setShowImageRequiered: PropTypes.func.isRequired,
  setShowConfermationAddProduct: PropTypes.func.isRequired,
  showProduct: PropTypes.bool.isRequired,
  brandOption: PropTypes.array.isRequired,
  categoryOption: PropTypes.array.isRequired,
  mainCategoryOption: PropTypes.array.isRequired,
  mainCategoryOptionLoading: PropTypes.bool.isRequired,
  vendorPriceSaleDate: PropTypes.string.isRequired,
  clientPriceSaleDate: PropTypes.string.isRequired,
  setPriceFlage: PropTypes.string.isRequired,
};

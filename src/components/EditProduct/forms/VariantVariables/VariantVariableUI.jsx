import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import PropTypes from 'prop-types';
import ColorPickerDialog from './ColorPickerDialog';

const VariantVariablesUI = ({
  messages,
  toggleSizeContainer,
  toggleColorContainer,
  showColorSizeCards,
  priceViaColor,
  priceViaSize,
  checkboxesPriceVia,
  showColorTable,
  colors,
  setColors,
  deleteColor,
  addPriceColor,
  addPriceVendorColor,
  setOpenColorDialog,
  openColorDialog,
  addColorName,
  showVendorPrice,
  addSizesOptions,
  deleteSize,
  sizes,
  setSizes,
  sizesOptions,
  setTempSizeOption,
  variants,
  addCountColorSize,
  addSizePrice,
  addSizeVendorPrice,
  addCountSize,
  addPriceColorSize,
  addVendorPriceColorSize,
  addCountColor,
}) => {
  return (
    <>
      {/* get price on  */}
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
              marginBottom: 0.25,
            },
          }}
          root={{
            subheader: {
              fontSize: 13,
            },
          }}
          title={messages['ecommerce.addproduct.AddVariants']}
        />
        <CardContent xs={{px: 10, pt: 1}}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    onClick={() => {
                      toggleColorContainer();
                    }}
                    id='add color'
                    name='add color'
                    checked={showColorSizeCards[0]}
                  />
                }
                label={messages['add_color']}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    onClick={() => {
                      toggleSizeContainer();
                    }}
                    id='add Size'
                    name='add Size'
                    checked={showColorSizeCards[1]}
                  />
                }
                label={messages['addـSize']}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {showColorSizeCards[0] && (
                <FormControlLabel
                  control={
                    <Checkbox
                      onClick={() => {
                        priceViaColor();
                      }}
                      id='priceViaColor'
                      name='price via color'
                      checked={checkboxesPriceVia[0]}
                    />
                  }
                  label={messages['priceViaColor']}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {showColorSizeCards[1] && (
                <FormControlLabel
                  control={
                    <Checkbox
                      onClick={() => {
                        priceViaSize();
                      }}
                      id='price via size'
                      name='price via size'
                      checked={checkboxesPriceVia[1]}
                    />
                  }
                  label={messages['priceViaSize']}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br />

      {/* addColor */}
      {showColorSizeCards[0] && (
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
                marginBottom: 0.25,
              },
            }}
            root={{
              subheader: {
                fontSize: 13,
              },
            }}
            title={messages['ecommerce.addproduct.AddColor']}
          />
          <CardContent xs={{px: 10, pt: 1}}>
            <Grid container height={'100%'} spacing={3}>
              <Grid item xs={6} sm={3}>
                <Button
                  fullWidth
                  variant='contained'
                  size='large'
                  onClick={() => setOpenColorDialog(true)}
                >
                  {messages['ecommerce.addproduct.AddColor']}
                </Button>
              </Grid>
              <Grid item container xs={12} elevation={1}>
                {showColorTable > 0 && (
                  <TableContainer component={Paper}>
                    <Table aria-label='simple table' id='myTable'>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            {messages['ecommerce.addproduct.Variants']}
                          </TableCell>
                          <TableCell align='center'>
                            {messages['ecommerce.addproduct.colorName']}
                          </TableCell>
                          {checkboxesPriceVia[0] && !checkboxesPriceVia[1] && (
                            <>
                              <TableCell align='center'>
                                {messages['ecommerce.addproduct.price']}
                              </TableCell>
                              {showVendorPrice && (
                                <TableCell align='center'>
                                  {messages['ecommerce.addproduct.vendorPrice']}
                                </TableCell>
                              )}
                            </>
                          )}
                        </TableRow>
                      </TableHead>
                      {colors.map((item) => (
                        <TableBody key={item}>
                          <TableCell valign='middle'>
                            <IconButton
                              onClick={() => {
                                deleteColor(item);
                              }}
                            >
                              <CircleIcon sx={{color: item}} />
                            </IconButton>
                          </TableCell>
                          <TableCell align='center'>
                            <TextField
                              name='name'
                              variant='outlined'
                              label= {messages['colorName']}
                              value={
                                variants
                                  .map((colorItem) => {
                                    return colorItem.color == item
                                      ? colorItem
                                      : null;
                                  })
                                  .filter((i) => i != null)[0]?.color_name
                              }
                              required
                              onChange={(field) => {
                                addColorName(field, item);
                              }}
                            />
                          </TableCell>
                          {checkboxesPriceVia[0] && !checkboxesPriceVia[1] && (
                            <>
                              <TableCell align='center'>
                                <TextField
                                  type={'number'}
                                  name='name'
                                  variant='outlined'
                                  label={messages['product.addproduct.productPrice']}
                                  required
                                  value={
                                    variants
                                      .map((colorItem) => {
                                        return colorItem.color == item
                                          ? colorItem
                                          : null;
                                      })
                                      .filter((i) => i != null)[0]?.price
                                  }
                                  onChange={(field) => {
                                    addPriceColor(field, item);
                                  }}
                                />
                              </TableCell>
                              {showVendorPrice && (
                                <TableCell align='center'>
                                  <TextField
                                    name='name'
                                    variant='outlined'
                                    label={messages['ecommerce.addproduct.vendor_price']}
                                    required
                                    value={
                                      variants
                                        .map((colorItem) => {
                                          return colorItem.color == item
                                            ? colorItem
                                            : null;
                                        })
                                        .filter((i) => i != null)[0]
                                        ?.vendor_price
                                    }
                                    onChange={(field) => {
                                      addPriceVendorColor(field, item);
                                    }}
                                  />
                                </TableCell>
                              )}
                            </>
                          )}
                        </TableBody>
                      ))}
                    </Table>
                  </TableContainer>
                )}
                <br />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      <br />

      {/* start addSize container */}
      {showColorSizeCards[1] && (
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
                marginBottom: 0.25,
              },
            }}
            root={{
              subheader: {
                fontSize: 13,
              },
            }}
            title={messages['ecommerce.addproduct.AddSize']}
          />
          <CardContent>
            <Autocomplete
              fullWidth
              onInputChange={(_, newInputValue) => {
                setTempSizeOption(newInputValue);
              }}
              multiple
              noOptionsText={
                <Button
                  fullWidth
                  onClick={() => {
                    addSizesOptions();
                  }}
                >
                  {messages['ecommerce.addproduct.AddSize']}
                </Button>
              }
              value={sizes}
              renderTags={(items) =>
                items.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    onDelete={() => {
                      deleteSize(item);
                    }}
                  />
                ))
              }
              onChange={(_, item) => {
                setSizes(item);
              }}
              options={sizesOptions}
              renderInput={(props) => <TextField {...props} fullWidth />}
            />
            {sizes?.length > 0 &&
              checkboxesPriceVia[1] == true &&
              !checkboxesPriceVia[0] && (
                <TableContainer component={Paper}>
                  <Table aria-label='simple table' id='myTable'>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          {messages['ecommerce.addproduct.Variants']}
                        </TableCell>
                        <TableCell align='center'>
                          {messages['ecommerce.addproduct.price']}
                        </TableCell>
                        {showVendorPrice && (
                          <TableCell align='center'>
                            {messages['ecommerce.addproduct.vendorPrice']}
                          </TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    {sizes?.map((item) => (
                      <TableBody key={item}>
                        <TableCell valign='middle'>{item}</TableCell>
                        <TableCell align='center'>
                          <TextField
                            type={'number'}
                            name='number'
                            variant='outlined'
                            label={messages['product.addproduct.productPrice']}
                            value={
                              variants[0]?.size
                                .map((size) => {
                                  return size.id == item ? size : null;
                                })
                                .filter((size) => size != null)[0]?.price
                            }
                            required
                            onChange={(field) => {
                              addSizePrice(field, item);
                            }}
                          />
                        </TableCell>
                        {showVendorPrice && (
                          <TableCell align='center'>
                            <TextField
                              name='name'
                              variant='outlined'
                              label={messages['ecommerce.addproduct.vendor_price']}
                              value={
                                variants[0]?.size
                                  .map((size) => {
                                    return size.id == item ? size : null;
                                  })
                                  .filter((size) => size != null)[0]
                                  ?.vendor_price
                              }
                              required
                              onChange={(field) => {
                                addSizeVendorPrice(field, item);
                              }}
                            />
                          </TableCell>
                        )}
                      </TableBody>
                    ))}
                  </Table>
                </TableContainer>
              )}
          </CardContent>
        </Card>
      )}
      {/* start Table container size color count | price | vendor price */}
      {(colors?.length > 0 || sizes?.length > 0) && (
        <>
          <br />
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
                  marginBottom: 0.25,
                },
              }}
              root={{
                subheader: {
                  fontSize: 13,
                },
              }}
              title={messages['ecommerce.addproduct.AddVariants']}
            />
            <CardContent>
              <TableContainer component={Paper}>
                <Table aria-label='simple table' id='myTable'>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        {messages['ecommerce.addproduct.Variants']}
                      </TableCell>
                      {checkboxesPriceVia[0] &&
                        checkboxesPriceVia[1] &&
                        sizes?.length > 0 &&
                        colors.length > 0 && (
                          <>
                            <TableCell align='center'>
                              {messages['ecommerce.addproduct.price']}
                            </TableCell>
                            <TableCell align='center'>
                              {messages['ecommerce.addproduct.vendorPrice']}
                            </TableCell>
                          </>
                        )}
                      <TableCell align='center'>
                        {messages['ecommerce.addproduct.count']}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {sizes?.length && !colors.length
                    ? sizes.map((sizeItem) => (
                        <TableBody key={sizeItem}>
                          <TableCell valign='middle'>
                            <h4 style={{display: 'inline'}}>{sizeItem}</h4>
                          </TableCell>
                          <TableCell align='center'>
                            <TextField
                              type={'number'}
                              name='number'
                              variant='outlined'
                              label={messages['product.addproduct.productUnits']}
                              value={
                                variants[0]?.size
                                  ?.map((size) => {
                                    return size.id == sizeItem ? size : null;
                                  })
                                  .filter((size) => size != null)[0]?.count
                              }
                              required
                              onChange={(field) => {
                                addCountSize(field, sizeItem);
                              }}
                            />
                          </TableCell>
                        </TableBody>
                      ))
                    : colors.map((item) =>
                        sizes?.length > 0 ? (
                          sizes.map((sizeItem) => (
                            <TableBody key={item + sizeItem}>
                              <TableCell valign='middle'>
                                <h4 style={{display: 'inline'}}>{sizeItem}|</h4>
                                <CircleIcon fontSize='3' sx={{color: item}} />
                              </TableCell>
                              {checkboxesPriceVia[0] && checkboxesPriceVia[1] && (
                                <>
                                  <TableCell align='center'>
                                    <TextField
                                      type={'number'}
                                      name='number'
                                      variant='outlined'
                                      label={messages['product.addproduct.productPrice']}
                                      value={
                                        variants[
                                          variants.findIndex(
                                            (cItem) => cItem.color == item,
                                          )
                                        ]?.size
                                          ?.map((size) => {
                                            return size.id == sizeItem
                                              ? size
                                              : null;
                                          })
                                          .filter((size) => size != null)[0]
                                          ?.price
                                      }
                                      required
                                      onChange={(field) => {
                                        addPriceColorSize(
                                          field,
                                          item,
                                          sizeItem,
                                        );
                                      }}
                                    />
                                  </TableCell>
                                  {showVendorPrice && (
                                    <TableCell align='center'>
                                      <TextField
                                        name='name'
                                        variant='outlined'
                                        label={messages['ecommerce.addproduct.vendor_price']}
                                        required
                                        value={
                                          variants[
                                            variants.findIndex(
                                              (cItem) => cItem.color == item,
                                            )
                                          ]?.size
                                            ?.map((size) => {
                                              return size.id == sizeItem
                                                ? size
                                                : null;
                                            })
                                            .filter((size) => size != null)[0]
                                            ?.vendor_price
                                        }
                                        onChange={(field) => {
                                          addVendorPriceColorSize(
                                            field,
                                            item,
                                            sizeItem,
                                          );
                                        }}
                                      />
                                    </TableCell>
                                  )}
                                </>
                              )}
                              <TableCell align='center'>
                                <TextField
                                  type={'number'}
                                  name='name'
                                  variant='outlined'
                                  label={messages['product.addproduct.productUnits']}
                                  required
                                  value={
                                    variants[
                                      variants.findIndex(
                                        (cItem) => cItem.color == item,
                                      )
                                    ]?.size
                                      ?.map((size) => {
                                        return size.id == sizeItem
                                          ? size
                                          : null;
                                      })
                                      ?.filter((size) => size)[0]?.count
                                  }
                                  onChange={(field) => {
                                    addCountColorSize(field, item, sizeItem);
                                  }}
                                />
                              </TableCell>
                            </TableBody>
                          ))
                        ) : (
                          <TableBody key={item}>
                            <TableCell>
                              <CircleIcon sx={{color: item}} />
                            </TableCell>
                            <TableCell align='center'>
                              <TextField
                                type={'number'}
                                name='name'
                                variant='outlined'
                                label={messages['product.addproduct.productUnits']}
                                value={
                                  variants
                                    .map((colorItem) => {
                                      return colorItem.color == item
                                        ? colorItem
                                        : null;
                                    })
                                    .filter((i) => i != null)[0]?.count
                                }
                                required
                                onChange={(field) => {
                                  addCountColor(field, item);
                                }}
                              />
                            </TableCell>
                          </TableBody>
                        ),
                      )}
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </>
      )}
      <ColorPickerDialog
        colors={colors}
        setColor={setColors}
        messages={messages}
        openDialog={openColorDialog}
        setOpenDialog={setOpenColorDialog}
      />
    </>
  );
};
VariantVariablesUI.propTypes = {
  messages: PropTypes.any.isRequired,
  toggleColorContainer: PropTypes.func.isRequired,
  toggleSizeContainer: PropTypes.func.isRequired,
  showColorSizeCards: PropTypes.array.isRequired,
  priceViaColor: PropTypes.func.isRequired,
  priceViaSize: PropTypes.func.isRequired,
  checkboxesPriceVia: PropTypes.array.isRequired,
  showColorTable: PropTypes.bool.isRequired,
  colors: PropTypes.array.isRequired,
  setColors: PropTypes.func.isRequired,
  setOpenColorDialog: PropTypes.func.isRequired,
  openColorDialog: PropTypes.bool.isRequired,
  deleteColor: PropTypes.func.isRequired,
  addPriceColor: PropTypes.func.isRequired,
  addPriceVendorColor: PropTypes.func.isRequired,
  showVendorPrice: PropTypes.bool.isRequired,
  addSizesOptions: PropTypes.func.isRequired,
  addColorName: PropTypes.func.isRequired,
  deleteSize: PropTypes.func.isRequired,
  sizes: PropTypes.array.isRequired,
  setSizes: PropTypes.func.isRequired,
  sizesOptions: PropTypes.array.isRequired,
  setTempSizeOption: PropTypes.func.isRequired,
  variants: PropTypes.array.isRequired,
  addCountColorSize: PropTypes.func.isRequired,
  addSizePrice: PropTypes.func.isRequired,
  addSizeVendorPrice: PropTypes.func.isRequired,
  addCountSize: PropTypes.func.isRequired,
  addPriceColorSize: PropTypes.func.isRequired,
  addVendorPriceColorSize: PropTypes.func.isRequired,
  addCountColor: PropTypes.func.isRequired,
};
export default VariantVariablesUI;

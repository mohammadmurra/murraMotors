import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
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
import {useEffect, useState} from 'react';
import CColorPicker from 'components/CColorPicker';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';

const VariantVariables = ({
  setVariants,
  setshowColorSizeCards,
  showColorSizeCards,
  showWholesaleFields,
  checkboxesPriceVia,
  setCheckboxesPriceVia
}) => {
 
  const [colorPicker, setColorPicker] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [openColorDialog, setOpenColorDialog] = useState(false);
  const [sizesOptions, setSizesOption] = useState(['XS', 'S', 'L', 'XL']);
  const [tempOnChangeValueSize, setTempOnChangeValueSize] = useState('');
  const {messages} = useIntl();

  useEffect(() => {
    if (!showColorSizeCards[0]) {
      setColorPicker([]);
      setCheckboxesPriceVia((prev) => {
        prev[0] = false;
        return [...prev];
      });
    }
    if (!showColorSizeCards[1]) {
      setSizes([]);
      setCheckboxesPriceVia((prev) => {
        prev[1] = false;
        return [...prev];
      });
    }
  }, [showColorSizeCards]);

  useEffect(() => {
    if (!checkboxesPriceVia[0]) {
      setVariants((prev) => {
        prev.map((cItem) => {
          delete cItem?.price;
          delete cItem?.vendor_price;
        });
        return [...prev];
      });
    }
    if (!checkboxesPriceVia[1]) {
      setVariants((prev) => {
        prev.map((cItem) => {
          cItem?.size?.map((sItem) => {
            delete sItem.price;
            delete sItem.vendor_price;
          });
        });
        return [...prev];
      });
    }
  }, [checkboxesPriceVia]);

  useEffect(() => {
    setVariants(() => {
      return colorPicker.length > 0
        ? colorPicker.map((item, index) => {
            return {color: item, id: index, size: []};
          })
        : [{color: 'default', color_name: 'default', id: 99999, size: []}];
    });
  }, [colorPicker]);

  useEffect(() => {
    setVariants([{color: 'default', id: 99999, size: []}]);
  }, []);

  useEffect(() => {
    if (checkboxesPriceVia[0] && !checkboxesPriceVia[1]) {
      setVariants((old) => {
        old.map((varItem) => {
          varItem?.size?.map((varSize) => {
            delete varSize?.vendor_price;
            delete varSize?.price;
            return varSize;
          });
          return varItem;
        });
        return old;
      });
    }

    if (
      (checkboxesPriceVia[0] && checkboxesPriceVia[1]) ||
      (!checkboxesPriceVia[0] && checkboxesPriceVia[1])
    ) {
      setVariants((old) => {
        old.map((varItem) => {
          delete varItem?.price;
          delete varItem?.vendor_price;
          return varItem;
        });
        return old;
      });
    }
  }, [checkboxesPriceVia]);

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
                      setshowColorSizeCards((prev) => [
                        (prev[0] = !prev[0]),
                        prev[1],
                      ]);
                    }}
                    id='add color'
                    name='add color'
                  />
                }
                label='add color'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    onClick={() => {
                      setshowColorSizeCards((prev) => [
                        prev[0],
                        (prev[1] = !prev[1]),
                      ]);
                    }}
                    id='add Size'
                    name='add Size'
                  />
                }
                label='add Size'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {showColorSizeCards[0] && (
                <FormControlLabel
                  control={
                    <Checkbox
                      onClick={() => {
                        setCheckboxesPriceVia((prev) => [
                          (prev[0] = !prev[0]),
                          prev[1],
                        ]);
                      }}
                      id='priceViaColor'
                      name='price via color'
                    />
                  }
                  label='price via color'
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {showColorSizeCards[1] && (
                <FormControlLabel
                  control={
                    <Checkbox
                      onClick={() => {
                        setCheckboxesPriceVia((prev) => [
                          prev[0],
                          (prev[1] = !prev[1]),
                        ]);
                      }}
                      id='price via size'
                      name='price via size'
                    />
                  }
                  label='price via size'
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
                {colorPicker.length > 0 && (
                  <TableContainer component={Paper}>
                    <Table
                      aria-label='simple table'
                      maxWidth={'90%'}
                      id='myTable'
                    >
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
                              {showWholesaleFields ? (
                                <TableCell align='center'>
                                  {messages['ecommerce.addproduct.vendorPrice']}
                                </TableCell>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                        </TableRow>
                      </TableHead>
                      {colorPicker.map((item) => (
                        <TableBody key={item}>
                          <TableCell valign='middle'>
                            <IconButton
                              onClick={() => {
                                setColorPicker((prev) =>
                                  prev.filter((prItem) => prItem != item),
                                );
                              }}
                            >
                              <CircleIcon sx={{color: item}} />
                            </IconButton>
                          </TableCell>
                          <TableCell align='center'>
                            <TextField
                              name='name'
                              variant='outlined'
                              label='colorName'
                              required
                              onChange={(field) => {
                                setVariants((prevvariants) => {
                                  const a = prevvariants.filter(
                                    (e) => e.color == item,
                                  )[0].id;
                                  prevvariants[a].color_name =
                                    field.target.value;
                                  return [...prevvariants];
                                });
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
                                  label='Price'
                                  required
                                  onChange={(field) => {
                                    setVariants((prevvariants) => {
                                      const a = prevvariants.filter(
                                        (e) => e.color == item,
                                      )[0].id;
                                      prevvariants[a].price = Number(
                                        field.target.value,
                                      );
                                      return [...prevvariants];
                                    });
                                  }}
                                />
                              </TableCell>
                              {showWholesaleFields ? (
                                <TableCell align='center'>
                                  <TextField
                                    name='name'
                                    variant='outlined'
                                    label='vendor price'
                                    required
                                    onChange={(field) => {
                                      setVariants((prevvariants) => {
                                        const a = prevvariants.filter(
                                          (e) => e.color == item,
                                        )[0].id;
                                        prevvariants[a].vendor_price = Number(
                                          field.target.value,
                                        );
                                        return [...prevvariants];
                                      });
                                    }}
                                  />
                                </TableCell>
                              ) : (
                                <></>
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
            <Dialog
              open={openColorDialog}
              onClose={() => setOpenColorDialog(false)}
            >
              <DialogTitle>
                {messages['ecommerce.addproduct.AddColor']}{' '}
              </DialogTitle>
              <DialogContent>
                <CColorPicker
                  selectedColors={colorPicker}
                  setSelectedColor={setColorPicker}
                />
              </DialogContent>
            </Dialog>
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
              onInputChange={(event, newInputValue) => {
                setTempOnChangeValueSize(newInputValue);
              }}
              multiple
              noOptionsText={
                <Button
                  fullWidth
                  onClick={() => {
                    console.log(tempOnChangeValueSize);
                    setSizesOption((e) => [...e, tempOnChangeValueSize]);
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
                      setVariants((prev) => {
                        return [
                          {
                            ...prev[0],
                            size: [
                              ...prev[0].size.filter(
                                (sitem) => sitem.id != item,
                              ),
                            ],
                          },
                        ];
                      });
                      setSizes(sizes.filter((sItem) => item != sItem));
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
            {sizes.length > 0 &&
              checkboxesPriceVia[1] == true &&
              !checkboxesPriceVia[0] && (
                <TableContainer component={Paper}>
                  <Table
                    aria-label='simple table'
                    maxWidth={'90%'}
                    id='myTable'
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          {messages['ecommerce.addproduct.Variants']}
                        </TableCell>
                        <TableCell align='center'>
                          {messages['ecommerce.addproduct.price']}
                        </TableCell>

                        {showWholesaleFields ? (
                          <TableCell align='center'>
                            {messages['ecommerce.addproduct.vendorPrice']}
                          </TableCell>
                        ) : (
                          <></>
                        )}
                      </TableRow>
                    </TableHead>
                    {sizes.map((item) => (
                      <TableBody key={item}>
                        <TableCell valign='middle'>{item}</TableCell>
                        <TableCell align='center'>
                          <TextField
                            type={'number'}
                            name='number'
                            variant='outlined'
                            label='Price'
                            required
                            onChange={(field) => {
                              setVariants((prev) => {
                                prev.map((prevColor) => {
                                  if (!prevColor.size?.length) {
                                    prevColor.size.push({
                                      id: item,
                                      name: item,
                                      price: Number(field.target.value),
                                    });
                                  }
                                  prevColor.size?.filter(
                                    (filItem) => filItem.id == item,
                                  )[0]
                                    ? prevColor.size.map((e) =>
                                        e.id == item
                                          ? (e.price = Number(
                                              field.target.value,
                                            ))
                                          : e,
                                      )
                                    : prevColor.size.push({
                                        id: item,
                                        name: item,
                                        price: Number(field.target.value),
                                      });
                                  return [...prev];
                                });
                                return [...prev];
                              });
                            }}
                          />
                        </TableCell>
                        {showWholesaleFields ? (
                          <TableCell align='center'>
                            <TextField
                              name='name'
                              variant='outlined'
                              label='vendor price'
                              required
                              onChange={(field) => {
                                setVariants((prev) => {
                                  prev.map((prevColor) => {
                                    if (!prevColor.size?.length) {
                                      prevColor.size.push({
                                        id: item,
                                        name: item,
                                        vendor_price: Number(
                                          field.target.value,
                                        ),
                                      });
                                    }
                                    prevColor.size?.filter(
                                      (filItem) => filItem.id == item,
                                    )[0]
                                      ? prevColor.size.map((e) =>
                                          e.id == item
                                            ? (e.vendor_price = Number(
                                                field.target.value,
                                              ))
                                            : e,
                                        )
                                      : prevColor.size.push({
                                          id: item,
                                          name: item,
                                          vendor_price: Number(
                                            field.target.value,
                                          ),
                                        });
                                    return [...prev];
                                  });
                                  return [...prev];
                                });
                              }}
                            />
                          </TableCell>
                        ) : (
                          <></>
                        )}
                      </TableBody>
                    ))}
                  </Table>
                </TableContainer>
              )}
          </CardContent>
        </Card>
      )}
      {/* start Table container */}
      {(colorPicker.length > 0 || sizes.length > 0) && (
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
                <Table aria-label='simple table' maxWidth={'90%'} id='myTable'>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        {messages['ecommerce.addproduct.Variants']}
                      </TableCell>
                      {checkboxesPriceVia[0] &&
                        checkboxesPriceVia[1] &&
                        sizes.length > 0 &&
                        colorPicker.length > 0 && (
                          <>
                            <TableCell align='center'>
                              {messages['ecommerce.addproduct.price']}
                            </TableCell>
                            {showWholesaleFields ? (
                              <TableCell align='center'>
                                {messages['ecommerce.addproduct.vendorPrice']}
                              </TableCell>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      <TableCell align='center'>
                        {messages['ecommerce.addproduct.count']}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {sizes.length && !colorPicker.length
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
                              label='#Units'
                              required
                              onChange={(field) => {
                                setVariants((prev) => {
                                  if (!prev[0].size?.length) {
                                    prev[0].size.push({
                                      id: sizeItem,
                                      name: sizeItem,
                                      count: Number(field.target.value),
                                    });
                                  }
                                  prev[0].size?.filter(
                                    (filItem) => filItem.id == sizeItem,
                                  )[0]
                                    ? prev[0].size.map((e) =>
                                        e.id == sizeItem
                                          ? (e.count = Number(
                                              field.target.value,
                                            ))
                                          : e,
                                      )
                                    : prev[0].size.push({
                                        id: sizeItem,
                                        name: sizeItem,
                                        count: Number(field.target.value),
                                      });
                                  return [...prev];
                                });
                              }}
                            />
                          </TableCell>
                        </TableBody>
                      ))
                    : colorPicker.map((item) =>
                        sizes.length > 0 ? (
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
                                      label='Price'
                                      required
                                      onChange={(field) => {
                                        setVariants((prevvariants) => {
                                          const a = prevvariants.filter(
                                            (e) => e.color == item,
                                          )[0].id;
                                          const b = prevvariants[
                                            a
                                          ].size?.filter(
                                            (e) => e.id == sizeItem,
                                          )[0]?.id;
                                          delete prevvariants[a]?.count;
                                          b
                                            ? prevvariants[a].size.map((e) =>
                                                e.id == sizeItem
                                                  ? (e.price = Number(
                                                      field.target.value,
                                                    ))
                                                  : e,
                                              )
                                            : prevvariants[a].size.push({
                                                id: sizeItem,
                                                name: sizeItem,
                                                count: Number(
                                                  field.target.value,
                                                ),
                                              });

                                          return [...prevvariants];
                                        });
                                      }}
                                    />
                                  </TableCell>
                                  {showWholesaleFields?
                                  <TableCell align='center'>
                                    <TextField
                                      name='name'
                                      variant='outlined'
                                      label='vendor price'
                                      required
                                      onChange={(field) => {
                                        setVariants((prevvariants) => {
                                          const a = prevvariants.filter(
                                            (e) => e.color == item,
                                          )[0].id;
                                          const b = prevvariants[
                                            a
                                          ].size?.filter(
                                            (e) => e.id == sizeItem,
                                          )[0]?.id;
                                          delete prevvariants[a]?.count;
                                          b
                                            ? prevvariants[a].size.map((e) =>
                                                e.id == sizeItem
                                                  ? (e.vendor_price = Number(
                                                      field.target.value,
                                                    ))
                                                  : e,
                                              )
                                            : prevvariants[a].size.push({
                                                id: sizeItem,
                                                name: sizeItem,
                                                count: Number(
                                                  field.target.value,
                                                ),
                                              });

                                          return [...prevvariants];
                                        });
                                      }}
                                    />
                                  </TableCell>
                                  :<></>}
                                </>
                              )}
                              <TableCell align='center'>
                                <TextField
                                  type={'number'}
                                  name='name'
                                  variant='outlined'
                                  label='#Units'
                                  required
                                  onChange={(field) => {
                                    setVariants((prevvariants) => {
                                      const a = prevvariants.filter(
                                        (e) => e.color == item,
                                      )[0].id;
                                      const b = prevvariants[a].size?.filter(
                                        (e) => e.id == sizeItem,
                                      )[0]?.id;
                                      delete prevvariants[a]?.count;
                                      b
                                        ? prevvariants[a].size.map((e) =>
                                            e.id == sizeItem
                                              ? (e.count = Number(
                                                  field.target.value,
                                                ))
                                              : e,
                                          )
                                        : prevvariants[a].size.push({
                                            id: sizeItem,
                                            name: sizeItem,
                                            count: Number(field.target.value),
                                          });

                                      return [...prevvariants];
                                    });
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
                                label='#Units'
                                required
                                onChange={(field) => {
                                  setVariants((prev) => {
                                    const a = prev.filter(
                                      (e) => e.color == item,
                                    )[0].id;
                                    prev[a].count = Number(field.target.value);
                                    return [...prev];
                                  });
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
    </>
  );
};

VariantVariables.propTypes = {
  setVariants: PropTypes.func,
  showColorSizeCards: PropTypes.array,
  setshowColorSizeCards: PropTypes.func,
  showWholesaleFields: PropTypes.bool,
  checkboxesPriceVia: PropTypes.array,
  setCheckboxesPriceVia: PropTypes.func,
};

export default VariantVariables;

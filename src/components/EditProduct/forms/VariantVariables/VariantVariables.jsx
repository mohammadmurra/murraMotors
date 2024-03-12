import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import VariantVariablesUI from './VariantVariableUI';

const VariantVariables = ({
  product,
  setVariants,
  variants,
  setshowColorSizeCards,
  showColorSizeCards,
  showWholesaleFields,
  setPriceFlage,
  setCheckboxesPriceVia,
  checkboxesPriceVia,
}) => {
  const [colors, setColors] = useState(
    variants && variants[0]?.id != 99999
      ? variants?.map((color) => color.color)
      : [],
  );
  const [sizes, setSizes] = useState(
    variants ? variants[0]?.size?.map((sizes) => sizes?.id) : [],
  );
  const [openColorDialog, setOpenColorDialog] = useState(false);
  const [sizesOptions, setSizesOption] = useState(['XS', 'S', 'L', 'XL']);
  const [tempSizeOption, setTempSizeOption] = useState('');

  const {messages} = useIntl();

  useEffect(() => {
    console.log(variants);
  }, [variants]);

  // remove only vendor price
  useEffect(() => {
    if (!showWholesaleFields) {
      setVariants((prev) => {
        return prev.map((color) => {
          delete color?.vendor_price;
          color.size?.map((sizes) => {
            delete sizes?.vendor_price;
            return sizes;
          });
          return color;
        });
      });
    }
  }, [showWholesaleFields]);

  // set what to show the color/size.
  useEffect(() => {
    if (!showColorSizeCards[0]) {
      closeColorContainer();
    }
    if (!showColorSizeCards[1]) {
      closeSizeContainer();
    }
  }, [showColorSizeCards]);

  // set init valus for the colors and sizes.
  // note that we need the price flag since if there is flag on both.
  useEffect(() => {
    if (product.priceFlage === 'both') {
      setCheckboxesPriceVia([true, true]);
    } else if (product.priceFlage === 'color') {
      setCheckboxesPriceVia([true, false]);
    } else if (product.priceFlage === 'size') {
      setCheckboxesPriceVia([false, true]);
    } else {
      setCheckboxesPriceVia([false, false]);
    }
  }, [product]);

  // handle when the price via change to delete price from the needed places
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
      setPriceFlage('color');
    }

    if (
      (checkboxesPriceVia[0] && checkboxesPriceVia[1]) ||
      (!checkboxesPriceVia[0] && checkboxesPriceVia[1])
    ) {
      setVariants((old) => {
        old?.map((varItem) => {
          delete varItem?.price;
          delete varItem?.vendor_price;
          return varItem;
        });
        return old;
      });
      checkboxesPriceVia[0] && checkboxesPriceVia[1]
        ? setPriceFlage('both')
        : setPriceFlage('size');
    }
    if (!checkboxesPriceVia[0] && !checkboxesPriceVia[1]) {
      setPriceFlage('none');
      setVariants((old) => {
        old?.map((varItem) => {
          delete varItem?.price;
          delete varItem?.vendor_price;
          varItem.size = varItem.size?.map((ss) => {
            delete ss?.price;
            delete ss?.vendor_price;
            return ss;
          })
            ? varItem.size?.map((ss) => {
                delete ss?.price;
                delete ss?.vendor_price;
                return ss;
              })
            : [];
          return varItem;
        });
        return old;
      });
    }
  }, [checkboxesPriceVia]);

  // update color adding
  useEffect(() => {
    console.log('updatecolor');

    let tempColor = [];
    console.log(colors);
    colors.map((color, index) => {
      tempColor.push({
        id: index,
        color: color,
        size: sizes.map((sizeArr) => {
          return {
            name: sizeArr,
            id: sizeArr,
          };
        }),
      });
    });
    if (tempColor.length > 0) {
      if (variants[0]?.id == 99999) {
        setVariants((prevV) => {
          prevV[0].id = 0;
          prevV[0].color = tempColor[0].color;
          return prevV;
        });
      } else {
        setVariants((prevV) => {
          return tempColor.map((tColor) => {
            let newColor = prevV.filter(
              (prevColor) => prevColor.color == tColor.color,
            )[0];
            if (!newColor) {
              return tColor;
            }
            newColor.color = tColor.color;
            return newColor;
          });
        });
      }
    } else {
      if (showColorSizeCards[1]) {
        setVariants((prev) => {
          return prev[0]?.size.length > 0 && sizes?.length
            ? [{...prev[0], id: 99999, color_name: '99999'}]
            : [];
        });
      } else {
        setVariants([]);
      }
    }
  }, [colors]);

  // update size adding
  useEffect(() => {
    let tempSize = [];
    sizes?.map((size) => {
      tempSize.push({
        id: size,
        name: size,
      });
    });

    setVariants((prevV) => {
      return prevV.length > 0
        ? prevV.map((color) => {
            let newColors = {
              ...color,
              size: tempSize.map((size) => {
                let newSize = color?.size?.filter(
                  (vSize) => vSize.id == size.id,
                )[0];
                if (!newSize) {
                  return {...size};
                }
                newSize.id = size.id;
                newSize.name = size.name;
                return newSize;
              }),
            };
            return newColors;
          })
        : [
            {
              id: 99999,
              color_name: '99999',
              color: '99999',
              size: tempSize.map((size) => {
                let newSize = prevV[0]?.size?.filter(
                  (vSize) => vSize.id == size.id,
                )[0];
                if (!newSize) {
                  return {...size};
                }
                newSize.id = size.id;
                newSize.name = size.name;
                return newSize;
              }),
            },
          ];
    });
  }, [sizes]);

  const toggleColorContainer = () => {
    setshowColorSizeCards((prev) => [(prev[0] = !prev[0]), prev[1]]);
  };

  const closeColorContainer = () => {
    setColors([]);

    setCheckboxesPriceVia((prev) => {
      prev[0] = false;
      return [...prev];
    });
  };

  const priceViaColor = () => {
    setCheckboxesPriceVia((prev) => [(prev[0] = !prev[0]), prev[1]]);
  };

  const toggleSizeContainer = () => {
    setshowColorSizeCards((prev) => [prev[0], (prev[1] = !prev[1])]);
  };

  const closeSizeContainer = () => {
    setSizes([]);
    setCheckboxesPriceVia((prev) => {
      prev[1] = false;
      return [...prev];
    });
  };

  const priceViaSize = () => {
    setCheckboxesPriceVia((prev) => [prev[0], (prev[1] = !prev[1])]);
  };

  const deleteColor = (item) => {
    setColors((prev) => {
      let rez = prev.filter((prItem) => prItem != item);
      setVariants((prevv) => prevv.filter((prItem) => prItem.color != item));
      return [...rez];
    });
  };

  const addSizesOptions = () => {
    setSizesOption([...sizesOptions, tempSizeOption]);
  };

  const deleteSize = (item) => {
    setVariants((prev) => {
      return prev.map((color) => {
        color.size = color.size
          .map((size) => {
            return item == size.name ? null : size;
          })
          .filter((i) => i);
        return color;
      });
    });
    setSizes(sizes.filter((sItem) => item != sItem));
  };

  const addColorName = (nameElement, colorNumber) => {
    setVariants((prevvariant) => {
      return prevvariant.map((oldColor) => {
        if (oldColor.color == colorNumber) {
          oldColor.color_name = nameElement.target.value;
        }
        return oldColor;
      });
    });
  };

  const addCountColorSize = (field, colorNumber, sizeItem) => {
    setVariants((prevvariant) => {
      return prevvariant.map((colorV) => {
        if (colorV.color != colorNumber) {
          return colorV;
        }
        colorV.size.map((oneSize) => {
          if (oneSize.name == sizeItem) {
            console.log(oneSize);
            oneSize.count = field.target.value;
          }
          return oneSize;
        });
        delete colorV?.count;
        return colorV;
      });
    });
  };

  const addPriceColor = (field, colorNumber) => {
    setVariants((prevvariants) => {
      const a = prevvariants.filter((e) => e.color == colorNumber)[0].id;
      prevvariants[a].price = Number(field.target.value);
      return [...prevvariants];
    });
  };

  const addPriceVendorColor = (field, colorNumber) => {
    setVariants((prevvariants) => {
      const a = prevvariants.filter((e) => e.color == colorNumber)[0].id;
      prevvariants[a].vendor_price = Number(field.target.value);
      return [...prevvariants];
    });
  };
  const addSizePrice = (field, item) => {
    setVariants((prev) => {
      prev.map((prevColor) => {
        if (!prevColor.size?.length) {
          prevColor.size.push({
            id: item,
            name: item,
            price: Number(field.target.value),
          });
        }
        prevColor.size?.filter((filItem) => filItem.id == item)[0]
          ? prevColor.size.map((e) =>
              e.id == item ? (e.price = Number(field.target.value)) : e,
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
  };

  const addSizeVendorPrice = (field, item) => {
    setVariants((prev) => {
      prev.map((prevColor) => {
        if (!prevColor.size?.length) {
          prevColor.size.push({
            id: item,
            name: item,
            vendor_price: Number(field.target.value),
          });
        }
        prevColor.size?.filter((filItem) => filItem.id == item)[0]
          ? prevColor.size.map((e) =>
              e.id == item ? (e.vendor_price = Number(field.target.value)) : e,
            )
          : prevColor.size.push({
              id: item,
              name: item,
              vendor_price: Number(field.target.value),
            });
        return [...prev];
      });
      return [...prev];
    });
  };

  const addCountSize = (field, sizeItem) => {
    setVariants((prev) => {
      if (!prev[0].size?.length) {
        prev[0].size.push({
          id: sizeItem,
          name: sizeItem,
          count: Number(field.target.value),
        });
      }
      prev[0].size?.filter((filItem) => filItem.id == sizeItem)[0]
        ? prev[0].size.map((e) =>
            e.id == sizeItem ? (e.count = Number(field.target.value)) : e,
          )
        : prev[0].size.push({
            id: sizeItem,
            name: sizeItem,
            count: Number(field.target.value),
          });
      return [...prev];
    });
  };

  const addPriceColorSize = (field, colorNumber, sizeItem) => {
    setVariants((prevvariants) => {
      const a = prevvariants.filter((e) => e.color == colorNumber)[0].id;
      const b = prevvariants[a].size?.filter((e) => e.id == sizeItem)[0]?.id;
      delete prevvariants[a]?.count;
      b
        ? prevvariants[a].size.map((e) =>
            e.id == sizeItem ? (e.price = Number(field.target.value)) : e,
          )
        : prevvariants[a].size.push({
            id: sizeItem,
            name: sizeItem,
            count: Number(field.target.value),
          });
      return [...prevvariants];
    });
  };

  const addVendorPriceColorSize = (field, colorNumber, sizeItem) => {
    console.log(field, colorNumber, sizeItem);
    setVariants((prevvariants) => {
      const a = prevvariants.filter((e) => e.color == colorNumber)[0].id;
      const b = prevvariants[a].size?.filter((e) => e.id == sizeItem)[0]?.id;
      delete prevvariants[a]?.count;
      b
        ? prevvariants[a].size.map((e) =>
            e.id == sizeItem
              ? (e.vendor_price = Number(field.target.value))
              : e,
          )
        : prevvariants[a].size.push({
            id: sizeItem,
            name: sizeItem,
            count: Number(field.target.value),
          });

      return [...prevvariants];
    });
  };

  const addCountColor = (field, colorNumber) => {
    setVariants((prev) => {
      const a = prev.filter((e) => e.color == colorNumber)[0].id;
      prev[a].count = Number(field.target.value);
      return [...prev];
    });
  };

  return (
    <VariantVariablesUI
      messages={messages}
      toggleColorContainer={toggleColorContainer}
      toggleSizeContainer={toggleSizeContainer}
      showColorSizeCards={showColorSizeCards}
      priceViaSize={priceViaSize}
      priceViaColor={priceViaColor}
      checkboxesPriceVia={checkboxesPriceVia}
      showColorTable={colors.length > 0 ? true : false}
      colors={colors}
      setColors={setColors}
      deleteColor={deleteColor}
      addPriceColor={addPriceColor}
      addCountColor={addCountColor}
      addPriceVendorColor={addPriceVendorColor}
      openColorDialog={openColorDialog}
      setOpenColorDialog={setOpenColorDialog}
      addColorName={addColorName}
      showVendorPrice={showWholesaleFields}
      addSizesOptions={addSizesOptions}
      deleteSize={deleteSize}
      sizes={sizes}
      setSizes={setSizes}
      sizesOptions={sizesOptions}
      setTempSizeOption={setTempSizeOption}
      variants={variants}
      addCountColorSize={addCountColorSize}
      addSizePrice={addSizePrice}
      addSizeVendorPrice={addSizeVendorPrice}
      addCountSize={addCountSize}
      addPriceColorSize={addPriceColorSize}
      addVendorPriceColorSize={addVendorPriceColorSize}
    />
  );
};

VariantVariables.propTypes = {
  setVariants: PropTypes.func,
  variants: PropTypes.array,
  product: PropTypes.object,
  showColorSizeCards: PropTypes.array,
  setshowColorSizeCards: PropTypes.func,
  showWholesaleFields: PropTypes.bool,
  setPriceFlage: PropTypes.func,
  setCheckboxesPriceVia: PropTypes.func,
  checkboxesPriceVia: PropTypes.array,
};

export default VariantVariables;

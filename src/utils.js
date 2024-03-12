export function updateProducts(item, rez, count) {
  let prodact = item.name.split(" - ").join(" , ").split(" , ");
 console.log(count);
 if (count<0) {
  console.log("herererereee");

  console.log(count);

  console.log(rez.stock - count);
  console.log(rez.stock );  
 }

  if (rez.stock - count < 0) {
    return false;
  }
  if (prodact.length == 1) {
    rez.stock = rez.stock - count;
    rez.sold += count;
  } else if (prodact[2] == " Regular" || prodact[2] == "Regular"){
    console.log(prodact[1].trim());
    let index = rez.variants.findIndex(
      (item) => item.color_name == prodact[1].trim(),
    );
    if (rez.variants[index].count - count < 0) {
      return false;
    }
    rez.variants[index].count -= count;
    rez.stock = rez.stock - count;
    rez.sold += count;
  } else if (prodact[1] === " default" || prodact[1] === "default")  {
    let index = rez.variants[0].size.findIndex(
      (item) => item.name == prodact[2].trim(),
    );
    if (rez.variants[0].size[index].count - count < 0) {
      return false;
    }
    rez.variants[0].size[index].count -= count;
    rez.stock = rez.stock - count;
    rez.sold += count;
  } else {
    console.log(item);
    console.log("herererereee2222");

    let colerindex = rez.variants.findIndex(
      (item) => item.color_name == prodact[1].trim(),
    );

    let Sizeindex = rez.variants[colerindex].size.findIndex(
      (item) => item.name == prodact[2].trim(),
    );
    if (rez.variants[colerindex].size[Sizeindex].count - count < 0) {
      return false;
    }
    rez.variants[colerindex].size[Sizeindex].count -= count;
    rez.stock = rez.stock - count;
    rez.sold += count;
  }
  if (item.saletype === 'clintSalesCount') rez.clintSalesCount += count;
  else if (item.saletype == 'vendorSalesCounter')
    rez.vendorSalesCounter += count;
  else if (item.saletype === 'vendorSalesPriecsCount')
    rez.vendorSalesPriecsCount += count;
  else if (item.saletype === 'clistSalesPriceCount')
    rez.clistSalesPriceCount += count;

  return rez;
}

export const getPrice = (value, isVendor) => {
  // debugger; // eslint-disable-line no-debugger

  if (!isVendor) {
    if (value.product.until < new Date()) {
      return value.product?.variants[0]?.size[0]?.price
        ? value.product?.variants[0]?.size[0]?.price
        : value.product?.variants[0]?.price
        ? value.product?.variants[0]?.price
        : value.product?.price;
    } else {
      return value.product.sale_price;
    }
  } else {
    if (new Date(value.product?.until_vendor) < new Date()) {
      return value.product?.variants[0]?.size[0]?.vendor_price
        ? value.product?.variants[0]?.size[0]?.vendor_price
        : value.product?.variants[0]?.vendor_price
        ? value.product?.variants[0]?.vendor_price
        : value.product?.vendor_price;
    } else {
      return value.product.vendor_price;
    }
  }
};

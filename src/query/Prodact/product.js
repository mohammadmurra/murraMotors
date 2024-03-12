import {gql} from '@apollo/client';

export const GET_PRODUCTS = gql`
    query products($searchTerm: String, $color: [String], $size: [String], $brand: [String], $minPrice: Int, $maxPrice: Int, $category: String, $rating: [String], $sortBy: String, $page: Int = 1, $perPage: Int, $list: Boolean = false, $accountType: String  ,$from: Int = 0 ,$lastEndix:String,  $isNext: Boolean) {
        products(demo: ${26}, searchTerm: $searchTerm, color: $color, size: $size, brand: $brand, minPrice: $minPrice, maxPrice: $maxPrice, category: $category, rating: $rating, sortBy: $sortBy, page: $page, perPage: $perPage, accountType :$accountType ,list: $list, from: $from,lastEndix:$lastEndix,isNext:$isNext) {
            data {
                id
                name
                slug
                price
                sale_price
                review
                ratings
                until
                sold
                vendor_sale_price
                vendor_price
                until_vendor
                stock
                damegdCouont
                top
                featured
                new
                 brands {
                  name
                  slug
              }
                short_desc @include(if: $list)
                category {
                    name
                    slug
                }
                sm_pictures {
                    width
                    height
                    url
                }
                reviews {
    rating 
email 
message 
name 

    addDate
    time
}
                variants {
                    color
                    color_name
                    price
                    vendor_price
                    count
                    size {
                        name
                        id 
                        count 
                        price 
                        vendor_price
                    }
                }
                
            }
            totalCount
            lastEndix
            
        }
    }
`;

export const SEARCH_PRODUCT = gql`
  query SearchProduct($searchProductInput: SearchProductInput!) {
    searchProduct(searchProductInput: $searchProductInput) {
      name
      id
      variants {
        id
        color
        color_name
        price
        count
        vendor_price
        size {
          name
          id
          vendor_price
          price
          count
        }
      }
      sm_pictures {
        width
        height
        url
      }
      slug
      sold
      cost
      brands {
        name
        slug
      }
      stock
      short_desc
      damegdCouont
      sale_price
      price
      until
      until_vendor
      vendor_price
      vendorShow
    }
  }
`;

export const GET_CATEGORY = gql`
  query category {
    category {
      name
      slug
    }
  }
`;

export const GET_BRAND = gql`
  query brand {
    brand {
      name
      slug
    }
  }
`;
export const GET_MainCategories = gql`
    query products($searchTerm: String, $color: [String], $size: [String], $brand: [String], $minPrice: Int, $maxPrice: Int, $category: String, $rating: [String], $sortBy: String, $page: Int = 1, $perPage: Int, $list: Boolean = false, $accountType: String  ,$from: Int = 0 ,$lastEndix:String,  $isNext: Boolean) {
        products(demo: ${26}, searchTerm: $searchTerm, color: $color, size: $size, brand: $brand, minPrice: $minPrice, maxPrice: $maxPrice, category: $category, rating: $rating, sortBy: $sortBy, page: $page, perPage: $perPage, accountType :$accountType ,list: $list, from: $from,lastEndix:$lastEndix,isNext:$isNext) {
            data {
                id
                name
                slug
                price
                sale_price
                review
                ratings
                until
                sold
                vendor_sale_price
                vendor_price
                until_vendor
                stock
                damegdCouont
                top
                featured
                new
                 brands {
                  name
                  slug
              }
                short_desc @include(if: $list)
                category {
                    name
                    slug
                }
                sm_pictures {
                    width
                    height
                    url
                }
                reviews {
    rating 
email 
message 
name 

    addDate
    time
}
                variants {
                    color
                    color_name
                    price
                    vendor_price
                    count
                    size {
                        name
                        id 
                        count 
                        price 
                        vendor_price
                    }
                }
                
            }
            totalCount
            lastEndix
            
        }
    }
`;

export const GET_PRODUCTS_FACEBOOK = gql`
  query FacebookExcel(
    $mianCategory: [String]
    $allSubCategoriesSelected: Boolean
    $allDates: Boolean
    $allMainCategoriesSelected: Boolean
    $category: [String]
    $startTimestamp: Date
    $endTimestamp: Date
  ) {
    FacebookExcel(
      mianCategory: $mianCategory
      allSubCategoriesSelected: $allSubCategoriesSelected
      allDates: $allDates
      allMainCategoriesSelected: $allMainCategoriesSelected
      category: $category
      startTimestamp: $startTimestamp
      endTimestamp: $endTimestamp
    ) {
      url
    }
  }
`;
export const GET_PRODUCTS_WHEREHOUSE = gql`
  query WherehouseProductReport(
    $mianCategory: [String]
    $allSubCategoriesSelected: Boolean
    $allDates: Boolean
    $allMainCategoriesSelected: Boolean
    $category: [String]
    $startTimestamp: Date
    $endTimestamp: Date
    $vendorPriceColumn: Boolean
    $priceColumn: Boolean
    $costColumn: Boolean
    $cpcodeColumn: Boolean
    $brandColumn: Boolean
    $stockColumn: Boolean
    $nameColumn: Boolean
    $idColumn: Boolean
    $costTotal: Boolean
  ) {
    WherehouseProductReport(
      mianCategory: $mianCategory
      allSubCategoriesSelected: $allSubCategoriesSelected
      allDates: $allDates
      allMainCategoriesSelected: $allMainCategoriesSelected
      category: $category
      startTimestamp: $startTimestamp
      endTimestamp: $endTimestamp
      vendorPriceColumn: $vendorPriceColumn
      priceColumn: $priceColumn
      costColumn: $costColumn
      cpcodeColumn: $cpcodeColumn
      brandColumn: $brandColumn
      stockColumn: $stockColumn
      nameColumn: $nameColumn
      idColumn: $idColumn
      costTotal: $costTotal
    ) {
      url
    }
  }
`;
export const GET_PRODUCTS_HoleSale_WHEREHOUSE = gql`
  query WherehouseHoleSaleProductReport(
    $mianCategory: [String]
    $allSubCategoriesSelected: Boolean
    $allDates: Boolean
    $allMainCategoriesSelected: Boolean
    $category: [String]
    $startTimestamp: Date
    $endTimestamp: Date
    $vendorPriceColumn: Boolean
    $priceColumn: Boolean
    $costColumn: Boolean
    $cpcodeColumn: Boolean
    $brandColumn: Boolean
    $stockColumn: Boolean
    $nameColumn: Boolean
    $idColumn: Boolean
    $costTotal: Boolean
  ) {
    WherehouseHoleSaleProductReport(
      mianCategory: $mianCategory
      allSubCategoriesSelected: $allSubCategoriesSelected
      allDates: $allDates
      allMainCategoriesSelected: $allMainCategoriesSelected
      category: $category
      startTimestamp: $startTimestamp
      endTimestamp: $endTimestamp
      vendorPriceColumn: $vendorPriceColumn
      priceColumn: $priceColumn
      costColumn: $costColumn
      cpcodeColumn: $cpcodeColumn
      brandColumn: $brandColumn
      stockColumn: $stockColumn
      nameColumn: $nameColumn
      idColumn: $idColumn
      costTotal: $costTotal
    ) {
      url
    }
  }
`;
export const GET_Hidden_PRODUCTS = gql`
    query hiddenProducts($searchTerm: String, $color: [String], $size: [String], $brand: [String], $minPrice: Int, $maxPrice: Int, $category: String, $rating: [String], $sortBy: String, $page: Int = 1, $perPage: Int, $list: Boolean = false, $accountType: String  ,$from: Int = 0 ,$lastEndix:String,  $isNext: Boolean) {
      hiddenProducts(demo: ${26}, searchTerm: $searchTerm, color: $color, size: $size, brand: $brand, minPrice: $minPrice, maxPrice: $maxPrice, category: $category, rating: $rating, sortBy: $sortBy, page: $page, perPage: $perPage, accountType :$accountType ,list: $list, from: $from,lastEndix:$lastEndix,isNext:$isNext) {
            data {
                id
                name
                slug
                price
                sale_price
                review
                ratings
                until
                sold
                vendor_sale_price
                vendor_price
                until_vendor
                stock
                damegdCouont
                top
                featured
                new
                 brands {
                  name
                  slug
              }
                short_desc @include(if: $list)
                category {
                    name
                    slug
                }
                sm_pictures {
                    width
                    height
                    url
                }
                reviews {
    rating 
email 
message 
name 

    addDate
    time
}
                variants {
                    color
                    color_name
                    price
                    vendor_price
                    count
                    size {
                        name
                        id 
                        count 
                        price 
                        vendor_price
                    }
                }
                
            }
            totalCount
            lastEndix
            
        }
    }
`;
export const GET_Soldout_PRODUCTS = gql`
    query soldoutProducts($searchTerm: String, $color: [String], $size: [String], $brand: [String], $minPrice: Int, $maxPrice: Int, $category: String, $rating: [String], $sortBy: String, $page: Int = 1, $perPage: Int, $list: Boolean = false, $accountType: String  ,$from: Int = 0 ,$lastEndix:String,  $isNext: Boolean) {
      soldoutProducts(demo: ${26}, searchTerm: $searchTerm, color: $color, size: $size, brand: $brand, minPrice: $minPrice, maxPrice: $maxPrice, category: $category, rating: $rating, sortBy: $sortBy, page: $page, perPage: $perPage, accountType :$accountType ,list: $list, from: $from,lastEndix:$lastEndix,isNext:$isNext) {
            data {
                id
                name
                slug
                price
                sale_price
                review
                ratings
                until
                sold
                vendor_sale_price
                vendor_price
                until_vendor
                stock
                damegdCouont
                top
                featured
                new
                 brands {
                  name
                  slug
              }
                short_desc @include(if: $list)
                category {
                    name
                    slug
                }
                sm_pictures {
                    width
                    height
                    url
                }
                reviews {
    rating 
email 
message 
name 

    addDate
    time
}
                variants {
                    color
                    color_name
                    price
                    vendor_price
                    count
                    size {
                        name
                        id 
                        count 
                        price 
                        vendor_price
                    }
                }
                
            }
            totalCount
            lastEndix
            
        }
    }
`;

export const CREATE_OFFER_MUTATION = gql`
  mutation CreateOffer($input: CreateOfferInput!) {
    CreateOffer(input: $input) {
      success
      message
    }
  }
`;
export const GET_SALES_PRODUCTS = gql`
    query salesProducts($searchTerm: String, $color: [String], $size: [String], $brand: [String], $minPrice: Int, $maxPrice: Int, $category: String, $rating: [String], $sortBy: String, $page: Int = 1, $perPage: Int, $list: Boolean = false, $accountType: String  ,$from: Int = 0 ,$lastEndix:String,  $isNext: Boolean) {
      salesProducts(demo: ${26}, searchTerm: $searchTerm, color: $color, size: $size, brand: $brand, minPrice: $minPrice, maxPrice: $maxPrice, category: $category, rating: $rating, sortBy: $sortBy, page: $page, perPage: $perPage, accountType :$accountType ,list: $list, from: $from,lastEndix:$lastEndix,isNext:$isNext) {
            data {
                id
                name
                slug
                price
                sale_price
                review
                ratings
                until
                sold
                vendor_sale_price
                vendor_price
                until_vendor
                stock
                damegdCouont
                top
                featured
                new
                 brands {
                  name
                  slug
              }
                short_desc @include(if: $list)
                category {
                    name
                    slug
                }
                sm_pictures {
                    width
                    height
                    url
                }
                reviews {
    rating 
email 
message 
name 

    addDate
    time
}
                variants {
                    color
                    color_name
                    price
                    vendor_price
                    count
                    size {
                        name
                        id 
                        count 
                        price 
                        vendor_price
                    }
                }
                
            }
            totalCount
            lastEndix
            
        }
    }
`;
export const GET_EVENT_SALES_PRODUCTS = gql`
    query eventSalesProducts($searchTerm: String, $color: [String], $size: [String], $brand: [String], $minPrice: Int, $maxPrice: Int, $category: String, $rating: [String], $sortBy: String, $page: Int = 1, $perPage: Int, $list: Boolean = false, $accountType: String  ,$from: Int = 0 ,$lastEndix:String,  $isNext: Boolean) {
      eventSalesProducts(demo: ${26}, searchTerm: $searchTerm, color: $color, size: $size, brand: $brand, minPrice: $minPrice, maxPrice: $maxPrice, category: $category, rating: $rating, sortBy: $sortBy, page: $page, perPage: $perPage, accountType :$accountType ,list: $list, from: $from,lastEndix:$lastEndix,isNext:$isNext) {
            data {
                id
                name
                slug
                price
                sale_price
                review
                ratings
                until
                sold
                vendor_sale_price
                vendor_price
                until_vendor
                stock
                damegdCouont
                top
                featured
                new
                 brands {
                  name
                  slug
              }
                short_desc @include(if: $list)
                category {
                    name
                    slug
                }
                sm_pictures {
                    width
                    height
                    url
                }
                reviews {
    rating 
email 
message 
name 

    addDate
    time
}
                variants {
                    color
                    color_name
                    price
                    vendor_price
                    count
                    size {
                        name
                        id 
                        count 
                        price 
                        vendor_price
                    }
                }
                
            }
            totalCount
            lastEndix
            
        }
    }
`;

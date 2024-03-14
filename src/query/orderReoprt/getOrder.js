import {gql} from '@apollo/client';

export const get_Order_Report = gql`
  query getOrderReport($startDate: Date, $endDate: Date, $status: String) {
    getOrderReport(
      start_date: $startDate
      end_date: $endDate
      status: $status
    ) {
      date_start
      date_end
      revenue
      cost
      profit
      count
      pendingCount
      inDilveryCount
      completeCount
      CanceldCount
      inprogressCount
      shipingExp
      discount
    }
  }
`;

export const GET_COST_REPORT = gql`
  query getCostRebort($startDate: Date, $endDate: Date) {
    getCostRebort(start_date: $startDate, end_date: $endDate) {
      date_start
      date_end
      count
      totalCost
      runingCost {
        id
        amount
        time
        name
        date
        short_desc
      }
    }
  }
`;
export const GET_VENDOR_PRODUCT_REPORT = gql`
  query getVendorProductRebort($startDate: Date, $endDate: Date) {
    getVendorProductRebort(start_date: $startDate, end_date: $endDate) {
      date_start
      date_end
      productReb {
        product {
          id
          name
          slug
          price
          cost
          sale_price
          review
          ratings
          until
          stock
          vendor_price
          top
          featured
          new
          short_desc
          category {
            name
            slug
          }
          brands {
            name
            slug
          }
          pictures {
            width
            height
            url
          }
          sm_pictures {
            width
            height
            url
          }
          variants {
            color
            color_name
            price
            size {
              name
            }
          }
        }
        dataSumation {
          totalSingleSaleCouont
          totalSingleDamgedCount
          totalSingleInStokCount
          totalSingleClistSalesPriceCount
          totalSingleClintSalesCount
          totalSingleVendorSalesCounter
          totalSingleVendorSalesPriecsCount
          totalSingleInStockCostPrice
          totalSingleLoseDamged
        }
      }
      productTypeCount
      totalSaleCouont
      totalDamgedCount
      totalInStokCount
      totalclintSalesCount
      totalclistSalesPriceCount
      totalVendorSalesCounter
      totalVendorSalesPriecsCount
      totalInStockCostPrice
      totalLoseDamged
    }
  }
`;
export const GET_PRODUCT_REPORT = gql`
  query getProductRebort($startDate: Date, $endDate: Date) {
    getProductRebort(start_date: $startDate, end_date: $endDate) {
      date_start
      date_end
      productReb {
        product {
          id
          name
          slug
          price
          sale_price
          review
          ratings
          until
          stock
          vendor_price
          top
          featured
          new
          short_desc
          category {
            name
            slug
          }
          brands {
            name
            slug
          }
          pictures {
            width
            height
            url
          }
          sm_pictures {
            width
            height
            url
          }
          variants {
            color
            color_name
            price
            size {
              name
            }
          }
        }
        dataSumation {
          totalSingleSaleCouont
          totalSingleDamgedCount
          totalSingleInStokCount
          totalSingleClistSalesPriceCount
          totalSingleClintSalesCount
          totalSingleVendorSalesCounter
          totalSingleVendorSalesPriecsCount
          totalSingleInStockCostPrice
          totalSingleLoseDamged
        }
      }
      productTypeCount
      totalSaleCouont
      totalDamgedCount
      totalInStokCount
      totalclintSalesCount
      totalclistSalesPriceCount
      totalVendorSalesCounter
      totalVendorSalesPriecsCount
      totalInStockCostPrice
      totalLoseDamged
    }
  }
`;

export const get_Employee_Report = gql`
  query getEmployeeReport($startDate: Date, $endDate: Date) {
    getEmployeeReport(start_date: $startDate, end_date: $endDate) {
      date_start
      date_end
      totalSalaryPayid
      count
      singleEmplpoyeeRebort {
        employee {
          addDate
          address
          email
          id
          name
          phone_Number
          role
          salary
          password
          time
        }
        totalSinglSalaryPaid
      }
    }
  }
`;

export const GET_FINACAL_REBORT = gql`
  query getFinacalRebort($startDate: Date, $endDate: Date) {
    getFinacalRebort(start_date: $startDate, end_date: $endDate) {
      date_start
      date_end
      revenue
      profit
      cost
      totalOrderCount
      totalOrderProdactCost
      profitAfterRunningCost
      totalDamegdPdocuctCost
      totalproductTypeCount
      totalPdocuctSaleCouont
      totalProduactInStockCount
      totalRuningCostInvoiceCount
      totalRuningCost
      pendingOrderCount
      inDilveryOrderCount
      inReviewOrderCount
      DeliveredOrderCount
      completeOrderCount
      ReadytoDeliveryOrderCount
      CanceldOrderCount
      inprogressOrderCount
      TotalOrderShipingExp
      TotalOrderDiscount
    }
  }
`;
export const GET_STATIC_PAGE = gql`
  query GetStaticPage {
    getStaticPage {
      totalPinding
      totalOrder
      totalMail
      totalTrans
      lastUser {
        firstName
        lastName
        id
        email
        myOrder
        Rank
        useRating
        joinDate
        time
      }
      lastOrder {
        BilingInformtion {
          Region
          city
          email
          company
          house
          firstname
          houseType
          lastname
          notes
          phone
        }
        CartItem {
          id
          name
          price
          qty
          sale_price
          short_desc
          slug
          saletype
          until
          brand {
            name
            slug
          }
          sm_pictures {
            width
            height
            url
          }
          sum
          count
          variants {
            id
            color
            color_name
            vendor_price
            price
            count
            size {
              name
              id
              count
              price
              vendor_price
            }
          }
          stock
          sold
        }
        isPayed
        payedType
        status
        userID
        Date
        price
        orderId
        discount
        shipping
        totalPrice
        couponCode
      }
      popularProd {
        id
        name
        slug
        short_desc
        price
        sale_price
        review
        ratings
        until
        stock
        sold
        sm_pictures {
          width
          height
          url
        }
        time
        addDate
      }
    }
  }
`;
export const ADD_DEBTOR_MUTATION = gql`
  mutation AddDebtor($debtor: DebtorInput!) {
    addDebtor(debtor: $debtor) {
      success
      responeCode
      message
    }
  }
`;
export const ADD_PAYMENT_MUTATION = gql`
  mutation AddPayment($input: PaymentInput!) {
    addPayment(input: $input) {
      success
      message
      code
    }
  }
`;
export const ADD_ISSUEDCHECK_MUTATION = gql`
  mutation addIssuedCheck($input: IssuedCheckInput!) {
    addIssuedCheck(input: $input) {
      success
      message
    }
  }
`;
export const SEND_FINANCIAL_REMINDER = gql`
  mutation DailyCheckChecks {
    dailyCheckChecks {
      success
    }
  }
`;
export const GET_CECKS_REPORTS = gql`
  query GetReports(
    $reportType: String!
    $duePeriod: String
    $startDateTimestamp: Date
    $endDateTimestamp: Date
    $selectAll: Boolean
    $language: String
    $conversionRate: Float
    $checkType: String
  ) {
    getCheckReports(
      reportType: $reportType
      duePeriod: $duePeriod
      startDateTimestamp: $startDateTimestamp
      endDateTimestamp: $endDateTimestamp
      selectAll: $selectAll
      language: $language
      conversionRate: $conversionRate
      checkType: $checkType
    ) {
      downloadUrl
    }
  }
`;
export const GENERATE_INVOICE_QUERY = gql`
  query GenerateInvoice(
    $reportType: String!
    $duePeriod: String
    $startDateTimestamp: Date
    $endDateTimestamp: Date
    $selectAll: Boolean
    $language: String
    $invoiceType: String!
    $debtorId: String!
  ) {
    generateInvoice(
      reportType: $reportType
      duePeriod: $duePeriod
      startDateTimestamp: $startDateTimestamp
      endDateTimestamp: $endDateTimestamp
      selectAll: $selectAll
      language: $language
      invoiceType: $invoiceType
      debtorId: $debtorId
    ) {
      downloadUrl
    }
  }
`;
export const GENERATE_INVOICE_PAYMENTS_DEBTS_QUERY = gql`
  query GenerateInvoicePaymentsDebts(
    $reportType: String!
    $reportPeriod: String
    $startDate: Date
    $endDate: Date
    $language: String
    $debtorId: String!
  ) {
    GenerateInvoicePaymentsDebts(
      reportType: $reportType
      reportPeriod: $reportPeriod
      startDateTimestamp: $startDate
      endDateTimestamp: $endDate
      language: $language
      debtorId: $debtorId
    ) {
      downloadUrl
      message
      success
    }
  }
`;
export const GENERATE_Certificate_QUERY = gql`
  query handleGenerateCertif($debtorDebts: [String!], $debtorName: String!) {
    handleGenerateCertif(debtorName: $debtorName, debtorDebts: $debtorDebts) {
      downloadUrl
      message
      success
    }
  }
`;
export const ADD_CHECKBOOK_MUTATION = gql`
  mutation AddCheckbook($ownerName: String!, $date: Float!) {
    addCheckbook(input: {ownerName: $ownerName, date: $date}) {
      message
      success
      code
    }
  }
`;
export const EDIT_CHECKBOOK_MUTATION = gql`
  mutation EditCheckbook($ownerOldName: String!, $ownerNewName: String!) {
    EditCheckbook(
      input: {ownerOldName: $ownerOldName, ownerNewName: $ownerNewName}
    ) {
      success
      message
      code
      # Add any additional fields you expect in the response
    }
  }
`;

export const DELETE_CHECKBOOK_MUTATION = gql`
  mutation DeleteCheckbook($ownerOldName: String!) {
    DeleteCheckbook(input: {ownerOldName: $ownerOldName}) {
      success
      message
      code
      # Add any additional fields you expect in the response
    }
  }
`;
export const GET_CHECKBOOKS_QUERY = gql`
  query GetCheckbooks {
    getCheckbooks {
      ownerName
    }
  }
`;

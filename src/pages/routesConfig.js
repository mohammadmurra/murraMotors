import {
  RiListSettingsFill,
  RiMoneyDollarBoxLine,
  RiMoneyDollarCircleFill,
  RiNotification2Fill,
  RiNotification2Line,
  RiPrinterLine,
} from 'react-icons/ri';
import {AiOutlineHome} from 'react-icons//ai';

const routesConfig = [
  {
    id: 'app',
    title: 'Application',
    messageId: 'sidebar.application',
    type: 'group',
    children: [
      {
        id: 'e-commerce',
        title: 'E-Commerce',
        messageId: 'sidebar.app.dashboard.homePage',
        type: 'item',
        icon: <AiOutlineHome />,
        url: '/dashboards/homePage',
      },
    ],
  },

  // /////////
  // // product management
  // {
  //   id: 'productManagements',
  //   title: 'Product Managements',
  //   messageId: 'sidebar.productManagements',
  //   type: 'collapse',

  //   children: [
  //     {
  //       id: 'products',
  //       title: 'Products',
  //       messageId: 'sidebar.ecommerce.products',
  //       type: 'item',
  //       url: '/product-management/products',
  //     },
  //     {
  //       id: 'HideenProducts',
  //       title: 'HideenProducts',
  //       messageId: 'sidebar.ecommerce.HiddenProducts',
  //       type: 'item',
  //       url: '/product-management/HiddenProducts',
  //     },
  //     {
  //       id: 'SalesProducts',
  //       title: 'SalesProducts',
  //       messageId: 'sidebar.ecommerce.SalesProducts',
  //       type: 'item',
  //       url: '/product-management/SalesProducts',
  //     },
  //     {
  //       id: 'SoldoutProducts',
  //       title: 'SoldoutProducts',
  //       messageId: 'sidebar.ecommerce.SoldoutProducts',
  //       type: 'item',
  //       url: '/product-management/SoldoutProducts',
  //     },
  //     {
  //       id: 'damagedProducts',
  //       title: 'Damaged Products',
  //       messageId: 'sidebar.product-management.damaged-products',
  //       type: 'item',
  //       url: '/product-management/damaged-product',
  //     },
  //   ],
  // },

  ////

  {
    id: 'financial management',
    title: 'financialMangments',
    messageId: 'sidebar.finance.financialmanagement',
    type: 'collapse',

    children: [
      {
        id: 'Debtors',
        title: 'Debtors',
        messageId: 'sidebar.finance.debtorsMangement',
        type: 'item',
        url: '/management/debtors',
      },
      {
        id: 'financial management',
        title: 'financialMangments',
        messageId: 'sidebar.finance.ChecksMangement',
        type: 'collapse',

        children: [
          {
            id: 'Checks',
            title: 'Checks',
            messageId: 'sidebar.finance.Checks',
            type: 'item',
            icon: <RiMoneyDollarBoxLine />,
            url: '/management/Checks',
          },
          {
            id: 'issuedChecks',
            title: 'issuedChecks',
            messageId: 'sidebar.finance.issuedChecks',
            type: 'item',
            icon: <RiMoneyDollarBoxLine />,
            url: '/management/issuedChecks',
          },
          {
            id: 'Checks Report',
            title: 'Checks Report',
            messageId: 'sidebar.finance.ChecksReport',
            type: 'item',
            icon: <RiPrinterLine />,
            url: '/management/ChecksReport',
          },
        ],
      },
    ],
  },
  {
    id: 'employeesManagements',
    title: 'Employees Managements',
    messageId: 'sidebar.employeeManagements',
    type: 'collapse',

    children: [
      {
        id: 'employee',
        title: 'Employee',
        messageId: 'sidebar.ecommerce.employee',
        type: 'item',
        url: '/management/employees',
      },
      {
        id: 'oldemployee',
        title: 'Old Employee',
        messageId: 'sidebar.ecommerce.oldEmployee',
        type: 'item',
        url: '/management/oldEmployee',
      },
    ],
  },
  //////////////////////////

  // {
  //   id: 'reports',
  //   title: 'Reports',
  //   messageId: 'sidebar.reports',
  //   type: 'collapse',

  //   children: [
  //     {
  //       id: 'financialReports',
  //       title: 'Financial reports',
  //       messageId: 'sidebar.reports.financialReports',
  //       type: 'item',
  //       url: '/reports/financialReports',
  //     },

  //     {
  //       id: 'orderReports',
  //       title: 'Order reports',
  //       messageId: 'sidebar.reports.orderReports',
  //       type: 'item',
  //       url: '/reports/orderreports',
  //     },
  //     // {
  //     //   id: 'employeeReport',
  //     //   title: 'Employee Report',
  //     //   messageId: 'sidebar.reports.employeesReports',
  //     //   type: 'item',
  //     //   url: '/reports/employeesreports',
  //     // },
  //     {
  //       id: 'warehouseReports',
  //       title: 'Warehouse Reports',
  //       messageId: 'sidebar.reports.warehouseReports',
  //       type: 'item',
  //       url: '/reports/warehousereports',
  //     },
  //     {
  //       id: 'VendorwarehouseReports',
  //       title: 'Warehouse Reports',
  //       messageId: 'sidebar.reports.VendorwarehouseReports',
  //       type: 'item',
  //       url: '/reports/warehouseVendorReports',
  //     },
  //     {
  //       id: 'rinningCostReports',
  //       title: 'Rinning Cost Reports',
  //       messageId: 'sidebar.ecommerce.runningCost',
  //       type: 'item',
  //       url: '/reports/runningCostReports',
  //     },
  //   ],
  // },
  ////////////////// website mangment
  {
    id: 'setting',
    title: 'general Mangment',
    messageId: 'sidebar.generalMangment',
    type: 'collapse',
    children: [
      {
        id: 'notifications',
        title: 'notifications',
        messageId: 'common.notificationsMangment',
        type: 'collapse',
        icon: <RiNotification2Fill />,
        children: [
          {
            id: 'financialMangment',
            title: 'financialMangment',
            messageId: 'common.financialMangment',
            type: 'item',
            icon: <RiNotification2Line />,
            url: 'notifications/financialMangment',
          },
        ],
      },
      {
        id: 'ChecksMangment',
        title: 'ChecksMangment',
        messageId: 'common.ChecksgeneralMangment',
        type: 'collapse',
        icon: <RiListSettingsFill />,
        children: [
          {
            id: 'ChecksbookMangment',
            title: 'ChecksbookMangment',
            messageId: 'common.ChecksMangment',
            type: 'item',
            icon: <RiMoneyDollarCircleFill />,
            url: 'settings/ChecksMangment',
          },
        ],
      },
    ],
  },
];
export default routesConfig;

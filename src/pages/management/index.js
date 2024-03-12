import React from 'react';
import {RoutePermittedRole} from '../../shared/constants/AppConst';

const Checks = React.lazy(() => import('./Checks'));
const IssuedChecks = React.lazy(() => import('./IssuedChecks'));
const AddIssuedChecks = React.lazy(() => import('./IssuedChecks/addIssuedChecks/addIssuedCheck'));
const IssuedCheckDetails = React.lazy(() => import('./IssuedChecks/IssuedCheckDetails'));

const ChecksReport = React.lazy(() => import('./ChecksReport'));

const Debtors = React.lazy(() => import('./Debters'));
const AddDebtor = React.lazy(() => import('./Debters/AddDebtor'));
const AddPayment = React.lazy(() =>
  import('./Debters/DebtorsDetails/Payemnts/addPayment'),
);
const CheckDetails = React.lazy(() =>
  import('./Debters/DebtorsDetails/Checks/CheckDetails'),
);
const EditDebtor = React.lazy(() => import('./Debters/EditDebtor'));

const DebtorsDetails = React.lazy(() => import('./Debters/DebtorsDetails'));

const Employee = React.lazy(() => import('./Employees'));
const OldEmployee = React.lazy(() => import('./oldEmployee'));

const AddEmployee = React.lazy(() => import('./Employees/AddEmployee'));

const DletedRuningCost = React.lazy(() => import('./DeletedRunningCost'));

export const managementConfig = [
  {
    permittedRole: RoutePermittedRole.add_employee,
    path: '/management/employees/AddEmployee',
    element: <AddEmployee />,
  },

  {
    permittedRole: RoutePermittedRole.show_employee,
    path: '/management/employees',
    element: <Employee />,
  },
  {
    permittedRole: RoutePermittedRole.show_employee_old,
    path: '/management/oldEmployee',
    element: <OldEmployee />,
  },

  {
    permittedRole: RoutePermittedRole.show_customer,
    path: ['/management/DebtorsDetails/:debtorId'],
    element: <DebtorsDetails />,
  },
  {
    permittedRole: RoutePermittedRole.show_customer,
    path: '/management/debtors',
    element: <Debtors />,
  },
  {
    permittedRole: RoutePermittedRole.show_customer,
    path: '/management/debtors/addPayment/:debtorId',
    element: <AddPayment />,
  },
  {
    permittedRole: RoutePermittedRole.show_customer,
    path: '/management/debtors/AddDebtor',
    element: <AddDebtor />,
  },
  {
    permittedRole: RoutePermittedRole.show_customer,
    path: '/management/debtors/EditDebtor/:debtorId',
    element: <EditDebtor />,
  },
  {
    permittedRole: RoutePermittedRole.show_customer,
    path: '/management/checks',
    element: <Checks />,
  },
  {
    permittedRole: RoutePermittedRole.show_customer,
    path: '/management/issuedChecks',
    element: <IssuedChecks />,
  },
  {
    permittedRole: RoutePermittedRole.show_customer,
    path: '/management/addIssuedChecks',
    element: <AddIssuedChecks />,
  },
  {
    permittedRole: RoutePermittedRole.show_customer,
    path: '/management/Checks/IssuedCheckDetails/:checkId',
    element: <IssuedCheckDetails />,
  },
  {
    permittedRole: RoutePermittedRole.show_customer,
    path: '/management/ChecksReport',
    element: <ChecksReport />,
  },
  {
    permittedRole: RoutePermittedRole.show_customer,
    path: '/management/Checks/CheckDetails/:debtorId/:checkId',
    element: <CheckDetails />,
  },


  {
    permittedRole: RoutePermittedRole.running_cost_deleted,
    path: '/management/deletRuningCost',
    element: <DletedRuningCost />,
  },
];

import React from 'react';
import {RoutePermittedRole} from '../../shared/constants/AppConst';

const FinancialMangmentNotif = React.lazy(() =>
  import('./financialMangmentNotif'),
);
const ChecksMangment = React.lazy(() =>
  import('./ChecksMangment'),
);
const CheckbookDetails = React.lazy(() =>
  import('./ChecksMangment/CheckbookDetails'),
);
export const websiteManagementConfig = [
  {
    permittedRole:
      RoutePermittedRole.add_edit_Delete_website_management_bannars,
    path: 'notifications/financialMangment',
    element: <FinancialMangmentNotif />,
  },
  {
    permittedRole:
      RoutePermittedRole.add_edit_Delete_website_management_bannars,
    path: 'settings/ChecksMangment',
    element: <ChecksMangment />,
  },
  {
    permittedRole:
      RoutePermittedRole.add_edit_Delete_website_management_bannars,
    path: 'settings/ChecksMangment/CheckbookDetails/:checkbookId',
    element: <CheckbookDetails />,
  },
];

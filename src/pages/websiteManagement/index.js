import React from 'react';
import {RoutePermittedRole} from '../../shared/constants/AppConst';

const FinancialMangmentNotif = React.lazy(() =>
  import('./financialMangmentNotif'),
);

export const websiteManagementConfig = [
  {
    permittedRole:
      RoutePermittedRole.add_edit_Delete_website_management_bannars,
    path: 'notifications/financialMangment',
    element: <FinancialMangmentNotif />,
  },
];

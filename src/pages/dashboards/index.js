import React from 'react';
import {RoutePermittedRole} from 'shared/constants/AppConst';

const ECommerce = React.lazy(() => import('./ECommerce'));
const CRM = React.lazy(() => import('./CRM'));
const Analytics = React.lazy(() => import('./Analytics'));

export const dashBoardConfigs = [
  {
    permittedRole: RoutePermittedRole.analytics,
    path: '/dashboards/analytics',
    element: <Analytics />,
  },
  {
    permittedRole: RoutePermittedRole.home_page,
    path: '/dashboards/homePage',
    element: <ECommerce />,
  },
  {
    permittedRole: RoutePermittedRole.CRM,
    path: '/dashboards/crm',
    element: <CRM />,
  },
];

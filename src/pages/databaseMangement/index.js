import React from 'react';
import {RoutePermittedRole} from '../../shared/constants/AppConst';

const DatabaseProductEvent = React.lazy(() => import('./databaseProductEvent'));
export const databaseManagementConfig = [
  {
    permittedRole:
      RoutePermittedRole.add_edit_Delete_website_management_bannars,
    path: '/databaseMangement/databaseProductEvent',
    element: <DatabaseProductEvent />,
  },
];

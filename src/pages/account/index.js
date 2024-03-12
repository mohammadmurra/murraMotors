import React from 'react';
import {RoutePermittedRole} from 'shared/constants/AppConst';
import Account from './MyProfile';

export const accountPagesConfigs = [
  {
    permittedRole: RoutePermittedRole.my_profile,
    path: '/my-profile',
    element: <Account />,
  },
];

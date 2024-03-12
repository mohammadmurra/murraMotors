import React from 'react';
import {Navigate} from 'react-router-dom';
import {initialUrl} from 'shared/constants/AppConst';

import {authRouteConfig} from './auth';
import Error403 from './errorPages/Error403';
import {errorPagesConfigs} from './errorPages';
import {dashBoardConfigs} from './dashboards';
import {extraPagesConfigs} from './extraPages';
import {ecommerceConfig} from './ecommerce';
import {thirdPartyConfigs} from './thirdParty';
import {accountPagesConfigs} from './account';
import {managementConfig} from './management';
import {websiteManagementConfig} from './websiteManagement';
import {databaseManagementConfig} from './databaseMangement';

const authorizedStructure = {
  fallbackPath: '/signin',
  unAuthorizedComponent: <Error403 />,
  routes: [
    ...dashBoardConfigs,
    ...accountPagesConfigs,
    ...thirdPartyConfigs,
    ...extraPagesConfigs,
    ...ecommerceConfig,
    ...managementConfig,
    ...websiteManagementConfig,

    ...databaseManagementConfig,
  ],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: authRouteConfig,
};

const anonymousStructure = {
  routes: errorPagesConfigs.concat([
    {
      path: '/',
      element: <Navigate to={initialUrl} />,
    },
    {
      path: '*',
      element: <Navigate to='/error-pages/error-404' />,
    },
  ]),
};

export {authorizedStructure, unAuthorizedStructure, anonymousStructure};

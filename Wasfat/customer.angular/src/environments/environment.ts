import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4300';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Wasfat-Customer',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44346/',
    redirectUri: baseUrl,
    clientId: 'Wasfat_Customer',
    responseType: 'code',
    scope: 'offline_access Wasfat',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44346',
      rootNamespace: 'Wasfat',
    },
  },
} as Environment;

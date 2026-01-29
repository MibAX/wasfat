import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'Wasfat',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44346/',
    redirectUri: baseUrl,
    clientId: 'Wasfat_App',
    responseType: 'code',
    scope: 'offline_access Wasfat',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44346',
      rootNamespace: 'Wasfat',
    },
  },
} as Environment;

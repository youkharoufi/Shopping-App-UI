import { InjectionToken } from '@angular/core';

/**
 * @const ACCOUNT_API_ENDPOINT
 * Injection token for the bookmark API URL interface to be provided by the applications.
 */
export const ACCOUNT_API_ENDPOINT: InjectionToken<string> = new InjectionToken(
  'ACCOUNT_API_ENDPOINT'
);

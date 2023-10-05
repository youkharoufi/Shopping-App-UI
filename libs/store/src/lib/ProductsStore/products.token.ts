import { InjectionToken } from '@angular/core';

/**
 * @const PRODUCT_API_ENDPOINT
 * Injection token for the bookmark API URL interface to be provided by the applications.
 */
export const PRODUCT_API_ENDPOINT: InjectionToken<string> = new InjectionToken(
  'PRODUCT_API_ENDPOINT'
);

import { InjectionToken } from '@angular/core';

/**
 * @const CART_API_ENDPOINT
 * Injection token for the bookmark API URL interface to be provided by the applications.
 */
export const CART_API_ENDPOINT: InjectionToken<string> = new InjectionToken(
  'CART_API_ENDPOINT'
);

import { TestBed } from '@angular/core/testing';

import { LoadingBarInterceptor } from './loading-bar.interceptor';

describe('LoadingBarInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoadingBarInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoadingBarInterceptor = TestBed.inject(LoadingBarInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

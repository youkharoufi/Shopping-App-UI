import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { IndexComponent } from './index/index.component';
import { NavbarComponent } from './Shared/Navbar/navbar.component';
import { CarouselComponent } from './Carousel/carousel.component';
import { FooterComponent } from './Shared/Footer/footer.component';
import { RegisterComponent } from './Register/register.component';
import { SideBarComponent } from './SideBar/side-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoresModule } from '@shopping-app-ui/store';
import { LoadingBarInterceptor } from './interceptors/loading-bar.interceptor';
import { LoadingDirective } from './loading.directive';
import { PrimeNgZeModule } from '@shopping-app-ui/prime-ng';
import { PasswordValidatorDirective } from './password-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    IndexComponent,
    NavbarComponent,
    CarouselComponent,
    FooterComponent,
    RegisterComponent,
    SideBarComponent,
    LoadingDirective,
    PasswordValidatorDirective,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoresModule,
    HttpClientModule,
    PrimeNgZeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingBarInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

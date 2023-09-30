import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { IndexComponent } from './index/index.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './Shared/Footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { SideBarComponent } from './sidebar/side-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoresModule } from '@shopping-app-ui/store';
import { LoadingBarInterceptor } from './interceptors/loading-bar.interceptor';
import { LoadingDirective } from './loading.directive';

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

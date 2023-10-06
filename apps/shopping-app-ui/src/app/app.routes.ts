import { Route } from '@angular/router';
import { RegisterComponent } from './Register/register.component';
import { IndexComponent } from './index/index.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartPageComponent } from './cart-page/cart-page.component';

export const appRoutes: Route[] = [
    {path:'', component:IndexComponent},
    {path:'register', component:RegisterComponent},
    {path:'product-details/:id', component:ProductDetailsComponent},
    {path:'cart/:id', component:CartPageComponent}
];

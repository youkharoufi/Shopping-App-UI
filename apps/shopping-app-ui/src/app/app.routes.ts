import { Route } from '@angular/router';
import { RegisterComponent } from './Register/register.component';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';

export const appRoutes: Route[] = [
    {path:'', component:IndexComponent},
    {path:'register', component:RegisterComponent}
];

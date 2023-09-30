import { Route } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';

export const appRoutes: Route[] = [
    {path:'', component:IndexComponent},
    {path:'register', component:RegisterComponent}
];

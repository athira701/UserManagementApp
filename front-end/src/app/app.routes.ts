import { Routes } from '@angular/router';

import { LandingPageComponent } from './landingpagecomponents/landingpagecomponents';

import { LoginComponent } from './usercomponents/login/login';
import { RegisterComponent } from './usercomponents/register/register';
import { ProfileComponent } from './usercomponents/profile/profile';
import { HomeComponent } from './usercomponents/home/home';


import { AdminLogin } from './admincomponents/admin-login/admin-login';
import { AdminDashboard } from './admincomponents/admin-dashboard/admin-dashboard';
import { authGuard, authGuardd } from './core/gaurds/auth.guard';
import { adminAuthGuard, adminLoginGuard } from './core/gaurds/admin.guard';


export const routes: Routes = [
    { path: '', component: LandingPageComponent },

    { path: 'login', component: LoginComponent,canActivate:[authGuardd] },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'profile',  component: ProfileComponent,canActivate: [authGuard] },

    { path: 'admin/login', component: AdminLogin, canActivate:[adminLoginGuard] },
    { path: 'admin/dashboard', component: AdminDashboard, canActivate:[adminAuthGuard]},

    { path: '**', redirectTo: '' }
];

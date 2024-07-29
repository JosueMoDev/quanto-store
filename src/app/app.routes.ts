import { Routes } from '@angular/router';
import { IsAuthenticationGuard } from '@guards/isAuthentication.guard';
import { IsNotAuthenticationGuard } from '@guards/isNotAuthentication.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [IsAuthenticationGuard],
    loadComponent: () => import('./home/home.page'),
    children: [
      {
        path: 'products',
        loadComponent: () => import('./home/pages/products/products.component'),
      },
      {
        path: 'sales',
        loadComponent: () => import('./home/pages/sales/sales.component'),
      },
    ],
  },
  {
    path: 'authentication',
    canActivate: [IsNotAuthenticationGuard],
    loadComponent: () => import('./authentication/authentication.page'),
    children: [
      {
        path: 'register',
        loadComponent: () =>
          import('./authentication/register/register.component'),
      },
      {
        path: 'login',
        loadComponent: () => import('./authentication/login/login.component'),
      },
    ],
  },
];


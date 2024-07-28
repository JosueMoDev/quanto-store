import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
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
    loadComponent: () => import('./authentication/authentication.page'),
    children: [
      {
        path: 'register',
        loadComponent: () => import('./authentication/register/register.component'),
      },
      {
        path: 'login',
        loadComponent: () => import('./authentication/login/login.component'),
      },
    ],
  },
];


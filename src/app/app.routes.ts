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
];


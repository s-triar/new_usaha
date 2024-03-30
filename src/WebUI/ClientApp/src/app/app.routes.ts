import { Routes } from '@angular/router';

export const routes: Routes = [
      {
        path:'',
        redirectTo: '/main/home',
        pathMatch:'full'
      },
      {
        path: 'auth',
        loadComponent: () => import('./pages/auth/auth.component').then((c)=>c.AuthComponent),
        children:[
          {
            path:'',
            redirectTo: '/auth/login',
            pathMatch:'full'
          },
          {
            path:'login',
            loadComponent: () => import('./pages/auth/login/login.component').then((c)=>c.LoginComponent),
            title:'Masuk',
          },
          {
            path:'register',
            loadComponent: () => import('./pages/auth/register/register.component').then((c)=>c.RegisterComponent),
            title:'Daftar'
          }
        ]
      },
      {
        path: 'main',
        loadComponent: () => import('./pages/main/main.component').then((c)=>c.MainComponent),
        children:[
          {
            path:'',
            redirectTo: '/main/home',
            pathMatch:'full'
          },
          {
            path:'home',
            loadComponent: () => import('./pages/main/home/home.component').then((c)=>c.HomeComponent)
          },
          {
            path:'profile',
            loadComponent: () => import('./pages/main/profile/profile.component').then((c)=>c.ProfileComponent)
          },
          {
            path:'my-shop-list',
            loadComponent: () => import('./pages/main/my-shop-list/my-shop-list.component').then((c)=>c.MyShopListComponent)
          }
        ]
      },
      {
        path: 'my-shop/create',
        loadComponent: () => import('./pages/crud/shop/shop-create/shop-create.component').then((c)=>c.ShopCreateComponent)
      },
      {
        path: 'workspace/:id/product/create',
        loadComponent: () => import('./pages/crud/product/product-create/product-create.component').then((c)=>c.ProductCreateComponent)
      },
      {
        path: 'dashboard/:id',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((c)=>c.DashboardComponent),
        children:[
          {
            path:'',
            redirectTo: '/dashboard/:id/overview',
            pathMatch:'full'
          },
          {
            path:'overview',
            loadComponent: () => import('./pages/dashboard/overview/overview.component').then((c)=>c.OverviewComponent)
          },
          {
            path:'product-list',
            loadComponent: () => import('./pages/dashboard/product/product.component').then((c)=>c.ProductComponent)
          },
          {
            path:'transaction-list',
            loadComponent: () => import('./pages/dashboard/transaction/transaction.component').then((c)=>c.TransactionComponent)
          }
        ]
      },
      {
        path: 'workspace/:id',
        loadComponent: () => import('./pages/workspace/workspace.component').then((c)=>c.WorkspaceComponent),
        children:[
          {
            path:'',
            redirectTo: '/workspace/:id/pos-cashier',
            pathMatch:'full'
          },
          {
            path:'pos-cashier',
            loadComponent: () => import('./pages/workspace/pos-cashier/pos-cashier.component').then((c)=>c.PosCashierComponent)
          },
          {
            path:'product-list',
            loadComponent: () => import('./pages/workspace/product/product.component').then((c)=>c.ProductComponent)
          },
        ]
      },
];

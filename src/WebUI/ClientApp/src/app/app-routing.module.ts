import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { useHash } from './application/auth/auth-flags';
import {
  APP_ROUTE,
  AUTH_ROUTE,
  DASHBOARD_EMPLOYEE_ROUTE,
  DASHBOARD_ROUTE,
  DB_EMPY_ROLE_ROUTE,
  DB_TRANS_ROUTE,
  GLOBAL_PATH,
  MAIN_ROUTE,
  MY_BUSSINESSES_ROUTE,
  WORKSPACE_ROUTE,
  WS_PRODUCT,
} from './application/constant/routes';
import { AuthWithForceLoginGuard } from './application/guards/auth-with-force-login.guard';
import { AuthGuard } from './application/guards/auth.guard';
import { UnAuthGuard } from './application/guards/un-auth.guard';
// import { useHash } from './core/auth/auth-flags';
// import { AuthWithForceLoginGuard } from './core/auth/auth-with-force-login.guard';
// import { AuthGuard } from './core/auth/auth.guard';
// import { UnAuthGuard } from './core/auth/un-auth.guard';
// import { EnterpriseTokenResolver } from './pages/dashboard/enterprise-token.resolver';
import { DetailTransactionResolver } from './application/resolvers/detail-transaction.resolver';
import { EnterpriseTokenResolver } from './application/resolvers/enterprise-token.resolver';
import { InfoProductResolver } from './application/resolvers/info-product.resolver';
import { InfoRoleResolver } from './application/resolvers/info-role.resolver';
// import { AutoLoginGuard } from './shared/guards/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: GLOBAL_PATH.MAIN_HOME,
    pathMatch: 'full',
  },
  {
    path: APP_ROUTE.MAIN,
    loadComponent: () =>
      import('./ui/pages/main/main.component').then((c) => c.MainComponent),
    // canActivate: [AuthorizeGuard],
    children: [
      {
        path: '',
        redirectTo: GLOBAL_PATH.MAIN_HOME,
        pathMatch: 'full',
      },
      {
        path: MAIN_ROUTE.HOME,
        loadComponent: () =>
          import('./ui/pages/main/pages/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
      {
        path: MAIN_ROUTE.SEARCH,
        loadComponent: () =>
          import('./ui/pages/main/pages/search/search.component').then(
            (c) => c.SearchComponent
          ),
      },
      {
        path: MAIN_ROUTE.MY_BUSSINESSES,
        loadComponent: () =>
          import(
            './ui/pages/main/pages/my-businesses/my-businesses.component'
          ).then((c) => c.MyBusinessesComponent),
        canActivate: [AuthWithForceLoginGuard],
        children: [
          {
            path: '',
            redirectTo: GLOBAL_PATH.MAIN_MY_BUSSINESSES_LIST,
            pathMatch: 'full',
          },
          {
            path: MY_BUSSINESSES_ROUTE.LIST,
            // tslint:disable-next-line:max-line-length
            loadComponent: () =>
              import(
                './ui/pages/main/pages/my-businesses/pages/business-list/bussiness-list.component'
              ).then((c) => c.BussinessListComponent),
          },
          {
            path: MY_BUSSINESSES_ROUTE.ADD,
            // tslint:disable-next-line:max-line-length
            loadComponent: () =>
              import(
                './ui/pages/main/pages/my-businesses/pages/add-business/add-business.component'
              ).then((c) => c.AddBusinessComponent),
          },
          {
            path: MY_BUSSINESSES_ROUTE.JOIN,
            // tslint:disable-next-line:max-line-length
            loadComponent: () =>
              import(
                './ui/pages/main/pages/my-businesses/pages/join-business/join-business.component'
              ).then((c) => c.JoinBusinessComponent),
          },
        ],
      },
      // {
      //   path: MAIN_ROUTE.SEARCH,
      //   loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule)
      // },
      // {
      //   path: MAIN_ROUTE.ENTERPRISE,
      //   loadChildren: () => import('./pages/enterprise/enterprise.module').then(m => m.EnterpriseModule)
      // },
    ],
  },
  {
    path: `${APP_ROUTE.WORKSPACE}/${WORKSPACE_ROUTE._ID_USAHA}`,
    canActivate: [AuthGuard],
    resolve: { enterpriseToken: EnterpriseTokenResolver },
    loadComponent: () => import('./ui/pages/workspace/workspace.component').then(c => c.WorkspaceComponent),
    children: [
      {
        path: WORKSPACE_ROUTE.CASHIER,
        loadComponent: () => import('./ui/pages/workspace/pages/cashier/cashier.component').then(c => c.CashierComponent),
      },
      {
        path: WORKSPACE_ROUTE.PRODUCT,
        loadComponent: () => import('./ui/pages/workspace/pages/product/product.component').then(c => c.ProductComponent),
        children: [
          {
            path: '',
            redirectTo: `${GLOBAL_PATH.WORKSPACE_PRODUCT_LIST}`,
            pathMatch: 'full'
          },
          {
            path: `${WS_PRODUCT.PRODUCT_LIST}`,
            // tslint:disable-next-line:max-line-length
            loadComponent: () => import('./ui/pages/workspace/pages/product/pages/product-list/product-list.component').then(c => c.ProductListComponent)
          },
          {
            path: `${WS_PRODUCT.PRODUCT_ADD}`,
            // tslint:disable-next-line:max-line-length
            loadComponent: () => import('./ui/pages/workspace/pages/product/pages/create-product/create-product.component').then(c => c.CreateProductComponent)
          },
          {
            path: `${WS_PRODUCT.PRODUCT_INFO}/${WS_PRODUCT._ID_PRODUCT_INFO}`,
            // tslint:disable-next-line:max-line-length
            loadComponent: () => import('./ui/pages/workspace/pages/product/pages/info-product/info-product.component').then(c => c.InfoProductComponent),
            resolve: { dataGoods: InfoProductResolver },
          },
          {
            path: `${WS_PRODUCT.PRODUCT_UPDATE}/${WS_PRODUCT._ID_PRODUCT_INFO}`,
            // tslint:disable-next-line:max-line-length
            loadComponent: () => import('./ui/pages/workspace/pages/product/pages/update-info-product/update-info-product.component').then(c => c.UpdateInfoProductComponent),
            resolve: { dataGoods: InfoProductResolver },
          },
        ]
      },
      {
        path: WORKSPACE_ROUTE.RAW,
        loadComponent: () => import('./ui/pages/workspace/pages/raw/raw.component').then(c => c.RawComponent)
      }
    ]
  },
  {
    path: `${APP_ROUTE.DASHBOARD}/${DASHBOARD_ROUTE._ID_USAHA}`,
    loadComponent: () =>
      import('./ui/pages/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    canActivate: [AuthGuard],
    resolve: { enterpriseToken: EnterpriseTokenResolver },
    children: [
      {
        path: '',
        redirectTo: GLOBAL_PATH.DASHBOARD_OVERVIEW,
        pathMatch: 'full',
      },
      {
        path: DASHBOARD_ROUTE.OVERVIEW,
        loadComponent: () =>
          import('./ui/pages/dashboard/pages/overview/overview.component').then(
            (c) => c.OverviewComponent
          ),
      },
      {
        path: DASHBOARD_ROUTE.EMPLOYEE,
        loadComponent: () =>
          import('./ui/pages/dashboard/pages/employee/employee.component').then(
            (c) => c.EmployeeComponent
          ),
        children: [
          {
            path: '',
            redirectTo: GLOBAL_PATH.DASHBOARD_EMPLOYEE_LIST,
            pathMatch: 'full'
          },
          {
            path: DASHBOARD_EMPLOYEE_ROUTE.LIST,
            // tslint:disable-next-line:max-line-length
            loadComponent: () =>
              import(
                './ui/pages/dashboard/pages/employee/pages/employee-list/employee-list.component'
              ).then((c) => c.EmployeeListComponent),
          },
          {
            path: DASHBOARD_EMPLOYEE_ROUTE.ROLE,
            // tslint:disable-next-line:max-line-length
            loadComponent: () =>
              import(
                './ui/pages/dashboard/pages/employee/pages/role-list/role-list.component'
              ).then((c) => c.RoleListComponent),
          },
          {
            path: `${DASHBOARD_EMPLOYEE_ROUTE.ROLE}/${DB_EMPY_ROLE_ROUTE.ROLE_ADD}`,
            // tslint:disable-next-line:max-line-length
            loadComponent: () =>
              import(
                './ui/pages/dashboard/pages/employee/pages/form-role/form-role.component'
              ).then((c) => c.FormRoleComponent),
          },
          {
            path: `${DASHBOARD_EMPLOYEE_ROUTE.ROLE}/${DB_EMPY_ROLE_ROUTE.ROLE_INFO}/${DB_EMPY_ROLE_ROUTE._ID_ROLE}`,
            // tslint:disable-next-line:max-line-length
            loadComponent: () =>
              import(
                './ui/pages/dashboard/pages/employee/pages/form-role/form-role.component'
              ).then((c) => c.FormRoleComponent),
            resolve: { data: InfoRoleResolver },
          },
        ],
      },

      {
        path: DASHBOARD_ROUTE.TRANSACTION,
        loadComponent: () =>
          import(
            './ui/pages/dashboard/pages/transaction/transaction.component'
          ).then((c) => c.TransactionComponent),
        children: [
          {
            path: '',
            redirectTo: GLOBAL_PATH.DASHBOARD_TRANSACTION_LIST,
            pathMatch: 'full'
          },
          {
            path: `${DB_TRANS_ROUTE.TRANS_LIST}`,
            // tslint:disable-next-line:max-line-length
            loadComponent: () =>
              import(
                './ui/pages/dashboard/pages/transaction/pages/transaction-list/transaction-list.component'
              ).then((c) => c.TransactionListComponent),
          },
          {
            path: `${DB_TRANS_ROUTE.TRANS_DETAIL}/${DB_TRANS_ROUTE._ID_ORDER}`,
            // tslint:disable-next-line:max-line-length
            loadComponent: () =>
              import(
                './ui/pages/dashboard/pages/transaction/pages/detail-transaction/detail-transaction.component'
              ).then((c) => c.DetailTransactionComponent),
            resolve: {
              data: DetailTransactionResolver,
            },
          },
        ],
      },
    ],
  },
  {
    path: APP_ROUTE.AUTH,
    loadComponent: () =>
      import('./ui/pages/auth/auth.component').then((c) => c.AuthComponent),
    title: 'Auth',
    canActivate: [UnAuthGuard],
    children: [
      {
        path: '',
        redirectTo: GLOBAL_PATH.AUTH_lOGIN,
        pathMatch: 'full',
      },
      {
        path: AUTH_ROUTE.LOGIN,
        loadComponent: () =>
          import('./ui/pages/auth/pages/login/login.component').then(
            (c) => c.LoginComponent
          ),
        title: 'Login',
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash,
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

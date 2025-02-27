import { Routes } from '@angular/router';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component'
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { producerAccessed } from '@angular/core/primitives/signals';
import { ProductsComponent } from './pages/products/products.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { loginGuardGuard } from './core/guards/login-guard.guard';
import { ForgotpasswordComponent } from './shared/components/forgotpassword/forgotpassword.component';
import { CartComponent } from './pages/cart/cart.component';
import { Component } from '@angular/core';
import { WishListComponent } from './pages/wish-list/wish-list.component';
import { CashComponent } from './pages/cash/cash.component';
import { DetailsComponent } from './pages/details/details.component';
export const routes: Routes = [
 

  {path:'',component:AuthLayoutComponent,canActivate:[loginGuardGuard],children:[
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'register',component:RegisterComponent,title:"register"},
  {path:'login',component:LoginComponent,title:"login"},
  {path:'forgot',component:ForgotpasswordComponent,title:"fordot"},
]
},
  {path:'',component:BlankLayoutComponent,canActivate:[authGuard],children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent,title:"home"},
    {path:'details/:id',component:DetailsComponent,title:"detail"},
    {path:'products',component:ProductsComponent,title:"product"},
    {path:'cart',component:CartComponent,title:"cart"},
    {path:'brands',component:BrandsComponent,title:"brands"},
    {path:'categories',component:CategoriesComponent,title:"categories"},
    {path:'wishlist',component:WishListComponent,title:"whishList"},
    {path:'checkout/:id',component:CheckoutComponent ,title:"checkout"},
    {path:'cash/:id',component:CashComponent ,title:"cashPayment"}

  ] 
},
 { path: '**', component:NotfoundComponent, title: 'Page Not Found' }
 
];


// import { Routes } from '@angular/router';
// import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
// import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
// import { RegisterComponent } from './pages/register/register.component';
// import { LoginComponent } from './pages/login/login.component';
// import { HomeComponent } from './pages/home/home.component';
// import { NotfoundComponent } from './pages/notfound/notfound.component';
// import { authGuard } from './core/guards/auth.guard';

// export const routes: Routes = [
//   // { path: '', redirectTo: 'home', pathMatch: 'full' },

//   // { 
//   {path: '',component: AuthLayoutComponent, 
//     children: [
//       {path:'',redirectTo:'login',pathMatch:'full'},
//       { path: 'register',  loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), title: 'Register' },
//       { path: 'login',  loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), title: 'Login' }
//     ]
//   },

//   { 
//     path: '', 
//     component: BlankLayoutComponent,canActivate:[authGuard],  children: [
//       {path:'',redirectTo:'home',pathMatch:'full'},
//       { path: 'home', component: HomeComponent, title: 'Home' },
//       // Lazy load standalone component
//       { path: 'products',loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), title: 'Products' },
//       { path: 'cart',loadComponent:()=>import('./pages/cart/cart.component').then(m=>m.CartComponent), title: 'Cart' },
//       { path: 'brands', loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent), title: 'Brands' },
//       { path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent), title: 'Categories' },
//       { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent), title: 'Checkout' },
//       { path: 'details/:id', loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent), title: 'product_details' },

//     ]
//   },

//   // Wildcard route for handling 404s
//   { path: '**',  loadComponent:()=>import('./pages/notfound/notfound.component').then(m=>m.NotfoundComponent), title: 'Page Not Found' }
// ];




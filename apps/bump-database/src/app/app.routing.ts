import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// bump-db
import { AuthViewComponent } from './auth-view/auth-view.component';
import { LoginComponent } from './auth-view/login/login.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { MyBumpsViewComponent } from './my-bumps-view/my-bumps-view.component';
import { AddBumpViewComponent } from './add-bump-view/add-bump-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { IssueBumpsComponent } from './admin-view/issue-bumps/issue-bumps.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth', component: AuthViewComponent, children : [
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: 'home', component: HomeViewComponent },
  { path: 'my-bumps', component: MyBumpsViewComponent },
  { path: 'add-bump', component: AddBumpViewComponent },
  { path: 'admin', component: AdminViewComponent, children: [
    { path: 'issue-bumps', component: IssueBumpsComponent }
  ]}
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
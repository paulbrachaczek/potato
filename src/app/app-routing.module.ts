import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './_helpers';
import { NewproductComponent } from './components/newproduct/newproduct.component';
import { SalesComponent } from './components/sales/sales.component';

const routes: Routes = [
    { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
    { path: 'new', component: NewproductComponent, canActivate: [AuthGuard] },
    { path: 'sales', component: SalesComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UnverifiedSeismsComponent } from './seisms/unverified-seisms/unverified-seisms.component';
import { VerifiedSeismsComponent } from './seisms/verified-seisms/verified-seisms.component';
import { SensorsComponent } from './sensors/sensors.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  // Routes
  { path: 'home', component: HomeComponent },
  { path: 'verified-seisms', component: VerifiedSeismsComponent },
  { path: 'unverified-seisms', component: UnverifiedSeismsComponent },
  { path: 'sensors', component: SensorsComponent },
  { path: 'users', component: UsersComponent },

  // Page not found redirect
  { path: '**', redirectTo: '/home' },
  // First page to load
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

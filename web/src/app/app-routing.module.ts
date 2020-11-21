import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditUnverifiedComponent } from './seisms/unverified-seisms/edit-unverified/edit-unverified.component';
import { UnverifiedSeismsComponent } from './seisms/unverified-seisms/unverified-seisms.component';
import { ViewUnverifiedComponent } from './seisms/unverified-seisms/view-unverified/view-unverified.component';
import { VerifiedSeismsComponent } from './seisms/verified-seisms/verified-seisms.component';
import { ViewVerifiedComponent } from './seisms/verified-seisms/view-verified/view-verified.component';
import { AddSensorComponent } from './sensors/add-sensor/add-sensor.component';
import { CheckSensorComponent } from './sensors/check-sensor/check-sensor.component';
import { DeleteSensorComponent } from './sensors/delete-sensor/delete-sensor.component';
import { EditSensorComponent } from './sensors/edit-sensor/edit-sensor.component';
import { SensorsComponent } from './sensors/sensors.component';
import { ViewSensorComponent } from './sensors/view-sensor/view-sensor.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  // Routes
  { path: 'home', component: HomeComponent },
  {
    path: 'verified-seisms', children: [
      { path: '', component: VerifiedSeismsComponent },
      { path: 'view/:id', component: ViewVerifiedComponent },
    ]
  },
  {
    path: 'unverified-seisms', children: [
      { path: '', component: UnverifiedSeismsComponent },
      { path: 'view/:id', component: ViewUnverifiedComponent },
      { path: 'edit/:id', component: EditUnverifiedComponent },
    ]
  },
  {
    path: 'sensors', children: [
      { path: '', component: SensorsComponent },
      { path: 'view/:id', component: ViewSensorComponent },
      { path: 'edit/:id', component: EditSensorComponent },
      { path: 'add', component: AddSensorComponent },
      { path: 'delete/:id', component: DeleteSensorComponent },
      { path: 'check/:id', component: CheckSensorComponent }
    ]
  },
  {
    path: 'users', children: [
      { path: '', component: UsersComponent },
      { path: 'edit/:id', component: EditUserComponent },
      { path: 'add', component: AddUserComponent },
      { path: 'delete/:id', component: DeleteUserComponent }
  ] },

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

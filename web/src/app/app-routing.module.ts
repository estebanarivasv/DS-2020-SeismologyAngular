import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from './authentication/guards/admin-auth.guard';
import { SeismologistAuthGuard } from './authentication/guards/seismologist-auth.guard';
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
    path: 'verified-seisms', data: { breadcrumb: 'Verified seisms' }, children: [
      { path: '', component: VerifiedSeismsComponent, data: { title: 'Verified seisms' } },
      { path: 'view/:id', data: { breadcrumb: 'view - id:', title: 'Verified seisms' }, component: ViewVerifiedComponent },
    ]
  },
  {
    path: 'unverified-seisms', data: { breadcrumb: 'Unverified seisms' }, children: [
      { path: '', component: UnverifiedSeismsComponent, data: { title: 'Unverified seisms' }, canActivate: [SeismologistAuthGuard] },
      { path: 'view/:id', data: { breadcrumb: 'view - id:', title: 'Unverified seisms' }, component: ViewUnverifiedComponent, canActivate: [SeismologistAuthGuard] },
      { path: 'edit/:id', data: { breadcrumb: 'edit - id:', title: 'Unverified seisms' }, component: EditUnverifiedComponent, canActivate: [SeismologistAuthGuard] },
    ]
  },
  {
    path: 'sensors', data: { breadcrumb: 'Sensors' }, children: [
      { path: '', component: SensorsComponent, data: { title: 'Sensors' }, canActivate: [AdminAuthGuard] },
      { path: 'view/:id', data: { breadcrumb: 'view - id:', title: 'Sensors' }, component: ViewSensorComponent, canActivate: [AdminAuthGuard] },
      { path: 'edit/:id', data: { breadcrumb: 'edit - id:', title: 'Sensors' }, component: EditSensorComponent, canActivate: [AdminAuthGuard] },
      { path: 'add', data: { breadcrumb: 'add', title: 'Sensors' }, component: AddSensorComponent, canActivate: [AdminAuthGuard] },
      { path: 'delete/:id', component: DeleteSensorComponent, canActivate: [AdminAuthGuard] },
      { path: 'check/:id', component: CheckSensorComponent, canActivate: [AdminAuthGuard] }
    ]
  },
  {
    path: 'users', data: { breadcrumb: 'Users' }, children: [
      { path: '', component: UsersComponent, data: { title: 'Users' }, canActivate: [AdminAuthGuard] },
      { path: 'edit/:id', data: { breadcrumb: 'edit - id:', title: 'Users' }, component: EditUserComponent, canActivate: [AdminAuthGuard] },
      { path: 'add', data: { breadcrumb: 'add', title: 'Users' }, component: AddUserComponent, canActivate: [AdminAuthGuard] },
      { path: 'delete/:id', component: DeleteUserComponent }
    ]
  },

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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SensorsComponent } from './sensors/sensors.component';
import { UsersComponent } from './users/users.component';
import { VerifiedSeismsComponent } from './seisms/verified-seisms/verified-seisms.component';
import { UnverifiedSeismsComponent } from './seisms/unverified-seisms/unverified-seisms.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewVerifiedComponent } from './seisms/verified-seisms/view-verified/view-verified.component';
import { EditVerifiedComponent } from './seisms/verified-seisms/edit-verified/edit-verified.component';
import { EditUnverifiedComponent } from './seisms/unverified-seisms/edit-unverified/edit-unverified.component';
import { ViewUnverifiedComponent } from './seisms/unverified-seisms/view-unverified/view-unverified.component';
import { DeleteUnverifiedComponent } from './seisms/unverified-seisms/delete-unverified/delete-unverified.component';
import { AddSensorComponent } from './sensors/add-sensor/add-sensor.component';
import { ViewSensorComponent } from './sensors/view-sensor/view-sensor.component';
import { DeleteSensorComponent } from './sensors/delete-sensor/delete-sensor.component';
import { EditSensorComponent } from './sensors/edit-sensor/edit-sensor.component';
import { CheckSensorComponent } from './sensors/check-sensor/check-sensor.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ViewUserComponent } from './users/view-user/view-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SensorsComponent,
    UsersComponent,
    VerifiedSeismsComponent,
    UnverifiedSeismsComponent,
    ViewVerifiedComponent,
    EditVerifiedComponent,
    EditUnverifiedComponent,
    ViewUnverifiedComponent,
    DeleteUnverifiedComponent,
    AddSensorComponent,
    ViewSensorComponent,
    DeleteSensorComponent,
    EditSensorComponent,
    CheckSensorComponent,
    AddUserComponent,
    DeleteUserComponent,
    EditUserComponent,
    ViewUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

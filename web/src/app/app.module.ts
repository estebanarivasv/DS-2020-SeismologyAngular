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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ViewVerifiedComponent } from './seisms/verified-seisms/view-verified/view-verified.component';
import { EditUnverifiedComponent } from './seisms/unverified-seisms/edit-unverified/edit-unverified.component';
import { ViewUnverifiedComponent } from './seisms/unverified-seisms/view-unverified/view-unverified.component';
import { AddSensorComponent } from './sensors/add-sensor/add-sensor.component';
import { ViewSensorComponent } from './sensors/view-sensor/view-sensor.component';
import { EditSensorComponent } from './sensors/edit-sensor/edit-sensor.component';
import { CheckSensorComponent } from './sensors/check-sensor/check-sensor.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpperBodyComponent } from './upper-body/upper-body.component';
import { AlertsComponent } from './alerts/alerts.component';
import { NgTempusdominusBootstrapModule } from 'ngx-tempusdominus-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbdSortableHeader } from './app-sorting.directive';
import { AuthenticationComponent } from './authentication/authentication.component';
import { TokenRequestsInterceptor } from './authentication/interceptors/requests.interceptor';

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
    EditUnverifiedComponent,
    ViewUnverifiedComponent,
    AddSensorComponent,
    ViewSensorComponent,
    EditSensorComponent,
    CheckSensorComponent,
    AddUserComponent,
    EditUserComponent,
    UpperBodyComponent,
    AlertsComponent,
    NgbdSortableHeader,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgTempusdominusBootstrapModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenRequestsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

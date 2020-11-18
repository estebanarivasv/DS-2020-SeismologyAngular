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
import { ViewComponent } from './seisms/verified-seisms/view/view.component';
import { EditComponent } from './seisms/verified-seisms/edit/edit.component';
import { DeleteComponent } from './seisms/unverified-seisms/delete/delete.component';
import { AddComponent } from './sensors/add/add.component';
import { CheckComponent } from './sensors/check/check.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SensorsComponent,
    UsersComponent,
    VerifiedSeismsComponent,
    UnverifiedSeismsComponent,
    ViewComponent,
    EditComponent,
    DeleteComponent,
    AddComponent,
    CheckComponent
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

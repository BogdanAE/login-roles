import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { DoctorComponent } from './components/doctor/doctor.component';
import { PatientComponent } from './components/patient/patient.component';
import { CareTakerComponent } from './components/care-taker/care-taker.component';
import { AdminComponent } from './components/admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DoctorComponent,
    PatientComponent,
    CareTakerComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
        { path: 'doctors', component: DoctorComponent, canActivate: [AuthorizeGuard] },
        { path: 'patient', component: PatientComponent, canActivate: [AuthorizeGuard]},
        { path: 'care-taker', component: CareTakerComponent, canActivate: [AuthorizeGuard] },
        {path:'admin', component: AdminComponent, canActivate: [AuthorizeGuard] }
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

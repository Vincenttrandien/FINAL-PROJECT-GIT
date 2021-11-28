import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdAccountsComponent } from './admin/ad-accounts/ad-accounts.component';
import { AdFacultiesComponent } from './admin/ad-faculties/ad-faculties.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { NotifyComponent } from './notify/notify.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivacyPolicyComponent } from './website-backgrounds/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './website-backgrounds/terms-conditions/terms-conditions.component';
import { AppGlobals } from './app-variable';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { NgbDateCustomParserFormatter } from 'src/shared/NgbDateCustomParserFormatter';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { CommentComponent } from './comment/comment.component';
import { AdClassroomsComponent } from './admin/ad-classrooms/ad-classrooms.component';
import { AdContactformComponent } from './admin/ad-contactform/ad-contactform.component';
import { AdSupportformComponent } from './admin/ad-supportform/ad-supportform.component';
import { HomePageformComponent } from './home-page/home-pageform/home-pageform.component';
import { LayoutComponent } from './layout/layout.component';
import { ServiceClassComponent } from './service/service-class/service-class.component';
import { ServiceContactComponent } from './service/service-contact/service-contact.component';
import { ServiceSupportComponent } from './service/service-support/service-support.component';
import { StdClassComponent } from './student/std-class/std-class.component';
import { StdSupportComponent } from './student/std-support/std-support.component';
import { TeacherClassroomComponent } from './teacher/teacher-classroom/teacher-classroom.component';
import { TeacherPersonalclassComponent } from './teacher/teacher-personalclass/teacher-personalclass.component';
import { TeacherSupportformComponent } from './teacher/teacher-supportform/teacher-supportform.component';
import { ServicePersonalclassComponent } from './service/service-personalclass/service-personalclass.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdAccountsComponent,
    AdFacultiesComponent,
    NotifyComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    CommentComponent,
    AdClassroomsComponent,
    AdContactformComponent,
    AdSupportformComponent,
    HomePageformComponent,
    LayoutComponent,
    ServiceClassComponent,
    ServiceContactComponent,
    ServiceSupportComponent,
    StdClassComponent,
    StdSupportComponent,
    TeacherClassroomComponent,
    TeacherPersonalclassComponent,
    TeacherSupportformComponent,
    ServicePersonalclassComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    NgSelectModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    })
  ],
  providers: [authInterceptorProviders, DatePipe, AppGlobals, CookieService, NgbDateCustomParserFormatter],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdAccountsComponent } from './admin/ad-accounts/ad-accounts.component';
import { AdClassroomsComponent } from './admin/ad-classrooms/ad-classrooms.component';
import { AdContactformComponent } from './admin/ad-contactform/ad-contactform.component';
import { AdSupportformComponent } from './admin/ad-supportform/ad-supportform.component';
import { HomePageformComponent } from './home-page/home-pageform/home-pageform.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';


import { NotifyComponent } from './notify/notify.component';
import { ServiceClassComponent } from './service/service-class/service-class.component';
import { ServiceContactComponent } from './service/service-contact/service-contact.component';
import { ServicePersonalclassComponent } from './service/service-personalclass/service-personalclass.component';
import { ServiceSupportComponent } from './service/service-support/service-support.component';
import { StdClassComponent } from './student/std-class/std-class.component';
import { StdSupportComponent } from './student/std-support/std-support.component';
import { TeacherClassroomComponent } from './teacher/teacher-classroom/teacher-classroom.component';
import { TeacherPersonalclassComponent } from './teacher/teacher-personalclass/teacher-personalclass.component';
import { TeacherSupportformComponent } from './teacher/teacher-supportform/teacher-supportform.component';
import { PrivacyPolicyComponent } from './website-backgrounds/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './website-backgrounds/terms-conditions/terms-conditions.component';

const routes: Routes = [
    { path:'', component: HomePageformComponent, pathMatch: 'full' },
    { path:'login', component: LoginComponent, pathMatch:'full' },
    { path:'mdflayout', component: LayoutComponent },

    // Main
    {
      path: 'notify',
      component: LayoutComponent,
      children: [
        { path: '', component: NotifyComponent }
      ]
    },

    // Admin
    {
      path: 'admin/account',
      component: LayoutComponent,
      children: [
        { path: '', component: AdAccountsComponent }
      ]
    },

    {
      path: 'admin/contact',
      component: LayoutComponent,
      children: [
        { path: '', component: AdContactformComponent }
      ]
    },

    {
      path: 'admin/classroom',
      component: LayoutComponent,
      children: [
        { path: '', component: AdClassroomsComponent }
      ]
    },

    {
      path: 'admin/support',
      component: LayoutComponent,
      children: [
        { path: '', component: AdSupportformComponent }
      ]
    },


    //Customer Service


    {
      path: 'service/contact',
      component: LayoutComponent,
      children: [
        { path: '', component: ServiceContactComponent }
      ]
    },

    {
      path: 'service/classroom',
      component: LayoutComponent,
      children: [
        { path: '', component: ServiceClassComponent }
      ]
    },

    {
      path: 'service/support',
      component: LayoutComponent,
      children: [
        { path: '', component: ServiceSupportComponent }
      ]
    },

    {
      path: 'service/personalclass',
      component: LayoutComponent,
      children: [
        { path: '', component: ServicePersonalclassComponent }
      ]
    },

    // Student

    {
      path: 'student/classroom',
      component: LayoutComponent,
      children: [
        { path: '', component: StdClassComponent }
      ]
    },

    {
      path: 'student/support',
      component: LayoutComponent,
      children: [
        { path: '', component: StdSupportComponent }
      ]
    },
 

    //Teacher
    {
      path: 'teacher/classroom',
      component: LayoutComponent,
      children: [
        { path: '', component: TeacherClassroomComponent }
      ]
    },

    {
      path: 'teacher/support',
      component: LayoutComponent,
      children: [
        { path: '', component: TeacherSupportformComponent }
      ]
    },

    {
      path: 'teacher/personalclass',
      component: LayoutComponent,
      children: [
        { path: '', component: TeacherPersonalclassComponent }
      ]
    },


    // Backgrounds
    {
      path: 'privacy-policy',
      component: LayoutComponent,
      children: [
        { path: '', component: PrivacyPolicyComponent }
      ]
    },

    {
      path: 'terms-conditions',
      component: LayoutComponent,
      children: [
        { path: '', component: TermsConditionsComponent}
      ]
    },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

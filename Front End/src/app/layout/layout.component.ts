import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ACCOUNTs } from '../admin/ad-accounts/ad-accounts';
import { AdAccountsService } from '../admin/ad-accounts/ad-accounts.service';
import { AppGlobals } from '../app-variable';
import $ from 'jquery';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router,
    private cookie: CookieService,
    private toast: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private globalMemor: AppGlobals,
    private accountService: AdAccountsService) { }

  id: any;

  basedLayout: number;

  currentName: any;
  currentRole: any;

  profileList = [];
  profileForm: FormGroup;

  ngOnInit(): void {

    this.profileForm = this.formBuilder.group({
      name: [''],
      email: [''],
      dateOfBirth: [''],
      phoneNumber: [''],
      major:[''],
      year: [''],
      id: [],
      roles: [],
      codeClass: [],
      username: [],
      password: [],

    })

    $("#menu-toggle1").click(function(e) {
      e.preventDefault();
      $("#sidebar").toggleClass("active");
      $("#menu").toggleClass("active");
      $("#content").toggleClass("active");
      $("#header").toggleClass("active");
      $("#footer").toggleClass("active");
    });

    $("#menu-toggle2").click(function(e) {
      e.preventDefault();
      $("#sidebar").toggleClass("active");
      $("#menu").toggleClass("active");
      $("#content").toggleClass("active");
      $("#header").toggleClass("active");
      $("#footer").toggleClass("active");
    });

    this.basedLayout = this.globalMemor.basedlayout;
    this.id = this.globalMemor.currentId
    this.findById();
  }


  profileModal(profile: any) {
    this.findById();
    // body = this.profileForm.value;
    this.modalService.open(profile, { centered: true, size: 'lg' });


    // if (body) {
    //   body.id = this.cookie.get('id');
    //   this.id = body.id;
    //   this.profileForm.patchValue(body);
    //   this.modalService.open( profile, { centered: true, size: 'lg' });
    // }
  }

  repassModal(repass: any) {
    this.modalService.open(repass, { centered: true, size: 'md' });
  }

  logoutModal(logout: any) {
    this.modalService.open(logout, { centered: true, size: 'md' });
  }

  findById() {
    this.id = this.cookie.get('userId')
    this.accountService.findById(this.id).subscribe(data => {
      if (data) {
        console.log(data);
        this.profileForm.setValue(data);
        this.currentName = data.name;
        this.currentRole = data.roles[0].name;
        this.globalMemor.currentCode = data.codeUser;
        this.globalMemor.currentFaculty = data.facultyName;
        this.globalMemor.currentName = data.name;

        switch (this.currentRole) {
          case "ADMIN": {
            this.currentRole = "ADMIN";
            this.basedLayout = 1;
            break;
          }
          case "TEACHER": {
            this.currentRole = "Teacher";
            this.basedLayout = 2;
            break;
          }
          case "CUSTOMER_SERVICE": {
            this.currentRole = "Customer Services";
            this.basedLayout = 3;
            break;
          }
          case "STUDENT": {
            this.currentRole = "Student";
            this.basedLayout = 4;
            break;
          }
          case "USER": {
            this.currentRole = "User";
            this.basedLayout = 5;
            break;
          }
        }

        this.cookie.set('name', this.globalMemor.currentName);
        this.cookie.set('email', this.globalMemor.currentEmail);
        this.cookie.set('dateOfBirth', this.globalMemor.currentDOB );
        this.cookie.set('phoneNumber', this.globalMemor.currentPhone);
        this.cookie.set('major', this.globalMemor.currentMajor);
        this.cookie.set('year', this.globalMemor.currentNam);
        this.cookie.set('Role', this.globalMemor.currentRole);
      }
    })
  }

  updateProfile(body: ACCOUNTs) {
    this.accountService.updateCategory(this.id, body).subscribe(data => {
      if (data) {
        this.toast.success('Update user information successfully', 'Success');
        this.modalService.dismissAll();
      }
    }, (err) => {
      this.toast.error('Update user information process have an error', 'Failure')
    })
  }

  logOut() {
    this.modalService.dismissAll();
    this.router.navigate(['']);
    this.globalMemor.basedlayout = null;
    this.globalMemor.currentCode = null;
    this.globalMemor.currentId = null;
    this.globalMemor.currentName = null;
    this.globalMemor.currentRole = null;
    this.globalMemor.currentEmail = null;
    this.globalMemor.currentDOB = null;
    this.globalMemor.currentAdd = null;
    this.globalMemor.currentPhone = null;
    this.globalMemor.currentNam = null;
    this.globalMemor.currentImage = null;
    this.globalMemor.currentTopic = null;
    this.globalMemor.currentFaculty = null;
    this.globalMemor.currentUsername = null;
  }


  notify() {
    this.router.navigate(['/notify']);
  }

  // Admin
  mngAccount(){
    this.router.navigate(['admin/account']);
  }

  mngClass(){
    this.router.navigate(['admin/classroom']);
  }

  mngContact(){
    this.router.navigate(['admin/contact']);
  }

  mngSupport(){
    this.router.navigate(['admin/support']);
  }


  //Customer Service
  watchClass(){
    this.router.navigate(['service/classroom']);
  }

  watchContact(){
    this.router.navigate(['service/contact']);
  }

  watchSupport(){
    this.router.navigate(['service/support']);
  }


    //Teacher
    teacherClass(){
      this.router.navigate(['teacher/classroom']);
    }
  
    teacherSuport(){
      this.router.navigate(['teacher/support']);
    }
  
    teacherPersonal(){
      this.router.navigate(['teacher/personalclass']);
    }
  


  // Student
  stdClass() {
    this.router.navigate(['student/classroom']);
  }

  stdSupport() {
    this.router.navigate(['/student/support']);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}

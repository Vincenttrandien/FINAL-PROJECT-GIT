import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AppGlobals } from '../app-variable';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { SIGNIN } from './login';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toast: ToastrService,
    private router: Router,
    private cookie: CookieService,
    private globalMemor: AppGlobals,
    private tokenStorage: TokenStorageService
  ) { }

  signinForm: FormGroup;
  account = [];
  userRole: any;
  id: any;

  ngOnInit(): void {
    this.router.navigate['/'];
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['', Validators.required],
      id: []
    })

    this.cookie.deleteAll();

    // if (this.tokenStorage.getToken()) {
    //   this.userRole = this.tokenStorage.getUser().roles;
    // }

  }

  onSubmit(value: SIGNIN) {
    this.loginService.login(value).subscribe(data => {
      if (data) {
        sessionStorage.setItem('loginLocal', 'true');
        this.toast.success("Welcome To English Trainer WorkSpace");
        this.id = data.id;
        this.signinForm.patchValue(data);

        console.log(data)

        this.globalMemor.currentId = data.id;
        this.globalMemor.currentUsername = data.username;
        this.globalMemor.currentRole = data.roles[0];
        this.globalMemor.currentCodeClass = data.codeClass;
        this.userRole = this.signinForm.value.roles;

        this.cookie.set('userId', this.globalMemor.currentId);

        switch (this.userRole[0]) {
          case ("ADMIN"): {
            this.globalMemor.basedlayout = 1;
            this.globalMemor.currentRole = "ADMIN"
            this.router.navigate(['/admin/account']);
            break;
          } case ("TEACHER"): {
            this.globalMemor.basedlayout = 2;
            this.globalMemor.currentRole = "Teacher";
            this.router.navigate(['/teacher/classroom']);
            break;
          } case ("CUSTOMER_SERVICE"): {
            this.globalMemor.basedlayout = 3;
            this.globalMemor.currentRole = "Customer Services";
            this.router.navigate(['/service/classroom']);
            break;
          } case ("STUDENT"): {
            this.globalMemor.basedlayout = 4;
            this.globalMemor.currentRole = "Student";
            this.router.navigate(['/student/support']);
            break;
          } case ("USER"): {
            this.globalMemor.basedlayout = 5;
            this.globalMemor.currentRole = "Guest";
            this.router.navigate(['/guest/dashboard']);
            break;
          } default: {
            break;
          }
        }
      }
    }, (err) => {
      this.toast.error('Username or password is not correct', 'Failure');
    })
  }

}

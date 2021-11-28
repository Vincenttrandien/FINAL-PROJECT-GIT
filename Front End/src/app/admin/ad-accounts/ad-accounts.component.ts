import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { validationUtil } from 'src/shared/validation.util';
import Swal from 'sweetalert2';

import { ACCOUNTs } from './ad-accounts';
import { AdAccountsService } from './ad-accounts.service';

@Component({
  selector: 'app-ad-accounts',
  templateUrl: './ad-accounts.component.html',
  styleUrls: ['./ad-accounts.component.css']
})
export class AdAccountsComponent implements OnInit {

  constructor(  private formBuilder: FormBuilder,
                private modalService: NgbModal,
                private toaster: ToastrService,
                private accountsService: AdAccountsService) { }


roleList = [
  { name: "Admin", id : ["Admin"] },
  { name: "Teacher", id : ["Teacher"] },
  { name: "Customer Service", id : ["Customer Service"] },
  { name: "Student", id : ["Student"] },
  { name: "User", id : ["User"] }
]

updateRoleList = [
  { name: "Admin", id : {
     "id" : "611397a13cf38fa0b05c6e5b",
     "name" : "ADMIN"
    }
  },
  { name: "Teacher", id : [{
    "id" : "611397a13cf38fa0b05c6e5d",
    "name" : "TEACHER"
   }]
  },
  { name: "Customer Service", id : {
    "id" : "611397a13cf38fa0b05c6e5e",
    "name" : "CUSTOMER_SERVICE"
   }
  },
  { name: "Student", id : {
    "id" : "611397a13cf38fa0b05c6e5c",
    "name" : "STUDENT"
   }
  },
  { name: "User", id : {
    "id" : "611397a13cf38fa0b05c6e5f",
    "name" : "USER"
   }
  },
]

id: any;
year = 2021;
pageNum = 1;
maxSize = 5;
pageSize = 10;
searchKey = '';
totalElements: number;

yearList : string[] = [];
yearBefore = new Date().getFullYear()+1;

accountList = [];

updated = false;
submitted = false;

btnSubmitName = 'Create';

accountForm: FormGroup;

isSuccessful = false;
isSignUpFailed = false;
errorMessage = '';

username: string;
email: string;
password: string;
roles: any;

utils: any = validationUtil;


ngOnInit(): void {

  this.accountForm = this.formBuilder.group({
    username : [''],
    name: [''],
    email : [''],
    dateOfBirth : [''],
    phoneNumber :  [''],
    major :  [''],
    password : [''],
    codeClass :  [''],
    year : [ this.yearList[1]],
    roles : [],
  })

  this.makeYearList();
  this.getCategoryList();
  console.log(this.yearList)
  }

  get f (){
    return this.accountForm.controls;
  }

  makeYearList() {
    for (let i = 0; i < 7; i++) {
        this.yearList.push(this.yearBefore.toString());
        this.yearBefore--;
    }
  }

  onPageChange(pageNum: number) {
    this.pageNum = pageNum;
    this.getCategoryList();
  }

  onPageSizeChange(pageSize: number) {
      this.pageSize = pageSize;
      this.getCategoryList();
  }

  createModal(create: any) {
    this.onReset();
    this.modalService.open(create, { centered: true, size: 'lg' });
  }

  infoModal(info: any) {
    this.modalService.open(info, { centered: true, size: 'lg' });
  }

  getCategoryList(){
    this.accountsService.getCategoryList(this.pageNum, this.pageSize, this.year, this.searchKey).subscribe( data => {
      if ( data ){
        this.accountList = data.content;
        this.totalElements = data.totalElements;
      }
    })
  }

  viewModal(item: ACCOUNTs, view: any) {
    if (item){
      this.id = item.id;
      this.updated = true;
      this.accountForm.patchValue(item);
    } else {
      this.onReset();
      this.updated = false;
      this.btnSubmitName = 'Create';
    }
    this.modalService.open( view, { size: 'lg', centered: true });
  }

  editModal(item: ACCOUNTs, edit: any) {
    if (item){
      this.id = item.id;
      this.accountForm.patchValue(item);
      this.f.roles.setValue(item.roles[0]);
      this.f.roles.setValue([item.roles[0]]);

      this.updated = true;
      this.submitted = false;
      this.btnSubmitName = 'Update'
      } else {
      this.submitted = true;
      this.onReset();
      this.btnSubmitName = 'Create';
    }
    this.modalService.open( edit, { size: 'lg', centered: true });
  }

  closeModal(){
    this.btnSubmitName = 'Create';
    this.modalService.dismissAll();
  }

  onReset(){
    this.updated = false;
    this.submitted = false;
    this.accountForm.reset();
  }



  onSubmit(value: ACCOUNTs){

    this.submitted = true;

    if (this.accountForm.invalid){
      return ;
    }

    if (this.updated){

      value.retypePassword = value.password;

      this.accountsService.updateCategory(this.id, value).subscribe( data => {
        if(data) {
          this.toaster.success('User Information update successfully');
          this.modalService.dismissAll();
          this.accountForm.reset();
          this.getCategoryList();
        }
      })
    } else {

      // if ( value.password != value.retypePassword){
      //   this.toaster.warning("Password  and Retype password isn't match", "Warning");
      //   return;
      // }

      this.accountsService.signUp(value).subscribe( data => {
        if (data) {
          this.toaster.success('New user has been created successfully','Success');
          this.onReset();
          this.modalService.dismissAll();
          this.getCategoryList();
        } else {
          this.toaster.warning('New user creation process have an error', 'Failure');
          this.modalService.dismissAll();
        }
      }, err => {
          this.toaster.warning('New user creation process have an error', 'Failure');
          this.getCategoryList();
        }
      );
    }


  }

  deleteCategory(item: ACCOUNTs){
    const textConfirm = '<span style="color: #ff0000;">Warning : Deleted data cannot be recovered</span>';
    Swal.fire({
      title: '<span style="color: #2d8dc7;"> DO YOU REALLY WANT TO DELETE THIS USER <strong style="color: #f1556c; font-weight:bold;">'
           + '</strong> ?</span>',
      html: textConfirm,
      imageHeight: 150,
      imageWidth: 320,
      imageClass: 'img-responsive',
      animation: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Agree'
    }).then((result) => {
      if (result.value) {
        this.accountsService.deleteCategory(item.id).subscribe(data => {
          if (data) {
            this.toaster.success('User information delete successfully', 'Success');
            this.getCategoryList();
            this.onReset();
            this.modalService.dismissAll();
          }
        });
      } (err) => {
          this.toaster.error('Failed to delete user information', 'Failure');
      }
    })
  }
}

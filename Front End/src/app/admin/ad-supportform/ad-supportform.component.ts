import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SUPPORTs } from './ad-supportform';
import { AdSupportformService } from './ad-supportform.service';

@Component({
  selector: 'app-ad-supportform',
  templateUrl: './ad-supportform.component.html',
  styleUrls: ['./ad-supportform.component.css']
})
export class AdSupportformComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private supportService : AdSupportformService
  ) { }



  id: any;
  year = 2021;
  pageNum = 1;
  maxSize = 5;
  pageSize = 10;
  searchKey = '';
  totalElements: number;
  
  yearList : string[] = [];
  yearBefore = new Date().getFullYear()+1;
  
  contactList = [];
  
  updated = false;
  submitted = false;
  
  btnSubmitName = 'Create';
  
  supportForm: FormGroup;
  
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  
    ngOnInit(): void {
  
      this.supportForm = this.formBuilder.group({
        username: [''],
        options : [''],
        descriptions :  [''],
        reply :  [''],
        year : [ this.yearList[1]],
      })
    
      this.makeYearList();
      this.getCategoryList();
      console.log(this.yearList)
      }
    
      get f (){
        return this.supportForm.controls;
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
        this.supportService.getCategoryList(this.pageNum, this.pageSize, this.year, this.searchKey).subscribe( data => {
          if ( data ){
            this.contactList = data.content;
            this.totalElements = data.totalElements;
          }
        })
      }
    
      viewModal(item: SUPPORTs, view: any) {
        if (item){
          this.id = item.id;
          this.updated = true;
          this.supportForm.patchValue(item);
        } else {
          this.onReset();
          this.updated = false;
          this.btnSubmitName = 'Create';
        }
        this.modalService.open( view, { size: 'lg', centered: true });
      }
    
      editModal(item: SUPPORTs, edit: any) {
        if (item){
          this.id = item.id;
          this.supportForm.patchValue(item);
          // this.f.roles.setValue(item.roles[0]);
          // this.f.roles.setValue([item.roles[0]]);
    
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
        this.supportForm.reset();
      }
    
    
    
      onSubmit(value: SUPPORTs){
    
        this.submitted = true;
    
        if (this.supportForm.invalid){
          return ;
        }
    
        if (this.updated){

    
          this.supportService.updateCategory(this.id, value).subscribe( data => {
            if(data) {
              this.toaster.success('Send Support Form successfully');
              this.modalService.dismissAll();
              this.supportForm.reset();
              this.getCategoryList();
            }
          })
        } else {
    
          // if ( value.password != value.retypePassword){
          //   this.toaster.warning("Password  and Retype password isn't match", "Warning");
          //   return;
          // }
    
          this.supportService.updateCategory(this.id , value).subscribe( data => {
            if (data) {
              this.toaster.success('Reply successfully','Success');
              this.onReset();
              this.modalService.dismissAll();
              this.getCategoryList();
            } else {
              this.toaster.warning('ERROR : Not Send Reply Form', 'Failure');
              this.modalService.dismissAll();
            }
          }, err => {
              this.toaster.warning('ERROR : Not Send Reply Form', 'Failure');
              this.getCategoryList();
            }
          );
        }
    
    
      }
    
      deleteCategory(item: SUPPORTs){
        const textConfirm = '<span style="color: #ff0000;">Warning : Deleted data cannot be recovered</span>';
        Swal.fire({
          title: '<span style="color: #2d8dc7;"> DO YOU REALLY WANT TO DELETE THIS FORM <strong style="color: #f1556c; font-weight:bold;">'
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
            this.supportService.deleteCategory(item.id).subscribe(data => {
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

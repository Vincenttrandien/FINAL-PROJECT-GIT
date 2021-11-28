import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CLASSROOM } from 'src/app/admin/ad-classrooms/ad-classrooms';
import { validationUtil } from 'src/shared/validation.util';
import Swal from 'sweetalert2';
import { ServiceClassService } from './service-class.service';
import { AppGlobals } from 'src/app/app-variable';
import { Router } from '@angular/router';


@Component({
  selector: 'app-service-class',
  templateUrl: './service-class.component.html',
  styleUrls: ['./service-class.component.css']
})
export class ServiceClassComponent implements OnInit {

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private modalService : NgbModal,
    private globalMemor : AppGlobals,
    private classService : ServiceClassService,
    private toaster : ToastrService) { }


    yearBefore = new Date().getFullYear()+1;
    yearList : string[] = [];


    id: any;
    idmemor: any;
    memordate1: any;
    memordate2: any;
  
    year = 2021;
    pageNum = 1;
    pageSize = 10;
    searchKey = this.globalMemor.currentUsername;
    totalElements : any;

    

    updated = false;
  submitted = false;
  btnSubmitName = 'Create';

  classRoomList = [];
  classRoomForm : FormGroup;

  classRoomId : any;
  utils : any = validationUtil;
  limitPat : any = '/^[a-zA-Z0-9!@#$%^&*()]+$/';
  
  ngOnInit(): void {

    console.log(this.globalMemor.currentUsername)

    this.classRoomForm = this.formBuilder.group({
      codeClass : [''],
      date : [''],
      usernameTeacher : [''],
      usernameService: [],
      year : ['']
    })
    this.getCategoryList();
    this.makeYearList();

    console.log(this.searchKey);

  }
  onReset(){
    this.updated = false;
    this.submitted = false;
    this.classRoomForm.reset();
  }

  get f () {
    return this.classRoomForm.controls;
  }

  makeYearList() {
    for (let i = 0; i < 7; i++) {
        this.yearList.push(this.yearBefore.toString());
        this.yearBefore--;
    }
  }

  createModal(create: any){
    this.updated = false;
    this.submitted = false;
    this.btnSubmitName = 'Create';
    this.classRoomForm.reset();
    this.modalService.open(create, { centered: true, size: "lg" });
  }


  updateModal(update: any, item: CLASSROOM){
    if (item) {
      this.updated = true;
      this.id = item.id;
      this.idmemor = item.id;
      this.memordate1 = item.date;
      this.btnSubmitName = 'Update'
      this.classRoomForm.patchValue(item);
    }
    this.modalService.open(update, { centered: true, size: "lg" });
  }

  getCategoryList(){
    this.classService.getCategoryList(this.pageNum, this.pageSize, this.year, this.searchKey).subscribe( data => {
      if (data) {
        this.classRoomList = data.content;
        this.totalElements = data.totalElements;
      }
    })
  }
  onSubmit( body : CLASSROOM ){
    this.submitted = true;

    if ( this.classRoomForm.invalid) {
      return;
    }

    if( this.updated ){
      if ( this.f.date.value) {
        body.date = this.f.date.value;

      } else {
        this.f.date.setValue(this.memordate1);
        body.date = this.f.date.value;

      }

      // if (this.f.data){
      //   body.data = this.f.data.value;
      //   body.nameFile = this.f.nameFile.value;
      //   body.type = this.f.type.value;
      // }

      this.classService.updateCategory( this.id, body ).subscribe( data => {
        if (data) {
          this.toaster.success('Topic information have been updated','Success');
          this.onReset();
          this.getCategoryList();
          this.modalService.dismissAll();
          this.classRoomForm.reset();
        }
      })
    } else {

      // this.f.date.setValue( new String ( this.f.date.value.day.toString() + '-' + this.f.date.value.month.toString() + '-' + this.f.date.value.year.toString() ));
      // body.date  = this.f.dateUpdate.value.toString();

      this.classService.createNewCategory( body ).subscribe( data => {
        if (data) {
          this.toaster.success('Create new topic successfully','Success')
          this.onReset();
          this.modalService.dismissAll();
          this.getCategoryList();
          this.classRoomForm.reset();
        }
      })
    }
  }
  deleteCategory(item: CLASSROOM){
    item =  this.classRoomList.find(x => x.id == this.idmemor);
    const textConfirm = '<span style="color: #ff0000;">Warning : Deleted data cannot be recovered</span>';
    Swal.fire({
      title: '<span style="color: #2d8dc7;"> DO YOU REALLY WANT TO DELETE THIS TOPIC <strong style="color: #f1556c; font-weight:bold;">'
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
        console.log(item.id);
        this.classService.deleteCategory(item.id).subscribe(data => {
          console.log(item.id);
          if (data) {
            this.toaster.success('ClassRoom have been deleted', 'Success');
            this.getCategoryList();
            this.onReset();
            this.modalService.dismissAll();
          }
        });
      } (err) => {
          this.toaster.error('Failed to delete class', 'Failure');
      }
    })
  }

  redirectFunc() {
    this.router.navigate(['service/personalclass']);
    this.modalService.dismissAll();
  }


}

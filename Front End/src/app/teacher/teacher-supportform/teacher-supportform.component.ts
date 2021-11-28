import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SUPPORTs } from 'src/app/admin/ad-supportform/ad-supportform';
import { AppGlobals } from 'src/app/app-variable';
import { validationUtil } from 'src/shared/validation.util';
import Swal from 'sweetalert2';
import { TeacherSupportformService } from './teacher-supportform.service';

@Component({
  selector: 'app-teacher-supportform',
  templateUrl: './teacher-supportform.component.html',
  styleUrls: ['./teacher-supportform.component.css']
})
export class TeacherSupportformComponent implements OnInit {

  constructor(private supportService: TeacherSupportformService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private globalMemor :AppGlobals) { }



  supportOption = [
    { name: "Change Class", id: "Change Class" },
    { name: "Schedule An Exam", id: "Schedule An Exam" },
    { name: "Account Problem", id: "Account Problem" },
    { name: "Feedback", id: "Feedback" },
    { name: "Others", id: "Others" }
  ]

  layoutStatus = 1;

  id: any;
  year = 2021;
  pageNum = 1;
  pageSize = 10;
  searchKey = this.globalMemor.currentUsername;

  username = this.globalMemor.currentUsername;;

  yearBefore = new Date().getFullYear() + 1;

  supportList = [];
  yearList: string[] = [];
  totalElements: any;

  submitBtnName = 'Send Form';

  updated = false;
  submitted = false;

  supportForm: FormGroup;

  idmemor: any;

  utils: any = validationUtil


  ngOnInit(): void {

    this.supportForm = this.formBuilder.group({
      username: this.username,
      options: [''],
      descriptions: [''],
      reply: [''],
      year: [this.yearList[0], Validators.required]
    })

    this.makeYearList();
    this.getCategoryList();
  }

  get f() {
    return this.supportForm.controls;
  }

  onReset() {
    this.updated = false;
    this.submitted = false;
    this.supportForm.reset();
  }

  getCategoryList() {
    this.supportService.getCategoryList(this.pageNum, this.pageSize, this.year, this.searchKey).subscribe(data => {
      if (data) {
        this.supportList = data.content;
        this.totalElements = data.totalElements;
      }
    })
  }

  makeYearList() {
    for (let i = 0; i < 7; i++) {
      this.yearList.push(this.yearBefore.toString());
      this.yearBefore--;
    }
  }

  createLayout() {
    this.supportForm.reset();
    this.layoutStatus = 1;
    this.updated = false;
    this.submitted = false;
    this.submitBtnName = 'Send Form';
  }

  viewInfo(item: SUPPORTs) {
    if (item) {
      this.layoutStatus = 2;
      this.updated = true;
      this.idmemor = item.id;
      this.id = item.id;
      this.submitBtnName = 'Update'
      this.supportForm.patchValue(item);
    }
  }

  onSubmit(body: SUPPORTs) {
    this.submitted = true;

    if (this.supportForm.invalid) {
      return;
    }

    if (this.updated) {
      this.supportService.updateCategory(this.id, body).subscribe(data => {
        if (data) {
          this.toastr.success('Reply has sent', 'Success');
          this.getCategoryList();
        } else {
          this.toastr.error('Faculty update process have an error', 'Failure');
          this.onReset();
        }
      })
    } else {
      this.supportService.createNewCategory(body).subscribe(data => {
        if (data) {
          this.toastr.success('Support has sent', 'Success');
          this.onReset();
          this.getCategoryList();
        } else {
          this.toastr.error('Form creation process have an error', 'Failure');
          this.onReset();
        }
      })
    }
  }

  deleteCategory(item: SUPPORTs) {
    item = this.supportList.find(x => x.id == this.idmemor);
    const textConfirm = '<span style="color: #ff0000;">Warning : Deleted data cannot be recovered</span>';
    Swal.fire({
      title: '<span style="color: #2d8dc7;"> DO YOU REALLY WANT TO DELETE THIS FAULTY <strong style="color: #f1556c; font-weight:bold;">' + '</strong> ?</span>',
      html: textConfirm,
      imageHeight: 150,
      imageWidth: 320,
      imageClass: 'img-responsive',
      animation: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.value) {
        this.supportService.deleteCategory(item.id).subscribe(data => {
          if (data) {
            this.toastr.success('Faculty information delete successfully', 'Success');
            this.getCategoryList();
            this.onReset();
            this.modalService.dismissAll();
          }
        }, (err) => {
          this.toastr.error('Failed to delete faculty information', 'Failure');
        });
      }
    })
  }

}


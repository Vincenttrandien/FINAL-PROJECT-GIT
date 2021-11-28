import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { validationUtil } from 'src/shared/validation.util';
import { HOMEPAGE } from './home-page';
import { HomePageformService } from './home-pageform.service';

@Component({
  selector: 'app-home-pageform',
  templateUrl: './home-pageform.component.html',
  styleUrls: ['./home-pageform.component.css']
})
export class HomePageformComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private homepageService: HomePageformService) { }


  contactOption = [
    { name: "Course Information", id: "Course Information" },
    { name: "Collaboration", id: "Collaboration" },
    { name: "Recruitment", id: "Recruitment" },
    { name: "Others", id: "Others" }
  ]


  layoutStatus = 1;

  id: any;
  year = 2021;
  pageNum = 1;
  pageSize = 10;
  keyword = "";

  yearBefore = new Date().getFullYear() + 1;

  homepageList = [];
  yearList: string[] = [];
  totalElements: any;

  submitBtnName = 'Send';

  updated = false;
  submitted = false;

  homepageForm: FormGroup;

  idmemor: any;

  utils: any = validationUtil


  ngOnInit(): void {

    this.homepageForm = this.formBuilder.group({
      name: [''],
      email: ['', [Validators.required, Validators.maxLength(this.utils.CODE_MAXLENGTH)]],
      phoneNumber: [''],
      options: [''],
      year: [this.yearList[0], Validators.required],
      description: [''],

    })

    this.makeYearList();
    this.getCategoryList();
  }

  get f() {
    return this.homepageForm.controls;
  }

  onReset() {
    this.updated = false;
    this.submitted = false;
    this.homepageForm.reset();
  }

  getCategoryList() {
    this.homepageService.getCategoryList(this.pageNum, this.pageSize, this.year, this.keyword).subscribe(data => {
      if (data) {
        this.homepageList = data.content;
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
    this.homepageForm.reset();
    this.layoutStatus = 1;
    this.updated = false;
    this.submitted = false;
    this.submitBtnName = 'Add';
  }

  viewInfo(item: HOMEPAGE) {
    if (item) {
      this.layoutStatus = 2;
      this.updated = true;
      this.idmemor = item.id;
      this.id = item.id;
      this.submitBtnName = 'Update'
      this.homepageForm.patchValue(item);
    }
  }

  onSubmit(body: HOMEPAGE) {
    this.submitted = true;

    if (this.homepageForm.invalid) {
      return;
    }

    if (this.updated) {
      this.homepageService.updateCategory(this.id, body).subscribe(data => {
        if (data) {
          this.toastr.success('Update faculty information successfully', 'Success');
          this.getCategoryList();
        } else {
          this.toastr.error('Faculty update process have an error', 'Failure');
          this.onReset();
        }
      })
    } else {
      this.homepageService.createNewCategory(body).subscribe(data => {
        if (data) {
          this.toastr.success('Send successfully', 'Success');
          this.onReset();
          this.getCategoryList();
        } else {
          this.toastr.error('Faculty creation process have an error', 'Failure');
          this.onReset();
        }
      })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ACCOUNTs } from 'src/app/admin/ad-accounts/ad-accounts';
import { AppGlobals } from 'src/app/app-variable';
import { ServicePersonalclassService } from './service-personalclass.service';

@Component({
  selector: 'app-service-personalclass',
  templateUrl: './service-personalclass.component.html',
  styleUrls: ['./service-personalclass.component.css']
})
export class ServicePersonalclassComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private personalSerivce: ServicePersonalclassService,
    private globalMemor : AppGlobals) { }


    data : any;
    
    id: any;
    year = 2021;
pageNum = 1;
maxSize = 5;
pageSize = 10;
searchKey = this.globalMemor.currentUsername;
totalElements: number;


yearList : string[] = [];
yearBefore = new Date().getFullYear()+1;

updated = false;
submitted = false;

accountForm: FormGroup;
accountMentorForm: FormGroup;

btnSubmitName = 'Create';

classList = [];
accountList=[];
mentorList=[];




dataa: any



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
      
      
      retypePassword : [''],
      roles : [],
    })

    this.accountMentorForm = this.formBuilder.group({
      name: [''],
      email : [''],
      phoneNumber :  [''],
      major :  [''],
    })

    this.getCategoryList();
    this.getAccountList();
  }

  onPageChange(pageNum: number) {
    this.pageNum = pageNum;
    this.getCategoryList();
  }

  onPageSizeChange(pageSize: number) {
      this.pageSize = pageSize;
      this.getCategoryList();
  }

  getCategoryList(){
    this.personalSerivce.getCategoryList(this.pageNum, this.pageSize, this.year, this.searchKey).subscribe( data => {
      if ( data ){
        this.classList = data.content;
        this.totalElements = data.totalElements;
      }
    })
  }

  getAccountList(){
    this.personalSerivce.getAccountList(this.pageNum, this.pageSize, this.year, this.searchKey).subscribe( data => {
      if ( data ){
        this.accountList = data.content;
        this.totalElements = data.totalElements;
      }
    })
  }

  onReset(){
    this.updated = false;
    this.submitted = false;
    this.accountForm.reset();
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


  mentorModal(item : any, view: any) {
    console.log(item);
    this.personalSerivce.getAccountList(this.pageNum, this.pageSize, this.year , item).subscribe(data =>{
      
      if(data){
        this.mentorList = data.content;
        // this.dataa = this.mentorList[0]
        this.accountMentorForm.patchValue(this.mentorList[0])

      }
    })

    this.modalService.open(view, { size: 'lg', centered: true })

  }

  closeModal(){
    this.btnSubmitName = 'Create';
    this.modalService.dismissAll();
  }







}


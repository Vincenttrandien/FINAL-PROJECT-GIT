import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCOUNTs } from 'src/app/admin/ad-accounts/ad-accounts';
import { CLASSROOM } from 'src/app/admin/ad-classrooms/ad-classrooms';
import { CommandURL } from 'src/shared/manageURL';
import { PagingResponse } from 'src/shared/paging-response';

@Injectable({
  providedIn: 'root'
})
export class TeacherPersonalclassService {

  constructor(private http : HttpClient) { }

  findById(id: any){
    return this.http.get<any>(CommandURL.CLASSROOM + '/' + id);
  }

  getCategoryList(pageNum: number, pageSize: number, year: number,  searchKey: string) : Observable<PagingResponse<CLASSROOM>>{
    const params = new HttpParams() .set('pageNumber', pageNum.toString())
                                    .set('pageSize', pageSize.toString())
                                    .set('year', year.toString())
                                    .set('searchKey', searchKey)
    return this.http.get<PagingResponse<CLASSROOM>>(CommandURL.CLASSROOM + 'searchByKey/' , {params, headers: {'Content-Type': 'application/json'}})
  }

  getAccountList(pageNum: number, pageSize: number, year: number,  searchKey: string) : Observable<PagingResponse<ACCOUNTs>>{
    const params = new HttpParams() .set('pageNumber', pageNum.toString())
                                    .set('pageSize', pageSize.toString())
                                    .set('year', year.toString())
                                    .set('searchKey', searchKey)
    return this.http.get<PagingResponse<ACCOUNTs>>(CommandURL.ACCOUNTS + '/searchByKey/' , {params, headers: {'Content-Type': 'application/json'}})
  }



}

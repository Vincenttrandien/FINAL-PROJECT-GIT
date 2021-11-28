import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandURL } from 'src/shared/manageURL';
import { PagingResponse } from 'src/shared/paging-response';
import { SUPPORTs } from './ad-supportform';

@Injectable({
  providedIn: 'root'
})
export class AdSupportformService {

  constructor(private http : HttpClient) { }



  getCategoryList(pageNum: number, pageSize: number, year: number,  searchKey: string) : Observable<PagingResponse<SUPPORTs>>{
    const params = new HttpParams() .set('pageNumber', pageNum.toString())
                                    .set('pageSize', pageSize.toString())
                                    .set('year', year.toString())
                                    .set('searchKey', searchKey)
    return this.http.get<PagingResponse<SUPPORTs>>(CommandURL.SUPPORT + 'searchByKey/' , {params, headers: {'Content-Type': 'application/json'}})
  }


  updateCategory(id: string, body: SUPPORTs){
    return this.http.put<SUPPORTs>(CommandURL.SUPPORT + '' + id, body);
  }

  deleteCategory(id: string){
    return this.http.delete<SUPPORTs>(CommandURL.SUPPORT + '' + id);
  }

  findById(id: any){
    return this.http.get<any>(CommandURL.CONTACTS + '' + id);
  }
}


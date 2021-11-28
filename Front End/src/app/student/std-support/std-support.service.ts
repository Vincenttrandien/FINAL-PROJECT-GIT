import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SUPPORTs } from 'src/app/admin/ad-supportform/ad-supportform';
import { CommandURL } from 'src/shared/manageURL';
import { PagingResponse } from 'src/shared/paging-response';

@Injectable({
  providedIn: 'root'
})
export class StdSupportService {

  constructor(private http : HttpClient ) { }

  getCategoryList(pageNum: number, pageSize: number, year: number, searchKey: any) : Observable<PagingResponse<SUPPORTs>>{
    const params = new HttpParams () .set('pageNumber', pageNum.toString())
                                     .set('pageSize', pageSize.toString())
                                     .set('year', year.toString())
                                     .set('searchKey', searchKey)
    return this.http.get<PagingResponse<SUPPORTs>>(CommandURL.SUPPORT + 'searchByKey', {params, headers: {'Content-Type': 'application/json'}})
  }

  createNewCategory( body : SUPPORTs ){
    return this.http.post<any>(CommandURL.SUPPORT + 'create' , body);
  }

  updateCategory ( id : any , body : SUPPORTs ) {
    return this.http.put<any>(CommandURL.SUPPORT + id, body);
  }

  deleteCategory ( id : string ) {
    return this.http.delete<SUPPORTs>(CommandURL.SUPPORT + id);
  }

  findCategory (id : any) {
    return this.http.get<any>(CommandURL.SUPPORT + id);
  }

}

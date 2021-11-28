import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONTACTs } from 'src/app/admin/ad-contactform/ad-contactform';
import { CommandURL } from 'src/shared/manageURL';
import { PagingResponse } from 'src/shared/paging-response';

@Injectable({
  providedIn: 'root'
})
export class ServiceContactService {

  constructor(private http : HttpClient) { }

  getCategoryList(pageNum: number, pageSize: number, year: number,  searchKey: string) : Observable<PagingResponse<CONTACTs>>{
    const params = new HttpParams() .set('pageNumber', pageNum.toString())
                                    .set('pageSize', pageSize.toString())
                                    .set('year', year.toString())
                                    .set('searchKey', searchKey)
    return this.http.get<PagingResponse<CONTACTs>>(CommandURL.CONTACTS + 'searchByKey/' , {params, headers: {'Content-Type': 'application/json'}})
  }



  deleteCategory(id: string){
    return this.http.delete<CONTACTs>(CommandURL.CONTACTS + '' + id);
  }

  findById(id: any){
    return this.http.get<any>(CommandURL.CONTACTS + '' + id);
  }
}

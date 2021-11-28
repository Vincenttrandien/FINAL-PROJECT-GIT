import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandURL } from 'src/shared/manageURL';
import { PagingResponse } from 'src/shared/paging-response';
import { HOMEPAGE } from './home-page';


@Injectable({
  providedIn: 'root'
})
export class HomePageformService {

  constructor(private http : HttpClient) { }


  getCategoryList(pageNum: number, pageSize: number, year: number, keyword: any) : Observable<PagingResponse<HOMEPAGE>>{
    const params = new HttpParams () .set('pageNumber', pageNum.toString())
                                     .set('pageSize', pageSize.toString())
                                     .set('year', year.toString())
                                     .set('keyword', keyword)
    return this.http.get<PagingResponse<HOMEPAGE>>(CommandURL.CONTACTS + 'getAll', {params, headers: {'Content-Type': 'application/json'}})
  }

  updateCategory ( id : any , body : HOMEPAGE ) {
    return this.http.put<any>(CommandURL.CONTACTS + id, body);
  }

  createNewCategory( body : HOMEPAGE ){
    return this.http.post<any>(CommandURL.CONTACTS + 'create' , body);
  }
}

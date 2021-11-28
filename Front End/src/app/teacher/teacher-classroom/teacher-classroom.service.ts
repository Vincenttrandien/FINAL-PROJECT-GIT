import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLASSROOM } from 'src/app/admin/ad-classrooms/ad-classrooms';
import { CommandURL } from 'src/shared/manageURL';
import { PagingResponse } from 'src/shared/paging-response';

@Injectable({
  providedIn: 'root'
})
export class TeacherClassroomService {

  constructor(private http : HttpClient) { }

  getCategoryList(pageNum: number, pageSize: number, year: number, searchKey: any):Observable<PagingResponse<CLASSROOM>>{
    const params = new HttpParams() .set('pageNumber', pageNum.toString())
                                    .set('pageSize', pageSize.toString())
                                    .set('year', year.toString())
                                    .set('searchKey', searchKey)
    return this.http.get<any>(CommandURL.CLASSROOM + 'searchByKey' ,{params, headers : {'Content-Type':'application/json'}});
  }

  findById(id: string){
    return this.http.get<any>(CommandURL.CLASSROOM + id);
  }

  createNewCategory(body: CLASSROOM){
    return this.http.post<any>(CommandURL.CLASSROOM + 'create' , body , {headers : {'Content-Type':'application/json'}});
  }

  updateCategory(id: string, body: CLASSROOM){
    return this.http.put<any>(CommandURL.CLASSROOM + id , body);
  }

  deleteCategory(id: string){
    return this.http.delete<any>(CommandURL.CLASSROOM + id);
  }
}

import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Customer } from '../dto/Customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl=`${environment.baseURL}/customers`;
  private httpClient = inject(HttpClient);

  saveCustomer(data: Customer):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}`, data);
  }

  updateCustomer(id:string, data: Customer):Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/${id}`, data);
  }

  deleteCustomer(id:string):Observable<any>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  getCustomer(id:string):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  getAllCustomers(searchText:string, page: number, size:number):Observable<any>{
    let params = new HttpParams()
    .set('searchText', searchText)
    .set('page', page)
    .set('size',size);
    return this.httpClient.get(`${this.baseUrl}`, { params });
  }

  findAll():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/list`);
  }

}

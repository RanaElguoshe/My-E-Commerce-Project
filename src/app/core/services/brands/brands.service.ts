import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpClient:HttpClient) { }
 gerAllBrands():Observable<any>{
  return  this.httpClient.get(`${environment.base_url}/api/v1/brands`);
 }
}

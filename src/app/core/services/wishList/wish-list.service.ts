import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private httpClient:HttpClient) { }
  heartList:WritableSignal<any[]>=signal([])
  

   addWishList(id:string|null):Observable<any>{
      return this.httpClient.post(`${environment.base_url}/api/v1/wishlist`,
        {
          "productId": id
      }

      )
     }
     whishList():Observable<any>{
      return this.httpClient.get(`${environment.base_url}/api/v1/wishlist`)}
     removeWishList(id:string):Observable<any>{
      return this.httpClient.delete(`${environment.base_url}/api/v1/wishlist/${id}`)
}
}

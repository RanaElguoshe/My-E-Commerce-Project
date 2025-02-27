import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnlinepaymentService {


  constructor(private httpClient:HttpClient) { }
  myTohen:any=localStorage.getItem('userToken')


  sendOnlineDetails(id:string,data:Object):Observable<any>{
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        "shippingAddress":data
      },
      {
        headers:{
          token:this.myTohen
        }
      }    
    )
  
  }

  sendPaymentDetails(id:string,data:Object):Observable<any>{
    return this.httpClient.post(`${environment.base_url}/api/v1/orders/${id}`,
      {
        "shippingAddress":data
      }   
    )

  
  }
}

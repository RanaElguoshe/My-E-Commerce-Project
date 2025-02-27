import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  id=inject(PLATFORM_ID)
  private router=inject(Router)
  
userData:any=null;
  constructor(private httpClient:HttpClient){}
  sendData(data:Object):Observable<any>{
    return this.httpClient.post(`${environment.base_url}/api/v1/auth/signup`,data);
  }
  login(data:Object):Observable<any>{
    return this.httpClient.post(`${environment.base_url}/api/v1/auth/signin`,data);
  }
  saveUserData():void{
   
    if(isPlatformBrowser(this.id)){
    if(localStorage.getItem('userToken')!==null){
      this.userData=jwtDecode(localStorage.getItem('userToken')!)
      console.log( this.userData);
    }
  }
  }
  
 logOut():void{
  localStorage.removeItem('userToken');
  this.router.navigate(['/login']);
    this.userData=null;
 }

 setVerifyEmail(data:Object):Observable<any>{
  return this.httpClient.post(`${environment.base_url}/api/v1/auth/forgotPasswords` ,data)
 }
 setVerifyCode(data:Object):Observable<any>{
  return this.httpClient.post(`${environment.base_url}/api/v1/auth/verifyResetCode` ,data)
 }
 setVerifyPassword(data:Object):Observable<any>{
  return this.httpClient.put(`${environment.base_url}/api/v1/auth/resetPassword` ,data)
 }
}


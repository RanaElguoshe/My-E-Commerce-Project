import { Component, inject, PLATFORM_ID } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators}from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isloading:boolean=false;
    errMessage:string="";
    success:string=""
    private readonly authservice=inject(AuthService)
    private readonly router=inject(Router)
  
    loginForm:FormGroup=new FormGroup({
     
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)])});
  
    login():void{
    
     if(this.loginForm.valid){
      this.isloading=true;
        this.authservice.login(this.loginForm.value).subscribe({
          next:(res)=>{
            this.isloading=false;
            if(res.message=='success'){
              setTimeout(()=>{localStorage.setItem('userToken',res.token),this.router.navigate(['/home']);},500)
              console.log(res.token)
              console.log("locallllllllll " +localStorage.setItem('userToken',res.token))           
               this.success=res.message;              
             }
        }   
        })
     }
  
      console.log(this.loginForm)
  
    }

}

import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);

  isLoading:boolean=false;
  step:number=1;
  verifyEmail:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  });

  verifyCode:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6}$/)])

  });
  verifyNewPssword:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{5,}$/)])
  });


  submitVerifyEmail():void{
 if(this.verifyEmail.valid){
  this.isLoading=true;
  this.authService.setVerifyEmail( this.verifyEmail.value).subscribe({
    next:(res)=>{
      this.isLoading=false;
      if(res.statusMsg=='success'){
        let initEmail=this.verifyEmail.get('email')?.value;
        this.verifyNewPssword.get('email')?.patchValue(initEmail);
        console.log(res)
        this.step=2;
      }
    }
  })
 }
  }

  submitVerifyCode():void{
    if(this.verifyCode.valid){
      this.isLoading=true;
         this.authService.setVerifyCode( this.verifyCode.value).subscribe({
      next:(res)=>{
        this.isLoading=false;
      if(res.status=='Success'){
          console.log(res);
          // this.initEmail=this.verifyEmail.value;
          this.step=3;
      }
      }
    })

    }

  }
  submitVerifyNewPassword():void{
    if(this.verifyNewPssword.valid){
      this.isLoading=true;
         this.authService. setVerifyPassword( this. verifyNewPssword.value).subscribe({
      next:(res)=>{
        this.isLoading=false;
        localStorage.setItem('userToken',res.token);
        this.authService.saveUserData();
        this.router.navigate(['/home']);    
         
      
      } 
    
    })

    }

  }
  

}

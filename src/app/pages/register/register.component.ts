import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators}from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isloading:boolean=false;
  errMessage:string="";
  success:string=""
  private readonly authservice=inject(AuthService)
  private readonly router=inject(Router)

  registerForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]),
    rePassword:new FormControl(null,Validators.required),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  },{validators:this.confirmPassword});

  submitForm():void{
    if(this. registerForm.valid){
      this.isloading=true;
        this.authservice.sendData(this. registerForm.value).subscribe({
          next:(res)=>{
            this.isloading=false;
            console.log(res);
          if(res.message=='success'){
           setTimeout(()=>{this.router.navigate(['/login']);},500)
            this.success=res.message;
  
          }
        },
        error:(err)=>{
          this.isloading=false;
          this.errMessage=err.error.message;   
         console.log( this.errMessage)
        }        
        })
     }
     else{
      this.registerForm.markAllAsTouched();
     }

    //console.log(this.registerForm)

  }

  confirmPassword(groub:AbstractControl){
    const password=groub.get('password')?.value;
    const rePassword=groub.get('rePassword')?.value;
    return password==rePassword ? null:{mismatch:true}
  }
}

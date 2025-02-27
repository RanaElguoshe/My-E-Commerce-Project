import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnlinepaymentService } from '../../core/services/onlinepayment/onlinepayment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cash',
  imports: [ReactiveFormsModule],
  templateUrl: './cash.component.html',
  styleUrl: './cash.component.css'
})
export class CashComponent {
    private readonly activatedRoute = inject(ActivatedRoute)
      private readonly onlinepaymentService = inject(OnlinepaymentService)
      cashForm!: FormGroup;
      id: string = '';
  
      initForm():void{
        this.cashForm= new FormGroup({
          details: new FormControl(null, [Validators.required]),
          phone: new FormControl(null, [Validators.required]),
          city: new FormControl(null, [Validators.required])
        });
      }
      getUrlId(): void {
        this.activatedRoute.paramMap.subscribe({
          next: (res) => {
            this.id = res.get('id')!
            console.log(res.get('id'))
          },
      
        })
      }
      ngOnInit(): void {
        this.initForm();
        this.getUrlId();  
        console.log(        this.cashForm.value
        ) 
      }

    
      sendDetails():void{
        this.onlinepaymentService.sendPaymentDetails(this.id,this.cashForm.value).subscribe({
          next: (res) => {
            console.log(res)  
         
          }
  
        })
      }

}

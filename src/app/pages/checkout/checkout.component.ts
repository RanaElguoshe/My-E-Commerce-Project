import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OnlinepaymentService } from '../../core/services/onlinepayment/onlinepayment.service';
import { error } from 'console';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly onlinepaymentService = inject(OnlinepaymentService)
  checkoutForm!: FormGroup;
  id: string = '';
  ngOnInit(): void {
    this.initForm()
    this.getUrlId();  
  }
  initForm():void{
    this.checkoutForm = new FormGroup({
      details: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
    });
  }

  getUrlId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.id = res.get('id')!
        // console.log(res.get('id'))
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  submitPaymentInfo(): void {
    this.onlinepaymentService.sendOnlineDetails(this.id, this.checkoutForm.value).subscribe({
      next: (res) => {
        console.log(res)
        if(res.status=='success'){
          open(res.session.url,'_self')
         }
      }
    })
  }

}

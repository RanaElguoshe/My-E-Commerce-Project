import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
private readonly cartService=inject(CartService);
 private readonly router=inject(Router)

cartdatails:ICart={} as ICart

displayserCart():void{
this.cartService.getUserCart().subscribe({
  next:(res)=>{
    this.cartdatails=res.data
    // console.log( this.cartdatails)
        },
        error:(err)=>{
    console.log(err)
        }
})
}
removeCart(id:string){
  this.cartService.removeSpecificCart(id).subscribe({
    next:(res)=>{
      this.cartService.numOfCart.set(res.numOfCartItems)
      this.cartdatails=res.data
    // console.log( res)
          },
      error:(err)=>{
      console.log(err)
          }
  })

}
UpdateCart(id:string,count:number):void{
  this.cartService.UpdateCartQuantity(id,count).subscribe({
    next:(res)=>{
      this.cartService.numOfCart.set(res.numOfCartItems)
      // console.log( res)
      this.cartdatails=res.data
     
          },
      error:(err)=>{
      console.log(err)
          }

  })

}
ClearAllCarts():void{
  this.cartService.clearUserCart().subscribe({
    next:(res)=>{
      this.cartService.numOfCart.set(0)
      console.log( res)
if(res.message=='success'){
  this.cartdatails={} as ICart

} }
  })
}
// sss():void{
//   console.log(this.cartdatails._id);
// }
ngOnInit(): void {
  this.displayserCart();
}

}

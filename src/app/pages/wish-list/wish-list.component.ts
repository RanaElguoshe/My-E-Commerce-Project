import { Component, computed, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit{
private readonly wishListService=inject(WishListService)
wishListarray:any={}
private readonly cartService=inject(CartService);
 

ngOnInit(): void {
  this.displayList()
}
displayList():void{
  this.wishListService.whishList().subscribe({
    next:(res)=>{
      //console.log(res)
      this.wishListService.heartList.set(res.data)
      console.log( this.wishListService.heartList())
      this.wishListarray=res
    }
   })
}  
removeWishList(id:string):void{
    this.wishListService.removeWishList(id).subscribe({
      next:(res)=>{
        console.log("removed done", res)
        this.displayList()
        //this.wishListarray=res
      }
     })

}
addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
   next:(res)=>{
    console.log("added done",res)
    this.cartService.numOfCart.set(res.numOfCartItems)
   }
})
}

    

}

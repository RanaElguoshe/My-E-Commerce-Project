import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from '../../core/services/products/products.service';
import { SearchDataPipe } from '../../shared/pipes/search-data.pipe';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [SearchDataPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  text:string=''
    products:IProduct[]=[];  
     private readonly toastrService=inject(ToastrService)
    
    private readonly productsService=inject(ProductsService);
    private readonly cartService=inject(CartService);

    
    getProduct(){
      this.productsService.getProducts().subscribe({
        next:(res)=>{
          // console.log(res.data)
          this.products=res.data  
        }
      })
    }
ngOnInit(): void {
  this.getProduct();
}
addToCart(id:string):void{
this.cartService.addProductToCart(id).subscribe({
  next:(res)=>{
    console.log( "new data in product page ",res)
    this.cartService.numOfCart.set(res.numOfCartItems)
    this.toastrService.success(res.message, 'Fresh Cart !');

  }
})
}
}

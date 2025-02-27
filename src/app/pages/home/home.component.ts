import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wishList/wish-list.service';


@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  products:IProduct[]=[];
  categories:ICategory[]=[]
 private readonly productsService=inject(ProductsService)
 private readonly categoriesService=inject(CategoriesService)
 private readonly cartService=inject(CartService)
 private readonly toastrService=inject(ToastrService)
myId:string=''
color:string="";
private readonly wishListService=inject(WishListService)
gettingWishList(id:string):void{
  this.wishListService. addWishList(id).subscribe({
    next:(res)=>{
      console.log("wishhhhhhhhhhhhhhhhhh",res.data)
      if(res.status=='success'){
        this.myId=id;
    
      }
    }
  })
 

}
getProduct(){
    this.productsService.getProducts().subscribe({
    next:(res)=>{
      // console.log(res.data)
      this.products=res.data
      this.color="red"


    }

  })
}
getCategories(){

  this.categoriesService.getAllCategories().subscribe({
    next:(res)=>{
      this.categories=res.data
      // console.log(this.categories)

    }


  })

}
ngOnInit(): void {
  this.getProduct();
  this.getCategories()
  console.log("in homeeeeeeeeee",this.wishListService.heartList())
}
customOptions1: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  autoplay:true,
  autoplayTimeout:700,
  autoplayHoverPause:true,
  dots: false,
  navSpeed: 10000,
  navText: ['', ''],
 items:1,
  nav: true
}
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  autoplay:true,
  autoplayTimeout:1000,
  autoplayHoverPause:true,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}

addToCart(id:string):void{
  this.cartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res)
    if(res.status=='success'){
    this.cartService.numOfCart.set(res.numOfCartItems)
    
        this.toastrService.success(res.message, 'Fresh Cart !');
    }
    }

  })
}
changeColor():void{
  this.color="red"
}
}

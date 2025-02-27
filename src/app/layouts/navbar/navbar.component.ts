import { Component, computed, inject, Input, input, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  @Input()isLogin:boolean=true
  counter:Signal<number>=computed(()=>this.cartService.numOfCart())
  private readonly out=inject(AuthService);
  private readonly cartService=inject(CartService);

  loggingOut():void{
    this.out.logOut();
    
  }
  ngOnInit(): void {
    this.cartService.getUserCart().subscribe({
      next:(res)=>{
        console.log("'cartitems'", res)
        this.cartService.numOfCart.set(res.numOfCartItems)
    
      }
    })

    
  }

}

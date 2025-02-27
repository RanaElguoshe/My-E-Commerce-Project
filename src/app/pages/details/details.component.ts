import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly productDetail=inject(ProductsService)
  detailsProduct:IProduct={} as IProduct
 
ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe({
    next:(url)=>{
      console.log(url.get('id'))
      let idDetail=url.get('id')
      this.productDetail.getProductsDetail(idDetail).subscribe({
        next:(detail)=>{
          console.log(detail.data)
          this.detailsProduct=detail.data;
          console.log("done")
      
        }
      })
    }
  })
}
}

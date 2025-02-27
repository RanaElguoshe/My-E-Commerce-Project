import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Brands } from '../../shared/interfaces/brands';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit{
  private readonly brandsService=inject(BrandsService);
 Allbrands:Brands[]=[]
  ngOnInit(): void {


    this.brandsService.gerAllBrands().subscribe({
      next:(res)=>{
        this.Allbrands=res.data;
        console.log(this.Allbrands)

      }
    })
  }

}

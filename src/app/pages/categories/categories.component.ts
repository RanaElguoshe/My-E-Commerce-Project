import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
private readonly category=inject(CategoriesService);

categories:ICategory[]=[];

ngOnInit():void{
  this.category.getAllCategories().subscribe({
    next:(res)=>{
      this.categories=res.data
      console.log(this.categories)
    }
  

  })
}
  

}


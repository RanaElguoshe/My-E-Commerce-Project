import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchData',
  standalone:true
})
export class SearchDataPipe implements PipeTransform {

  transform(productData:any[], searchWord:string): any[]{
    return productData.filter( (item)=>item.title.toLowerCase().includes(searchWord.toLowerCase()) );
  }

}

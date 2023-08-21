import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }


//get all products
  getProductsFromApi(){
  // return this.http.get('https://fakestoreapi.com/products')
  return this.http.get(environment.baseApi + 'products')
  }

//get all categories
  getCategoriesFromApi(){
    return this.http.get(environment.baseApi + 'products/categories')
    }

//get products by category name
  getProductsByCategoryFromApi(catName:string){
    return this.http.get(environment.baseApi + 'products/category/' + catName)
}


getProductByIdFromApi(id:any){
  return this.http.get(environment.baseApi + 'products/' + id)
}

}

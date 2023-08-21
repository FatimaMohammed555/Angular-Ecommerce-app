import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

products: any[] = [];
categories: any[] = [];
loading:boolean = false;
cartProduct:any[] = [];

  constructor(private serv:ProductsService) { }

  ngOnInit(): void {
  this.getProducts();
  this.getCategories();
  }

getProducts(){
this.loading= true;
this.serv.getProductsFromApi().subscribe((res:any) => {
this.products = res;
this.loading= false;
console.log(res);
})
}

getCategories(){
  this.loading= true;
  this.serv.getCategoriesFromApi().subscribe((res:any) => {
    console.log(res);
  this.categories = res;
  this.loading= false;
  })
  }

filterCategory(event:any){
    let value = event.target.value;
    console.log(value);
if(value == 'all'){
  this.getProducts()
}else{
  this.getProdByCatName(value);
}
  }

getProdByCatName(CatName:string){
  this.loading= true;
this.serv.getProductsByCategoryFromApi(CatName).subscribe((res:any) => {
console.log(res);
this.products = res;
this.loading= false;
})
}

//JSON.stringify()used when send data to Localstorage
//JSON.parse()used when Recieve data from localstorage

addToCart(event:any){
console.log(event);
if("cart" in localStorage){
//recieve data from localStorage and save it in array[cartProduct]
this.cartProduct = JSON.parse(localStorage.getItem("cart")!)
let exist=this.cartProduct.find(item => item.item.id == event.item.id)
if (exist) {
alert("Product is already in your cart")
}else{
//push data to array[cartProduct]
this.cartProduct.push(event);
//send data from array[cartProduct] to localStorage
localStorage.setItem("cart" , JSON.stringify(this.cartProduct));
}
  }else{
    this.cartProduct.push(event);
    localStorage.setItem("cart" , JSON.stringify(this.cartProduct));
  }
}


}

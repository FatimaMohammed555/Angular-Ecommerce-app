import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProduct:any[]= [];
  total:number=0;
  success:boolean = false;


  constructor(private serv:CartsService) { }

  ngOnInit(): void {
this.getCartProducts();
  }

getCartProducts(){
  if("cart" in localStorage){
    //recieve data from localStorage and save it in array[cartProduct]
    this.cartProduct = JSON.parse(localStorage.getItem("cart")!)
}
console.log(this.cartProduct);
this.getCartTotal();
}

getCartTotal(){
this.total=0;
for (let x in this.cartProduct) {
  this.total +=this.cartProduct[x].item.price * this.cartProduct[x].quantity;
    }

}

addAmount(index:number){
this.cartProduct[index].quantity++;
this.getCartTotal();
localStorage.setItem("cart" , JSON.stringify(this.cartProduct));

}


minsAmount(index:number){
  this.cartProduct[index].quantity--;
  this.getCartTotal();
  localStorage.setItem("cart" , JSON.stringify(this.cartProduct));
}


detectChanges(){
  this.getCartTotal();
  localStorage.setItem("cart" , JSON.stringify(this.cartProduct));
}


deleteProduct(index:number){
this.cartProduct.splice(index , 1);
this.getCartTotal();
localStorage.setItem("cart" , JSON.stringify(this.cartProduct));

}

clearCart(){
this.cartProduct=[];
this.getCartTotal();
localStorage.setItem("cart" , JSON.stringify(this.cartProduct));
}

addCart(){
let prod=this.cartProduct.map(item => {
return{productId:item.item.id , quantity:item.quantity}
})
let Model={
userId:5,
date:new Date(),
products:prod
};
this.serv.creatNewCart(Model).subscribe(res => {
this.success=true;
})
console.log(Model);
}

}

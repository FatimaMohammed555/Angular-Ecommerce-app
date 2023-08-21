import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

id: any;
data:any={};
loading:boolean = false;


  constructor(private route:ActivatedRoute , private serv:ProductsService) {
this.id=this.route.snapshot.paramMap.get("id");
console.log(this.id);
  }

  ngOnInit(): void {
this.getProductById();
  }

getProductById(){
  this.loading= true;
this.serv.getProductByIdFromApi(this.id).subscribe(res => {
this.data=res;
this.loading= false;

})
}


}

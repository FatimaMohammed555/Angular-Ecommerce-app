import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

//whensenddatafromparenttochilduse@Input()
@Input() data:any = {};

//to send data from child to parent use@Output()
@Output()item = new EventEmitter()
addButton:boolean = false;
amount:number =0;

  constructor() { }

  ngOnInit(): void {
  }

  add(){
this.item.emit({item:this.data , quantity:this.amount})
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  id: any;
  data: any
  cartCount: number = 0
  constructor(
    private _route: ActivatedRoute,
    private _cartService: CartService
  ) {
    this.id = this._route.snapshot.params
    console.log(this.id)
    this.data = this._cartService.selectedProduct
    this._cartService.cartCount.subscribe(val => {this.cartCount = val})

  }

  ngOnInit(): void {

  }

  addToCart() {
    this._cartService.addToCart(this.data)
    this._cartService.cart.subscribe(val => {
      console.log(val)
    })
  }

}

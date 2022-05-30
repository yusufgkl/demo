import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  inCart: any
  cartCount: number = 0
  constructor(
    private _cartService: CartService
  ) {
    this._cartService.cart.subscribe(val => {
      this.inCart = val
      this.cartCount = val.length
      console.log(val)
    })
  }

  ngOnInit(): void {
  }

  checkout() {
    console.log(this._cartService.selectedProduct)
    if (this._cartService.selectedProduct) {
      let id = this._cartService.selectedProduct.node.variants.edges[0].node.id
      this._cartService.createCheckout(id).subscribe((val: any) => {
        console.log(val)
        if (val.data.checkoutCreate.checkout.webUrl) {
          window.location = val.data.checkoutCreate.checkout.webUrl
        }
      })
    }
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CREATECHECKOUT } from 'src/app/pages/products/requests/ProductsRequest';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  selectedProduct: any
  cart: BehaviorSubject<any> = new BehaviorSubject([])
  cartCount: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor(
    private _http: HttpClient
  ) {

    this.cart.subscribe(val => {
      this.cartCount.next(val.length)
    })
    
  }
  // "gid://shopify/Product/6889435267209"

  addToCart(p: any) {
    let actual = this.cart.value
    actual.push(p)
    this.cart.next(actual)
  }

  encodeID(id: string) {
    return btoa(id)
  }

  createCheckout(id: string){
    console.log(CREATECHECKOUT(this.encodeID(id)))
    return this._http.post('https://yusufgkl.myshopify.com/api/2022-04/graphql.json',
      CREATECHECKOUT(this.encodeID(id)),
      {
        headers: new HttpHeaders()
        .set('Content-Type', 'application/graphql')
        .set('X-Shopify-Storefront-Access-Token', '008ffc38bbcb686bf5287bcaff95882c')
      })
  }
}

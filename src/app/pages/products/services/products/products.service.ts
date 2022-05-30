import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GETPRODUCTS } from '../../requests/ProductsRequest';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private _http: HttpClient
  ) { }

  getAllProducts(){
    return this._http.post('https://yusufgkl.myshopify.com/api/2022-04/graphql.json',
      GETPRODUCTS,
      {
        headers: new HttpHeaders()
        .set('Content-Type', 'application/graphql')
        .set('X-Shopify-Storefront-Access-Token', '008ffc38bbcb686bf5287bcaff95882c')
      })
  }
}

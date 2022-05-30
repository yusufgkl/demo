import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from './services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  allProducts: any[] = []
  cartCount:number = 0
  constructor(
    private _productsService: ProductsService,
    private _cartService: CartService,
    private _router: Router
  ) {
    this._cartService.cartCount.subscribe(val => {
      this.cartCount = val
    })
  }

  ngOnInit(): void {
    this._productsService.getAllProducts().pipe(tap((val:any) => this.allProducts = val.data.products.edges)).subscribe()
  }

  hover(mode: boolean, p: any, id: string){
    let url = ''
    if (mode === true) {
      url = p.node.images.edges[1].node.transformedSrc
    } else {
      url = p.node.images.edges[0].node.transformedSrc
    }
    return document.getElementById(id)!.style.content = `url(${url})`
  }

  openProduct(p:any) {
    this._cartService.selectedProduct = p
    this._router.navigateByUrl('/produit/' + p.node.id.split('/')[4])
  }


}

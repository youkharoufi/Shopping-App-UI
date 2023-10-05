import { Component, OnInit } from '@angular/core';
import { Product, ProductsFacade } from '@shopping-app-ui/store';

@Component({
  selector: 'shopping-app-ui-index',
  templateUrl: './index.component.html',
  styleUrls: [
    './index.component.css'
  ],
})
export class IndexComponent implements OnInit{

  products$ = this.productFacade.products$;
  products: Product[] = [];
  productsRow1: Product[] = [];
  productsRow2: Product[] = [];
  productsRow3: Product[] = [];
  productsRow4: Product[] = [];
  productsRow5: Product[] = [];


  constructor(private productFacade : ProductsFacade){}

  ngOnInit(): void{
    this.productFacade.getAllProducts();

    this.products$.subscribe({
      next:(products?:Product[])=>{
        if(products){
          this.products = products!;
          console.log(this.products);

          for(let i = 0; i<this.products?.length; i++){
            if(i<4){
              this.productsRow1?.push(this.products[i]);
            }

            if(i>= 4 && i<8){
              this.productsRow2?.push(this.products[i]);
            }

            if(i>= 8 && i<12){
              this.productsRow3?.push(this.products[i]);
            }

            if(i>= 12 && i<16){
              this.productsRow4?.push(this.products[i]);
            }

            if(i>= 16 && i<20){
              this.productsRow5?.push(this.products[i]);
            }
          }
        }

      }
    })


  }
}

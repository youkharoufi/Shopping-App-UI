import { filterProducts } from './../../../../../libs/store/src/lib/ProductsStore/products.actions';
import { MessageService } from 'primeng/api';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartFacade, Product, ProductsFacade } from '@shopping-app-ui/store';
import { Subject, take, takeUntil } from 'rxjs';
import { SearchPipe } from '../search-pipe.pipe';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'shopping-app-ui-index',
  templateUrl: './index.component.html',
  styleUrls: [
    './index.component.css'
  ],
})
export class IndexComponent implements OnInit {

  products$ = this.productFacade.products$;
  products: Product[] = [];
  productsRow1: Product[] = [];
  productsRow2: Product[] = [];
  productsRow3: Product[] = [];
  productsRow4: Product[] = [];
  productsRow5: Product[] = [];

  totalRecords?: number;
  currentPage = 0;
  rowsPerPage = 6;

  allProducts:Product[] = [];

  private destroyed$ = new Subject<void>();

  responsiveOptions: any[] | undefined;

  types = ['clothes', 'electronics'];
  searchKeyWords='';
  filteredProducts!: Product[];
  searchForm!:FormGroup;
  filteredProducts$ = this.productFacade.filteredProducts$;

  constructor(private productFacade : ProductsFacade, private el : ElementRef, private renderer: Renderer2,
              private changeDetector: ChangeDetectorRef, private router : Router, private messageService : MessageService,
              private searchPipe: SearchPipe, private formBuilder: FormBuilder){}

  ngOnInit(): void{


    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];

    this.productFacade.getAllProducts();

    this.products$.pipe(takeUntil(this.destroyed$)).subscribe({
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
    });

    this.products$.pipe(takeUntil(this.destroyed$)).subscribe({
      next: (prods?: Product[]) => {
        this.totalRecords = prods?.length;
        this.updateDisplayedUsers();

      },
    });
  }

  updateDisplayedUsers() {
    const start = this.currentPage * this.rowsPerPage;

      this.products$.pipe(take(1)).subscribe(prods => {
        if(prods){
          this.allProducts = prods?.slice(start, start + this.rowsPerPage);
        }
      });
    }


    filterProducts(){
      const start = this.currentPage * this.rowsPerPage;

      this.productFacade.filterProducts(this.searchKeyWords);


      this.filteredProducts$.subscribe(prods => {
        if(prods){
          this.totalRecords = prods?.length;
          this.allProducts = prods?.slice(start, start + this.rowsPerPage);
        }
      });
      this.changeDetector.detectChanges();


    }


  paginate(event:any) {
    this.currentPage = event.page;
    setTimeout(()=>{
      this.updateDisplayedUsers();
    })
    this.changeDetector.detectChanges();
  }

  addToCart(product: Product){
    if(localStorage.getItem('user') === null){
      this.messageService.add({key:"addToCartFailure", severity:'warn', summary: 'Warn', detail: 'You have to be signed in before adding a product to your cart'});
      return;
    }else{
      const user = JSON.parse(localStorage.getItem('user')!)
      this.productFacade.addToCart(product.productId!, user.id, 1)
    }

    setTimeout(()=>{
      window.location.reload();
    },2000);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}


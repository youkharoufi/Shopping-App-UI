import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductsFacade } from '@shopping-app-ui/store';
import { take } from 'rxjs';

@Component({
  selector: 'shopping-app-ui-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit{

  product$ = this.productFacade.getOneProduct$;
  product ?: Product;

  products$ = this.productFacade.products$;
  totalRecords?: number;
  currentPage = 0;
  rowsPerPage = 6;

  allProducts:Product[] = [];

  constructor(private route: ActivatedRoute, private productFacade: ProductsFacade, private changeDetector: ChangeDetectorRef){}


  ngOnInit(): void{
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        this.productFacade.getOneProduct(id!);

        this.product$.subscribe({
          next:(prod?:Product)=>{
            this.product = prod;
          }
        })

      });

      this.productFacade.getAllProducts();


      this.products$.subscribe({
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
        this.allProducts = prods!.slice(start, start + this.rowsPerPage);
      }
    });
  }

  paginate(event:any) {
    this.currentPage = event.page;
    setTimeout(()=>{
      this.updateDisplayedUsers();
    })
    this.changeDetector.detectChanges();
  }
}

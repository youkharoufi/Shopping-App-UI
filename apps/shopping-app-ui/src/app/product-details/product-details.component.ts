import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductsFacade } from '@shopping-app-ui/store';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';

@Component({
  selector: 'shopping-app-ui-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit{

  product$ = this.productFacade.getOneProduct$;
  product : Product = {
    quantity:1,

  };

  products$ = this.productFacade.products$;
  totalRecords?: number;
  currentPage = 0;
  rowsPerPage = 6;

  quantity = 1;

  allProducts:Product[] = [];

  constructor(private route: ActivatedRoute, private productFacade: ProductsFacade, private changeDetector: ChangeDetectorRef,
              private messageService : MessageService){}


  ngOnInit(): void{
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        this.productFacade.getOneProduct(id!);

        this.product$.subscribe({
          next:(prod?:Product)=>{
            if(prod)
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

  addToCart(product: Product){
    if(localStorage.getItem('user') === null){
      this.messageService.add({key:"addToCartFailure", severity:'warn', summary: 'Warn', detail: 'You have to be signed in before adding a product to your cart'});
    }else{
      const user = JSON.parse(localStorage.getItem('user')!);


      this.productFacade.addToCart(product.productId!, user.id, this.quantity)
    }

    setTimeout(()=>{
      window.location.reload();
    },2000)
  }
}

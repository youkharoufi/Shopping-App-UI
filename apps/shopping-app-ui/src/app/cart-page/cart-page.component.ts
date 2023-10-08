import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ApplicationUser, CartFacade } from '@shopping-app-ui/store';
import { Cart } from 'libs/store/src/lib/Models/cart';
import { CartItems } from 'libs/store/src/lib/Models/cartItems';

@Component({
  selector: 'shopping-app-ui-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  productCount$ = this.cartFacade.count$;

  productCount = '0';

  currentCart$ = this.cartFacade.currentCart$;
  currentCart!: Cart;

  cartItems$ = this.cartFacade.cartItems$;
  cartItems!: CartItems[];

  user!: ApplicationUser;

  total$ = this.cartFacade.total$;
  total = 0;

  constructor(private cartFacade: CartFacade, private messageService: MessageService) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.user = JSON.parse(localStorage.getItem('user')!);
      this.cartFacade.getCart(this.user.id);

      this.currentCart$.subscribe({
        next: (value?: Cart) => {
          if (value) {
            this.cartFacade.getCartItems(value.cartId);
            this.cartFacade.getCartTotal(value.cartId);
            this.total$.subscribe({
              next: (tots?: number) => {
                if (tots) {
                  this.total = tots!;
                  console.log(tots);
                }
              },
            });
            this.cartItems$.subscribe({
              next: (cartItems?: CartItems[]) => {
                if (cartItems) this.cartItems = cartItems;
              },
            });
            this.cartFacade.productCount(this.user.id, value!.cartId);
            this.productCount$.subscribe({
              next: (count?: number) => {
                if (count)
                  this.productCount =
                    typeof count === undefined ? '0' : count?.toString();
              },
            });
          }
        },
      });
    }
  }


  updateCartItem(updatedItem: CartItems) {
      const index = this.cartItems.findIndex(item => item.itemId === updatedItem.itemId);

      if (index !== -1) {
          updatedItem.itemTotal = updatedItem.itemQuantity * updatedItem.itemPrice;
          this.cartItems = [
              ...this.cartItems.slice(0, index),
              updatedItem,
              ...this.cartItems.slice(index + 1)
          ];
      }

      // Update total price locally based on changes
      this.updateTotalPrice();
  }

  incrementQuantity(cartItem: CartItems) {
      const updatedItem = {
          ...cartItem,
          itemQuantity: cartItem.itemQuantity + 1
      };
      this.updateCartItem(updatedItem);
  }

  decrementQuantity(cartItem: CartItems) {
      if (cartItem.itemQuantity > 1) {
          const updatedItem = {
              ...cartItem,
              itemQuantity: cartItem.itemQuantity - 1
          };
          this.updateCartItem(updatedItem);
      }
  }

  onQuantityChange(event: any, cartItem: CartItems) {
      const newValue = Number(event.target.value);
      const updatedItem = { ...cartItem, itemQuantity: newValue };
      this.updateCartItem(updatedItem);
  }

  // Update the total based on all cart items locally
  updateTotalPrice() {
      this.total = this.cartItems.reduce((acc, item) => acc + (item.itemQuantity * item.itemPrice), 0);
  }

  deleteItem(cartItem: CartItems){
    this.cartFacade.deleteCartItem(cartItem.itemId);
    this.messageService.add({key:"deleteCartItem", severity:'warn', summary: 'Warn', detail: 'You have deleted the item from your cart'});

    setTimeout(()=>{
      window.location.reload()
    },2000);
  }
}



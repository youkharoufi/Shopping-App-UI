import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [CommonModule,
    ToastModule],
  exports:[
    ToastModule
  ]
})
export class PrimeNgZeModule {}

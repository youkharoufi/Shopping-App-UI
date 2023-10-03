import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [CommonModule,
    ToastModule,
    CalendarModule],
  exports:[
    ToastModule,
    CalendarModule
  ]
})
export class PrimeNgZeModule {}

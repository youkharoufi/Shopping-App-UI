import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  imports: [CommonModule, ToastModule, CalendarModule, PaginatorModule],
  exports: [ToastModule, CalendarModule, PaginatorModule],
})
export class PrimeNgZeModule {}

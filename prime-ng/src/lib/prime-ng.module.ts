import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  imports: [CommonModule, ToastModule, CalendarModule, PaginatorModule, BadgeModule, ButtonModule, CarouselModule],
  exports: [ToastModule, CalendarModule, PaginatorModule, BadgeModule, ButtonModule, CarouselModule],
})
export class PrimeNgZeModule {}

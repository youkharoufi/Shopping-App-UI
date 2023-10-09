import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [CommonModule, ToastModule, CalendarModule, PaginatorModule, BadgeModule, ButtonModule, CarouselModule, DropdownModule, InputTextModule],
  exports: [ToastModule, CalendarModule, PaginatorModule, BadgeModule, ButtonModule, CarouselModule, DropdownModule, InputTextModule],
})
export class PrimeNgZeModule {}

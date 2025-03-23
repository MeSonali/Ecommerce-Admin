import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductpageComponent } from './productpage/productpage.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProducformComponent } from './producform/producform.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductpageComponent,
    ProductlistComponent,
    ProducformComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [ProducformComponent, ProductlistComponent, ProductpageComponent],
})
export class ProductModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductpageComponent } from './product/productpage/productpage.component';
import { ProductlistComponent } from './product/productlist/productlist.component';
import { ProducformComponent } from './product/producform/producform.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductlistComponent,
  },
  {
    path: 'products/new',
    component: ProducformComponent,
  },
  {
    path: 'products/:id',
    component: ProductpageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../../services/productservice.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductlistComponent implements OnInit {
  productData: Product[] = [];

  constructor(private productService: ProductserviceService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.productData = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  handleDelete(id: string): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        console.log('Product deleted successfully');
        this.fetchData();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }
}

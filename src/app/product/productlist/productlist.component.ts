import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../../services/productservice.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductlistComponent implements OnInit {
  constructor(private productService: ProductserviceService) {}
  productData: any[] = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        console.log('API Response:', data);
        
        // ✅ Map the response to include SKU properly
        this.productData = data.map((product) => ({
          id: product.id,
          name: product.name,
          sku: product.sku,          // Include SKU
          price: product.price
        }));
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Delete data
  handleDelete(id: any): void {
    console.log('Deleting ID:', id);
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductserviceService } from 'src/app/services/productservice.service';
import { Product } from '../../models/product.model';  // Import the Product model

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css'],
})
export class ProductpageComponent implements OnInit {

  productDetail: Product | null = null;   // Use the Product model
  notFound: boolean = false;
  productId: string = '';                  // Store the product ID

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.activeRoute.snapshot.paramMap.get('id') || '';  // Get the product ID

    if (this.productId) {
      this.getProductDetails(this.productId);
    } else {
      console.error('Invalid Product ID');
      this.router.navigate(['/products']);
    }
  }

  // Fetch product details
  getProductDetails(id: string): void {
    this.productService.getDataById(id).subscribe({
      next: (data: Product) => {
        this.productDetail = data;
        this.notFound = false;
      },
      error: (err) => {
        if (err.status === 404) {
          console.error('Product not found');
          this.notFound = true;
        } else {
          console.error('Error fetching product:', err);
          alert('Failed to load product details.');
        }
      }
    });
  }

  // Navigate to the edit form with the product ID
  editProduct(): void {
    this.router.navigate(['/products/edit', this.productId]);
  }
}

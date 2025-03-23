import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductserviceService } from 'src/app/services/productservice.service';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css'],
})
export class ProductpageComponent implements OnInit {

  productDetail: any;
  notFound: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.activeRoute.snapshot.paramMap.get('id');
    
    if (productId) {
      this.getProductDetails(productId);
    } else {
      console.error('Invalid Product ID');
      this.router.navigate(['/products']);
    }
  }

  getProductDetails(id: string): void {
    this.productService.getDataById(id).subscribe({
      next: (data) => {
        this.productDetail = data;
        this.notFound = false;  // Hide the "Not found" message
      },
      error: (err) => {
        if (err.status === 404) {
          console.error('Product not found');
          this.notFound = true;  // Show "Not found" message
        } else {
          console.error('Error fetching product:', err);
          alert('Failed to load product details.');
        }
      }
    });
  }
}

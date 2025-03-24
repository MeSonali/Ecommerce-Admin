import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductserviceService } from 'src/app/services/productservice.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css'],
})
export class ProductpageComponent implements OnInit {

  productDetail: Product | null = null;
  notFound: boolean = false;
  productId: string = '';
  selectedImages: File[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.activeRoute.snapshot.paramMap.get('id') || '';

    if (this.productId) {
      this.getProductDetails(this.productId);
    } else {
      console.error('Invalid Product ID');
      this.router.navigate(['/products']);
    }
  }

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

  onImageSelect(event: any): void {
    this.selectedImages = Array.from(event.target.files);
  }

  uploadImages(): void {
    if (this.selectedImages.length > 0 && this.productId) {
      this.productService.uploadProductImages(this.productId, this.selectedImages).subscribe({
        next: (response) => {
          console.log('Images uploaded successfully', response);
          alert('Images uploaded successfully');
          this.getProductDetails(this.productId);  // Refresh product details
        },
        error: (error) => {
          console.error('Error uploading images:', error);
          alert('Failed to upload images');
        }
      });
    } else {
      alert('Please select images to upload.');
    }
  }

  editProduct(): void {
    this.router.navigate(['/products/edit', this.productId]);
  }
}

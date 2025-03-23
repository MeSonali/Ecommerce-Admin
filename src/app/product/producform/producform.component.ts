import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductserviceService } from 'src/app/services/productservice.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-producform',
  templateUrl: './producform.component.html',
  styleUrls: ['./producform.component.css'],
})
export class ProducformComponent implements OnInit {

  formData: FormGroup;
  isEditMode: boolean = false;   // Track if editing
  productId: string = '';        // Store the product ID

  constructor(
    private fb: FormBuilder,
    private productService: ProductserviceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formData = this.fb.group({
      name: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Check if it's edit mode
    this.productId = this.route.snapshot.paramMap.get('id') || '';

    if (this.productId) {
      this.isEditMode = true;      // Enable edit mode
      this.loadProductDetails(this.productId);
    }
  }

  // Load existing product details
  loadProductDetails(id: string): void {
    this.productService.getDataById(id).subscribe({
      next: (data: Product) => {
        this.formData.patchValue({
          name: data.name,
          sku: data.sku,
          price: data.price
        });
      },
      error: (err) => {
        console.error('Error loading product:', err);
      }
    });
  }

  // ✅ Handle form submission for both Add and Update
  handleSubmit(): void {
    const formValue = this.formData.value;

    if (this.isEditMode) {
      // Update existing product
      this.productService.updateProduct(this.productId, formValue).subscribe(() => {
        console.log('Product updated successfully');
        this.router.navigate(['/products']);   // ✅ Redirect to /products
      });
    } else {
      // Add new product
      this.productService.addProduct(formValue).subscribe(() => {
        console.log('Product added successfully');
        this.router.navigate(['/products']);   // ✅ Redirect to /products
      });
    }
  }
}

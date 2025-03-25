import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductserviceService } from 'src/app/services/productservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-producform',
  templateUrl: './producform.component.html',
  styleUrls: ['./producform.component.css']
})
export class ProducformComponent implements OnInit {

  formData!: FormGroup;
  isEditMode: boolean = false;
  productId: string = '';

  selectedFiles: File[] = [];
  imagePreviews: string[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductserviceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formData = this.fb.group({
      name: ['', Validators.required],
      sku: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = id;
      this.loadProduct(id);
    }
  }

  // ✅ Load existing product
  loadProduct(id: string): void {
    this.productService.getDataById(id).subscribe((data) => {
      this.formData.patchValue({
        name: data.name,
        sku: data.sku,
        price: data.price
      });
      this.imagePreviews = data.images || [];
    });
  }

  // ✅ Handle image selection
  onFileSelect(event: any): void {
    const files: File[] = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
      this.selectedFiles.push(file);
    });
  }

  // ✅ Remove selected image
  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  // ✅ Submit form with images
  handleSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.formData.value.name);
    formData.append('sku', this.formData.value.sku);
    formData.append('price', this.formData.value.price);
  
    // Append only the first selected image with the correct field name
    if (this.selectedFiles.length > 0) {
      formData.append('image', this.selectedFiles[0]);  // ✅ Change to 'image' instead of 'images'
    }
  
    console.log('Submitting form:', formData);
  
    if (this.isEditMode) {
      this.productService.updateProductWithImages(this.productId, formData).subscribe({
        next: () => {
          alert('Product updated successfully!');
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Failed to update product!');
        }
      });
    } else {
      this.productService.addProductWithImages(formData).subscribe({
        next: () => {
          alert('Product added successfully!');
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Failed to add product!');
        }
      });
    }
  }
  

  // ✅ Clear the form
  clearForm(): void {
    this.formData.reset();
    this.selectedFiles = [];
    this.imagePreviews = [];
  }
}

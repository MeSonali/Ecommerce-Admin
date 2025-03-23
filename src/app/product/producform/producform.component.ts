import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductserviceService } from 'src/app/services/productservice.service';
@Component({
  selector: 'app-producform',
  templateUrl: './producform.component.html',
  styleUrls: ['./producform.component.css'],
})
export class ProducformComponent implements OnInit {
  formData: FormGroup | any;
  constructor(
    private fb: FormBuilder,
    private ProductService: ProductserviceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.formData = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      // image: ['', [Validators.required]],
    });
  }
  handleSubmit() {
    console.log(this.formData.value);
    this.ProductService.addProduct(this.formData.value).subscribe((data) => {
      console.log(data);
      this.route.navigate(['/products']);
    });
    this.formData.reset();
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductserviceService {
  private apiUrl = 'https://ecommerce-backend-9-gbss.onrender.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getDataById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, data: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ✅ Upload multiple product images
  uploadProductImages(productId: string, imageFiles: File[]): Observable<any> {
    const formData = new FormData();

    // Append each image to the FormData object
    for (const file of imageFiles) {
      formData.append('images', file);  // Multiple images with the same key
    }

    const headers = new HttpHeaders({
      'Accept': 'application/json',
    });

    // POST request to upload images
    return this.http.post<any>(`${this.apiUrl}/${productId}/upload-images`, formData, { headers });
  }
}

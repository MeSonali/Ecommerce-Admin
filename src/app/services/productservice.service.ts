import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  private apiUrl = `${environment.apiUrl}`;  // ✅ Correct base URL

  constructor(private http: HttpClient) {}

  // ✅ Get all products
  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // ✅ Get product by ID
  getDataById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // ✅ Add product with images (fixing the duplicate path issue)
  addProductWithImages(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/add`, formData);  // ✅ Fixed
  }

  // ✅ Update product with images
  updateProductWithImages(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${id}`, formData);  // ✅ Fixed
  }

  // ✅ Upload product images separately
  uploadProductImages(id: string, formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/upload-images/${id}`, formData);  // ✅ Fixed
  }

  // ✅ Delete product by ID
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${id}`);  // ✅ Fixed
  }
}

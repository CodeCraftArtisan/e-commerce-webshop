import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../types';
import { API_ENDPOINTS } from '../../constants/api_endpoints';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = API_ENDPOINTS.products;

  constructor(private http: HttpClient) {}

  // Fetch all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl.getAll);
  }

  // Fetch a single product by its ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(this.apiUrl.getById(id));
  }

  // Create a new product
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl.create, product);
  }

  // Bulk creation of products
  createProducts(products: Product[]): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.apiUrl.create}/bulk`, products);
  }

  // Update a product by ID
  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl.update(id), product);
  }

  // Delete a product by ID
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl.delete(id));
  }

  // Fetch products by category ID
  getProductsByCategoryId(categoryId: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl.getAllByCategory(categoryId));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategoryById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${categoryId}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  createCategoriesBulk(categories: Category[]): Observable<Category[]> {
    return this.http.post<Category[]>(`${this.apiUrl}/bulk`, categories);
  }

  updateCategory(categoryId: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${categoryId}`, category);
  }

  deleteCategory(categoryId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${categoryId}`);
  }

  deleteCategoryByParentId(parentCategoryId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/parent/${parentCategoryId}`);
  }

  getCategoriesByParentId(parentCategoryId: string): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.apiUrl}/parent/${parentCategoryId}`
    );
  }

  getCategoryHierarchy(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/hierarchy/${categoryId}`);
  }
}

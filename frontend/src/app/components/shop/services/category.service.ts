import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../types';
import { API_ENDPOINTS } from '../../constants/api_endpoints';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = API_ENDPOINTS.categories;

  constructor(private http: HttpClient) {}

  // Get all categories
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl.getAll);
  }

  // Get category by its ID
  getCategoryById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(this.apiUrl.getById(categoryId));
  }

  // Create a new category
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl.create, category);
  }

  // Bulk creation of categories
  createCategoriesBulk(categories: Category[]): Observable<Category[]> {
    return this.http.post<Category[]>(`${this.apiUrl.create}/bulk`, categories);
  }

  // Update category by ID
  updateCategory(categoryId: string, category: Category): Observable<Category> {
    return this.http.put<Category>(this.apiUrl.update(categoryId), category);
  }

  // Delete category by ID
  deleteCategory(categoryId: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl.delete(categoryId));
  }

  // Delete category by parent ID
  deleteCategoryByParentId(parentCategoryId: string): Observable<void> {
    return this.http.delete<void>(
      this.apiUrl.getSubcategoriesByParentId(parentCategoryId)
    ); // Assuming this is what the endpoint does
  }

  // Get categories by parent ID
  getCategoriesByParentId(parentCategoryId: string): Observable<Category[]> {
    return this.http.get<Category[]>(
      this.apiUrl.getSubcategoriesByParentId(parentCategoryId)
    );
  }

  // Get category hierarchy
  getCategoryHierarchy(categoryId: string): Observable<Category> {
    return this.http.get<Category>(
      `${this.apiUrl.getById(categoryId)}/hierarchy`
    );
  }
}

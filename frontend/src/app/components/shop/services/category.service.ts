import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [
    {
      id: '1',
      name: "Matériel d'installation",
      subcategories: [],
      imageUrl: 'assets/images/categories/plug.jpg',
    },
    {
      id: '2',
      name: 'Eclairage',
      subcategories: [],
      imageUrl: 'assets/images/categories/lightbulb.jpg',
    },
    {
      id: '3',
      name: 'Energie renouvelable',
      subcategories: [],
      imageUrl: 'assets/images/categories/solar-energy.jpg',
    },
    {
      id: '4',
      name: 'Câble',
      subcategories: [],
      imageUrl: 'assets/images/categories/cables.jpg',
    },
    {
      id: '5',
      name: 'Cheminement de câbles',
      subcategories: [],
      imageUrl: 'assets/images/categories/power.jpg',
    },
    {
      id: '6',
      name: 'Distribution de courant',
      subcategories: [],
      imageUrl: 'assets/images/categories/power.jpg',
    },
    {
      id: '7',
      name: 'Automatisation du bâtiment',
      subcategories: [],
      imageUrl: 'assets/images/categories/domotique.jpg',
    },
    {
      id: '8',
      name: 'HVAC',
      subcategories: [],
      imageUrl: 'assets/images/categories/heating.jpg',
    },
    {
      id: '8',
      name: 'Data & Telecom',
      subcategories: [],
      imageUrl: 'assets/images/categories/telecom.jpg',
    },
  ];

  constructor() {}

  getAllCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  getCategoryById(categoryId: string): Observable<Category | undefined> {
    const category = this.categories.find((c) => c.id === categoryId);
    return of(category);
  }

  getCategoriesByParentId(parentCategoryId: string): Observable<Category[]> {
    const subcategories = this.categories.filter(
      (c) => c.parentCategoryId === parentCategoryId
    );
    return of(subcategories);
  }
}

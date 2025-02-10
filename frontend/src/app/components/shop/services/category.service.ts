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
      description:
        "Matériaux d'installation : tubes, fixations, interrupteurs, prises, boîtiers.",
      subcategories: [],
      imageUrl: 'assets/images/categories/plug.jpg',
    },
    {
      id: '2',
      name: 'Eclairage',
      description:
        'Éclairage LED, sécurité, déco : OSRAM, Philips, LEDVANCE et plus. Pour tous vos projets.',
      subcategories: [],
      imageUrl: 'assets/images/categories/lightbulb.jpg',
    },
    {
      id: '3',
      name: 'Energie renouvelable',
      description:
        'HVAC et énergie : Alpha Innotec, Bosch, Kaysun, Ventilair. Panneaux solaires, onduleurs, bornes et batteries.',
      subcategories: [],
      imageUrl: 'assets/images/categories/solar-energy.jpg',
    },
    {
      id: '4',
      name: 'Câble',
      description:
        "Câbles d'alimentation, industriels et télécom : INSTALLATIEKABEL, TOPCABLE, PREFLEX SAFE. Qualité et durabilité pour tous vos projets.",
      subcategories: [],
      imageUrl: 'assets/images/categories/cables.jpg',
    },
    {
      id: '5',
      name: 'Cheminement de câbles',
      description:
        'Busways, batteries, transformateurs : Italfarad, Schneider, Legrand. Solutions fiables pour transport et distribution d’énergie.',
      subcategories: [],
      imageUrl: 'assets/images/categories/power.jpg',
    },
    {
      id: '6',
      name: 'Distribution de courant',
      description:
        'Busways, batteries, transformateurs : Italfarad, Schneider, Legrand. Solutions fiables pour transport et distribution d’énergie.',
      subcategories: [],
      imageUrl: 'assets/images/categories/power.jpg',
    },
    {
      id: '7',
      name: 'Automatisation du bâtiment',
      description: 'Solutions pour améliorer la gestion de votre bâtiment.',
      subcategories: [],
      imageUrl: 'assets/images/categories/domotique.jpg',
    },
    {
      id: '8',
      name: 'HVAC',
      description:
        'Chauffage, ventilation et climatisation pour tous vos besoins.',
      subcategories: [],
      imageUrl: 'assets/images/categories/heating.jpg',
    },
    {
      id: '9',
      name: 'Data & Telecom',
      description:
        'Solutions pour la gestion des données et des communications.',
      subcategories: [],
      imageUrl: 'assets/images/categories/telecom.jpg',
    },
    {
      id: '10',
      name: 'Automatisation industrielle',
      description: "Automatisation des processus industriels et d'usine.",
      subcategories: [],
      imageUrl: 'assets/images/categories/industrial.jpg',
    },
    {
      id: '11',
      name: 'Outillage',
      description: 'Outils électriques, manuels et de précision.',
      subcategories: [],
      imageUrl: 'assets/images/categories/materiel-installation.jpg',
    },
    {
      id: '12',
      name: 'Électroménager',
      description: 'Appareils électroménagers pour la maison.',
      subcategories: [],
      imageUrl: 'assets/images/categories/electromenager.jpg',
    },
    {
      id: '13',
      name: 'Cheminement de câbles',
      description: 'Systèmes de câblage pour les réseaux électriques.',
      subcategories: [],
      imageUrl: 'assets/images/categories/routing.jpg',
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

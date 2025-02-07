import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: '101',
      name: 'Perceuse sans fil',
      price: 150,
      description:
        'Perceuse sans fil haute performance avec batterie rechargeable.',
      stockQuantity: 50,
      categoryId: '1',
      imageUrls: ['assets/images/perceuse.png'],
      category: ['ToolPro', "Matériel d'installation"],
      rating: 4.5,
    },
    {
      id: '102',
      name: 'Meuleuse d’angle',
      price: 120,
      description:
        'Meuleuse d’angle robuste pour couper et meuler les matériaux.',
      stockQuantity: 30,
      categoryId: '1',
      imageUrls: [
        'assets/images/scie.png',
        'assets/images/perceuse.png',
        'assets/images/scie.png',
        'assets/images/perceuse.png',
      ],
      category: ['GrindMaster', "Matériel d'installation"],
      rating: 4.5,
    },
    {
      id: '103',
      name: 'Bétonnière',
      price: 800,
      description: 'Bétonnière portable avec une grande capacité de mélange.',
      stockQuantity: 20,
      categoryId: '1',
      imageUrls: ['assets/images/scie.png'],
      category: ['MixItUp', "Matériel d'installation"],
      rating: 4.5,
    },
    {
      id: '104',
      name: 'Niveau laser',
      price: 199,
      description:
        'Niveau laser précis pour des mesures et un nivellement exacts.',
      stockQuantity: 80,
      categoryId: '1',
      imageUrls: ['assets/images/scie.png'],
      category: ['LevelPro', 'Energie renouvelable '],
    },
    {
      id: '105',
      name: 'Machine à souder',
      price: 500,
      description:
        'Machine à souder compacte et efficace pour la fabrication métallique.',
      stockQuantity: 100,
      categoryId: '1',
      imageUrls: ['assets/images/scie.png'],
      category: ['WeldTech', 'Energie renouvelable '],
    },
    {
      id: '201',
      name: 'Générateur portable',
      price: 1200,
      description:
        'Générateur portable fiable pour alimenter outils et équipements.',
      stockQuantity: 15,
      categoryId: '2',
      imageUrls: ['assets/images/scie.png'],
      category: ['PowerGo', 'Energie renouvelable '],
    },
    {
      id: '202',
      name: 'Compresseur d’air',
      price: 600,
      description:
        'Compresseur d’air industriel pour des applications polyvalentes.',
      stockQuantity: 25,
      categoryId: '2',
      imageUrls: ['assets/images/scie.png'],
      category: ['AirPro', 'Energie renouvelable '],
    },
    {
      id: '203',
      name: 'Ponceuse électrique',
      price: 300,
      description:
        'Ponceuse électrique performante pour surfaces en bois et métal.',
      stockQuantity: 10,
      categoryId: '2',
      imageUrls: ['assets/images/perceuse.png'],
      category: ['SanderMax', 'Cheminement de câbles '],
    },
    {
      id: '204',
      name: 'Aspirateur industriel',
      price: 400,
      description:
        'Aspirateur industriel puissant pour les chantiers de construction.',
      stockQuantity: 35,
      categoryId: '2',
      imageUrls: ['assets/images/perceuse.png'],
      category: ['CleanSweep', 'Cheminement de câbles '],
    },
    {
      id: '205',
      name: 'Purificateur d’air',
      price: 250,
      description:
        'Purificateur d’air HEPA pour un environnement de travail sain.',
      stockQuantity: 50,
      categoryId: '2',
      imageUrls: ['assets/images/perceuse.png'],
      category: ['CleanSweep', 'Cheminement de câbles '],
    },
    {
      id: '301',
      name: 'Gilet de sécurité',
      price: 20,
      description: 'Gilet de sécurité haute visibilité pour les chantiers.',
      stockQuantity: 100,
      categoryId: '3',
      imageUrls: ['assets/images/perceuse.png'],
      category: ['CleanSweep', 'Outillage '],
    },
    {
      id: '302',
      name: 'Casque de protection',
      price: 25,
      description: 'Casque de protection robuste pour une sécurité maximale.',
      stockQuantity: 60,
      categoryId: '3',
      imageUrls: ['assets/images/scie.png'],
      category: ['CleanSweep', 'Outillage '],
    },
    {
      id: '303',
      name: 'Gants de travail',
      price: 15,
      description:
        'Gants de travail résistants pour une manipulation sécurisée.',
      stockQuantity: 40,
      categoryId: '3',
      imageUrls: ['assets/images/perceuse.png'],
      category: ['HandGuard', 'Outillage '],
    },
    {
      id: '304',
      name: 'Chaussures de sécurité',
      price: 50,
      description:
        'Chaussures de sécurité avec embout renforcé pour les chantiers.',
      stockQuantity: 20,
      categoryId: '3',
      imageUrls: ['assets/images/scie.png'],
      category: ['HandGuard', 'Outillage '],
    },
    {
      id: '305',
      name: 'Lunettes de protection',
      price: 10,
      description:
        'Lunettes de protection anti-poussière et anti-éclaboussures.',
      stockQuantity: 70,
      categoryId: '3',
      imageUrls: ['assets/images/scie.png'],
      category: ['HandGuard', 'HVAC '],
    },
    {
      id: '401',
      name: 'Marteau perforateur',
      price: 300,
      description:
        'Marteau perforateur pour perçage de béton et surfaces dures.',
      stockQuantity: 30,
      categoryId: '4',
      imageUrls: ['assets/images/scie.png'],
      category: ['HandGuard', 'HVAC '],
    },
    {
      id: '402',
      name: 'Scie circulaire',
      price: 200,
      description: 'Scie circulaire puissante pour des coupes précises.',
      stockQuantity: 25,
      categoryId: '4',
      imageUrls: ['assets/images/scie.png'],
      category: ['HandGuard', 'HVAC '],
    },
    {
      id: '403',
      name: 'Cloueur pneumatique',
      price: 350,
      description:
        'Cloueur pneumatique pour des assemblages rapides et solides.',
      stockQuantity: 15,
      categoryId: '4',
      imageUrls: ['assets/images/scie.png'],
      category: ['HandGuard', 'HVAC '],
    },
    {
      id: '404',
      name: 'Échafaudage mobile',
      price: 800,
      description: 'Échafaudage mobile sécurisé pour travaux en hauteur.',
      stockQuantity: 10,
      categoryId: '4',
      imageUrls: ['assets/images/scie.png'],
      category: ['SkyBuild', 'Data & Telecom '],
    },
    {
      id: '405',
      name: 'Coffret à outils',
      price: 100,
      description:
        'Coffret à outils complet pour les professionnels du bâtiment.',
      stockQuantity: 200,
      categoryId: '4',
      imageUrls: ['assets/images/scie.png'],
      category: ['SkyBuild', 'Data & Telecom '],
    },
  ];

  constructor() {}

  getPaginatedProducts(page: number, pageSize: number): Observable<Product[]> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = this.products.slice(startIndex, endIndex);
    return of(paginatedProducts);
  }

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(productId: string): Observable<Product | undefined> {
    const product = this.products.find((p) => p.id === productId);
    return of(product);
  }

  // New method: Filter products by categoryId
  getProductsByCategoryId(categoryId: string): Observable<Product[]> {
    const products = this.products.filter(
      (product) => product.categoryId === categoryId
    );
    return of(products);
  }
}

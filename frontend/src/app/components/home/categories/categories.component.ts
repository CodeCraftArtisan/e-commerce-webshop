import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { Product } from '../../types';

// Import Swiper styles
import 'swiper/swiper-bundle.css';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../shop/services/auth.service';

@Component({
    selector: 'app-categories',
    imports: [CommonModule, RouterModule, TranslateModule],
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  // Array to hold all featured products
  featuredProducts: Product[] = [];

  categories = [
    {
      name: "Matériel d'installation",
      description:
        "Matériaux d'installation : tubes, fixations, interrupteurs, prises, boîtiers.",
      image: 'assets/images/categories/plug.jpg',
      categoryId: '1',
    },
    {
      name: 'Eclairage',
      description:
        'Éclairage LED, sécurité, déco : OSRAM, Philips, LEDVANCE et plus. Pour tous vos projets.',
      image: 'assets/images/categories/lightbulb.jpg',
      categoryId: '2',
    },
    {
      name: 'Energie renouvelable',
      description:
        'HVAC et énergie : Alpha Innotec, Bosch, Kaysun, Ventilair. Panneaux solaires, onduleurs, bornes et batteries.',
      image: 'assets/images/categories/solar-energy.jpg',
      categoryId: '3',
    },
    {
      name: 'Câble',
      description:
        "Câbles d'alimentation, industriels et télécom : INSTALLATIEKABEL, TOPCABLE, PREFLEX SAFE. Qualité et durabilité pour tous vos projets.",
      image: 'assets/images/categories/cables.jpg',
      categoryId: '1',
    },
    {
      name: 'Cheminement de câbles',
      description:
        'Busways, batteries, transformateurs : Italfarad, Schneider, Legrand. Solutions fiables pour transport et distribution d’énergie. Disponibles sur notre e-shop.',
      image: 'assets/images/categories/lightbulb.jpg',
      categoryId: '1',
    },
    {
      name: 'Distribution de courant',
      description:
        'Busways, batteries, transformateurs : Italfarad, Schneider, Legrand. Solutions fiables pour transport et distribution d’énergie. Disponibles sur notre e-shop.',
      image: 'assets/images/categories/power.jpg',
      categoryId: '1',
    },
    {
      name: 'Automatisation du bâtiment',
      description: '',
      image: 'assets/images/categories/domotique.jpg',
      categoryId: '1',
    },
    {
      name: 'HVAC',
      description: '',
      image: 'assets/images/categories/heating.jpg',
      categoryId: '1',
    },
    {
      name: 'Data & Telecom',
      description: '',
      image: 'assets/images/categories/telecom.jpg',
      categoryId: '1',
    },
    {
      name: 'Automatisation industrielle',
      description: '',
      image: 'assets/images/categories/industrial.jpg',
      categoryId: '1',
    },
    {
      name: 'Outillage',
      description: '',
      image: 'assets/images/categories/materiel-installation.jpg',
      categoryId: '1',
    },
    {
      name: 'Électroménager',
      description: '',
      image: 'assets/images/categories/electromenager.jpg',
      categoryId: '1',
    },
    {
      name: 'Cheminement de câbles',
      description: '',
      image: 'assets/images/categories/routing.jpg',
      categoryId: '1',
    },
  ];

  constructor(private authService: AuthService){}

  isUserAuth(): boolean{
    return this.authService.isUserAuthenticated()
  }
}

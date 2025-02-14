import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Vérifier si nous sommes dans l'environnement du navigateur
  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('authToken');

    // Si un token existe, vérifier s'il est expiré
    if (token) {
      const authService = new AuthService();
      if (authService.isTokenExpired()) {
        authService.removeToken();

        const router = new Router();
        router.navigate(['/login']);

        return next(req);
      }

      // If the token is valid, attach it to the request as Authorization header
      if (req.url.includes('/authentication')) {
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next(cloned);
      }
    }
  }

  // Si pas de token ou la requête ne nécessite pas d'authentification, laisser la requête inchangée
  return next(req);
};

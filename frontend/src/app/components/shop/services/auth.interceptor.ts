import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Vérifier si nous sommes dans l'environnement du navigateur
  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('authToken');

    // Ajouter l'en-tête Authorization uniquement si le jeton existe
    if (token) {
      // Vérification que la requête nécessite l'authentification (par exemple, si l'URL contient '/api')
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

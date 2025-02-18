// Base URLs for different environments
const BASE_URL = 'https://e-commerce-webshop-render.onrender.com/api';
const PROD_BASE_URL = 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  categories: {
    getById: (id: string) => `${BASE_URL}/categories/${id}`,
    getAll: `${BASE_URL}/categories`,
    create: `${BASE_URL}/categories`,
    update: (id: string) => `${BASE_URL}/categories/${id}`,
    delete: (id: string) => `${BASE_URL}/categories/${id}`,
    getSubcategoriesByParentId: (parentId: string) =>
      `${BASE_URL}/categories/parent/${parentId}`,
  },
  carts: {
    getByUserEmail: (email: string) => `${BASE_URL}/carts/${email}`,
    addItem: `${BASE_URL}/carts/items`,
    removeItem: (email: string, itemId: string) =>
      `${BASE_URL}/carts/${email}/items/${itemId}`,
    clearCart: (email: string) => `${BASE_URL}/carts/${email}`, 
  },
  addresses: {
    getById: (id: string) => `${BASE_URL}/addresses/${id}`,
    getByUserEmail: (email: string) => `${BASE_URL}/addresses/user/${email}`,
    create: `${BASE_URL}/addresses`,
    update: (id: string) => `${BASE_URL}/addresses/${id}`,
    deleteById: (id: string) => `${BASE_URL}/addresses/${id}`,
    deleteByUserEmail: (email: string) => `${BASE_URL}/addresses/user/${email}`,
  },
  orders: {
    getById: (id: string) => `${BASE_URL}/orders/${id}`,
    getByUserEmail: (email: string) => `${BASE_URL}/orders/user/${email}`,
    create: `${BASE_URL}/orders`,
  },
  products: {
    getById: (id: string) => `${BASE_URL}/products/${id}`,
    getAll: `${BASE_URL}/products`,
    create: `${BASE_URL}/products`,
    update: (id: string) => `${BASE_URL}/products/${id}`,
    delete: (id: string) => `${BASE_URL}/products/${id}`,
    getAllByCategory: (id: string) => `${BASE_URL}/products/category/${id}`
  },
  reviews: {
    getById: (id: string) => `${BASE_URL}/reviews/${id}`,
    getByProductId: (productId: string) =>
      `${BASE_URL}/reviews/product/${productId}`,
    create: `${BASE_URL}/reviews`,
    update: (id: string) => `${BASE_URL}/reviews/${id}`,
    delete: (id: string) => `${BASE_URL}/reviews/${id}`,
  },
  auth: {
    authenticate: `${BASE_URL}/v1/auth/authenticate`,
    register: `${BASE_URL}/v1/auth/register`,

    // For production:
    authenticateProd: `${PROD_BASE_URL}/auth/authenticate`,
    registerProd: `${PROD_BASE_URL}/auth/register`,
  },
};

// Example commented URLs for clarity
// Local development: http://localhost:8080/api/v1/auth/authenticate
// Production: https://e-commerce-webshop-render.onrender.com/api/v1/auth/authenticate

// Local development: http://localhost:8080/api/v1/auth/register
// Production: https://e-commerce-webshop-render.onrender.com/api/v1/auth/register

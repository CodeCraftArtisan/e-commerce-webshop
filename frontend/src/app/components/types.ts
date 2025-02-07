export interface Category {
  id: string;
  name: string;
  parentCategoryId?: string;
  subcategories?: Category[];
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stockQuantity: number;
  categoryId: string;
  imageUrls: string[];
  category: string[];
  rating?: number;
}

export interface Cart {
  id: string;
  userEmail: string;
  totalPrice: number;
  items: CartItems[];
}

export interface CartItems {
  productId: string;
  cartId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userEmail: string;
  items: OrderItem[];
  totalPrice: string;
  orderStatus: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  orderId: string;
  productId: string;
  quantity: number;
  price: string;
}

export interface Review {
  id: string;
  productId: string;
  userEmail: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Address {
  id?: string;
  userEmail: string;
  street: string;
  streetNumber: string;
  city: string;
  postalCode: string;
  country: string;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

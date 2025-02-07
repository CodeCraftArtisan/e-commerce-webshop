import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../../types';


@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl = 'http://localhost:8080/api/addresses';

  constructor(private http: HttpClient) {}


  getAddressById(addressId: string): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/${addressId}`);
  }

  getAddressByUserEmail(userEmail: string): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/user/${userEmail}`);
  }

  createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.apiUrl, address);
  }

  updateAddress(addressId: string, address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.apiUrl}/${addressId}`, address);
  }

  deleteAddress(addressId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${addressId}`);
  }

  deleteAddressByUserEmail(userEmail: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/user/${userEmail}`);
  }
}

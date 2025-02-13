import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../../types';
import { API_ENDPOINTS } from '../../constants/api_endpoints';


@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl = API_ENDPOINTS.addresses;

  constructor(private http: HttpClient) {}


  getAddressById(addressId: string): Observable<Address> {
    return this.http.get<Address>(this.apiUrl.getById(addressId));
  }

  getAddressByUserEmail(userEmail: string): Observable<Address> {
    return this.http.get<Address>(this.apiUrl.getByUserEmail(userEmail));
  }

  createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.apiUrl.create, address);
  }

  updateAddress(addressId: string, address: Address): Observable<Address> {
    return this.http.put<Address>(this.apiUrl.update(addressId), address);
  }

  deleteAddress(addressId: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl.deleteById(addressId));
  }

  deleteAddressByUserEmail(userEmail: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl.deleteByUserEmail(userEmail));
  }
}

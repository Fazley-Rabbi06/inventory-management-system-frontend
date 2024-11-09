import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from './purchase/purchase.model';
import { Item } from './item-list/item.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseUrl = 'http://localhost:8080/api/purchases'; 
  private itemUrl = 'http://localhost:8080/api/items'; 

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders().set('Authorization', `${token}`)
    };
  }

  createPurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(this.baseUrl, purchase, this.getHeaders());
  }

  getAllPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.baseUrl, this.getHeaders());
  }

  getPurchaseById(id: number): Observable<Purchase> {
    return this.http.get<Purchase>(`${this.baseUrl}/${id}`, this.getHeaders());
  }

  updatePurchase(id: number, purchase: Purchase): Observable<Purchase> {
    return this.http.put<Purchase>(`${this.baseUrl}/${id}`, purchase, this.getHeaders());
  }

  deletePurchase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.getHeaders());
  }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemUrl, this.getHeaders());
  }
}

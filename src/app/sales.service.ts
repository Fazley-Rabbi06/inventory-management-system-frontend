import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from './sales/sale.model';
import { Item } from './item-list/item.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private baseUrl = 'http://localhost:8080/api/sales';
  private itemUrl = 'http://localhost:8080/api/items';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders().set('Authorization', `${token}`)
    };
  }

  createSale(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.baseUrl, sale, this.getHeaders());
  }

  getAllSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.baseUrl, this.getHeaders());
  }

  getSaleById(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.baseUrl}/${id}`, this.getHeaders());
  }

  updateSale(id: number, sale: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${this.baseUrl}/${id}`, sale, this.getHeaders());
  }

  deleteSale(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.getHeaders());
  }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemUrl, this.getHeaders());
  }
}

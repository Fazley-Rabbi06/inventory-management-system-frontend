import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item-list/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = 'http://localhost:8080/api/items'; 

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders().set('Authorization', `${token}`)
    };
  }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl, this.getHeaders());
  }

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.baseUrl, item, this.getHeaders());
  }

  updateItem(id: number, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.baseUrl}/${id}`, item, this.getHeaders());
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.getHeaders());
  }
  
  getStockReport(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/stock-report`, {
      headers: this.getHeaders().headers,
      responseType: 'text' as 'json'  
    });
  }
  
}

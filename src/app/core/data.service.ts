import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private snjomengdJsonDataUrl = 'assets/snjomengd-dag-for-dag.json';

  constructor(private http: HttpClient) {}

  fetchSnjomengdData(): Observable<any> {
    return this.http.get(this.snjomengdJsonDataUrl);
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Members, PaginationParams } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(private apiService: ApiService) {}

  getMembers = (url: string, params: PaginationParams): Observable<Members> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };

  addMember = (url: string, body: any): Observable<any> => {
    return this.apiService.post(url, body, {});
  };

  editMember= (url: string, body: any): Observable<any> => {
    return this.apiService.put(url, body, {});
  };

  deleteMember= (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  };
}

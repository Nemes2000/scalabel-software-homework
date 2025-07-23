import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Table } from '../models/table.model';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL_PREFIX } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private readonly tableUrl = BACKEND_URL_PREFIX + '/tables';
  constructor(private readonly http: HttpClient) {}

  getAllTables(): Observable<Table[]> {
    return this.http
      .get<Table[]>(this.tableUrl)
      .pipe(
        map((res: any) =>
          res.tables.sort((a: Table, b: Table) => a.name.localeCompare(b.name))
        )
      );
  }

  addTable(data: { name: string; seats: number }): Observable<Table> {
    return this.http
      .post<Table>(this.tableUrl, data)
      .pipe(map((res: any) => res.table));
  }

  deleteTable(id: string): Observable<any> {
    return this.http.delete(this.tableUrl + `/${id}`);
  }
}

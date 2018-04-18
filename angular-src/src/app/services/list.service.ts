import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { List } from '../models/List';

import 'rxjs/add/operator/map';

@Injectable()
export class ListService {
  constructor(private http: Http) {}

  private serverApi = 'http://localhost:3000';

  public getAllLists(): Observable<List[]> {
    const URI = `${this.serverApi}/bucketlist/`;
    return this.http
      .get(URI)
      .map(res => res.json())
      .map(res => <List[]>res.lists);
  }

  public deleteList(listId: string) {
    const URI = `${this.serverApi}/bucketlist/${listId}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(URI, { headers: headers }).map(res => res.json());
  }

  public addList(list: List) {
    const URI = `${this.serverApi}/bucketlist/`;
    const headers = new Headers();
    const body = JSON.stringify({
      title: list.title,
      description: list.description,
      category: list.category
    });
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(URI, body, { headers: headers })
      .map(res => res.json());
  }
}

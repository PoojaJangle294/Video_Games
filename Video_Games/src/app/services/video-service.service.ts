import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {

  constructor(private http: HttpClient, private route: Router) { }

  //base sever url
  serverapi = 'https://spa.api.logicloop.io/api/games';

  // get api for vedio dat with pagination params
  getVideoData(data: any) {
    let params = new HttpParams()
      .set('pagination[page]', data.page.toString()) // Set the page number
      .set('pagination[pageSize]', '10'); // Set the page size
    return this.http.get(this.serverapi, { params });
  }

  // get the filter data base on filter value
  getFilterData(filter: any) {
    let params = new HttpParams();
    if (filter.name) {
      params = params.append('filters[name][$startsWith]', filter.name);
    }
    if (filter.score) {
      params = params.append('filters[rating][$lte]', filter.score);
    }
    return this.http.get(this.serverapi, { params });
  }
}

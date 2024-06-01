import { Injectable } from '@angular/core';
import { getInfoInterface, updateInfoInterface } from '../../interfaces/api.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ConnectionApiService {
  readonly url: string = 'https://un7iot-api-universal-controller.onrender.com';
  readonly pathType: any = {
    get: "/get-info",
    update: "/update"
  }

  constructor(private http: HttpClient) { }

  getInfo(value: string): Observable<any> {
    const param = {'virtualPort': value};
    const completeUrl = `${this.url}${this.pathType.get}`;
    console.log(completeUrl, param);

    return this.http.post<any>(completeUrl, {params: param});
  }

  async update(virtualPort:string, value:string) {
    const param = { virtualPort, value };
    const completeUrl = `${this.url}${this.pathType.update}`;

    const response = await axios.post(completeUrl, param);
    const data:updateInfoInterface = await response.data;

    console.log(data);
  }
}
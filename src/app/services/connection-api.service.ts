import { Injectable } from '@angular/core';
import { getInfoInterface, updateInfoInterface } from '../interfaces/api.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getInfo(value: string): Observable<getInfoInterface> {
    const param = {'value': value};
    const completeUrl = `${this.url}${this.pathType.get}`;

    return this.http.post<getInfoInterface>(completeUrl, {params: param});
  }

  updateInfo(): updateInfoInterface {
    let returnedData: updateInfoInterface = {} as updateInfoInterface;

    return returnedData;
  }
}

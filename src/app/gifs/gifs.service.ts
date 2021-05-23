import { Gifs } from './../interfaces/gifs.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = "aQoWnsfi4cnfVHS3H2vCwIcsL6JzB2UP"


  constructor(private http: HttpClient) {
    
  }
  buscarGifs():Observable<Gifs> {
    return this.http.get<Gifs>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=homer%20simpson&limit=10`)
  }
}
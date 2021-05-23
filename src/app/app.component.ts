
import { GifsService } from './gifs/gifs.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'pealapp';
  gifsSubscription!: Subscription
  resultados: any[] = [
    { title: 'Vas a morir Moe', audio: new Audio('../assets/audio1.mp3'), image: '', isPlaying: false },
    { title: 'Hola Señor Thompson', audio: new Audio('../assets/audio2.mp3'), image: '', isPlaying: false },
    { title: 'Salvame Jebus', audio: new Audio('../assets/audio3.mp3'), image: '', isPlaying: false },
    { title: 'Australia, Estados, Australia, Estados', audio: new Audio('../assets/audio4.mp3'), image: '', isPlaying: false },
    { title: 'Inspeccion de billeteras', audio: new Audio('../assets/audio5.mp3'), image: '', isPlaying: false },
    { title: 'Ay esta grasa no se quita', audio: new Audio('../assets/audio6.mp3'), image: '', isPlaying: false },
    { title: 'Na na na Batman, digo Lider', audio: new Audio('../assets/audio7.mp3'), image: '', isPlaying: false },
    { title: 'Mira Bart este es un loquito', audio: new Audio('../assets/audio8.mp3'), image: '', isPlaying: false },
    { title: 'El coco está en la casa', audio: new Audio('../assets/audio9.mp3'), image: '', isPlaying: false },
    { title: 'Niam Niam Niam', audio: new Audio('../assets/audio10.mp3'), image: '', isPlaying: false }
  ]
  isPlaying: boolean = false
  j = 0;
  constructor(private gifsService: GifsService) { }
  ngOnInit() {
    this.gifsSubscription = this.gifsService.buscarGifs()
      .subscribe((resp: any) => {
        /* resp.data.map((item: any) => this.resultados.push(item.images.downsized_medium)) */
        for (let i = 0; i < resp.data.length; i++) {
          this.resultados[i].image = resp.data[i].images.downsized_medium.url
        }
      })
  }
  ngOnDestroy() {
    this.gifsSubscription.unsubscribe()
  }
  playSound(audio: any, num: number) {
    if (this.isPlaying) {
      this.isPlaying = false
      this.resultados[num].isPlaying = false
      audio.pause();
    }

    else if (!this.isPlaying) {
      this.isPlaying = true
      this.resultados[num].isPlaying = true
      audio.load()
      audio.play();
    }
  }
}

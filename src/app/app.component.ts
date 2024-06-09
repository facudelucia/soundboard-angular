
import { GifsService } from './gifs/gifs.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AudioItem, Gifs } from './interfaces/gifs.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'pealapp';

  gifsSubscription!: Subscription

  resultados: AudioItem[] = [
    { title: 'Vas a morir Moe', audio: new Audio('assets/audio1.mp3'), image: '', isPlaying: false },
    { title: 'Hola Señor Thompson', audio: new Audio('assets/audio2.mp3'), image: '', isPlaying: false },
    { title: 'Salvame Jebus', audio: new Audio('assets/audio3.mp3'), image: '', isPlaying: false },
    { title: 'Australia, Estados, Australia, Estados', audio: new Audio('assets/audio4.mp3'), image: '', isPlaying: false },
    { title: 'Inspeccion de billeteras', audio: new Audio('assets/audio5.mp3'), image: '', isPlaying: false },
    { title: 'Ay esta grasa no se quita', audio: new Audio('assets/audio6.mp3'), image: '', isPlaying: false },
    { title: 'Na na na Batman, digo Lider', audio: new Audio('assets/audio7.mp3'), image: '', isPlaying: false },
    { title: 'Mira Bart este es un loquito', audio: new Audio('assets/audio8.mp3'), image: '', isPlaying: false },
    { title: 'El coco está en la casa', audio: new Audio('assets/audio9.mp3'), image: '', isPlaying: false },
    { title: 'Niam Niam Niam', audio: new Audio('assets/audio10.mp3'), image: '', isPlaying: false }
  ]

  isPlaying: boolean = false

  j: number = 0;

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
    this.gifsSubscription = this.gifsService.buscarGifs()
      .subscribe((resp: Gifs) => {
        resp.data?.forEach((gif, index) => {
          if (this.resultados[index]) {
            this.resultados[index].image = gif.images?.downsized_medium?.url || '';
          }
        });
      })
  }

  ngOnDestroy(): void {
    if (this.gifsSubscription) {
      this.gifsSubscription.unsubscribe();
    }
  }

  playSound(audio: HTMLAudioElement, num: number): void {
    if (num < 0 || num >= this.resultados.length) {
      console.error('Index out of bounds');
      return;
    }

    const currentAudioItem = this.resultados[num];

    if (currentAudioItem.isPlaying) {
      this.stopAllAudio();
    } else {
      this.stopAllAudio();
      this.isPlaying = true;
      currentAudioItem.isPlaying = true;
      audio.load();
      audio.play();
    }
  }

  private stopAllAudio(): void {
    this.isPlaying = false;
    this.resultados.forEach(item => {
      if (item.isPlaying) {
        item.audio.pause();
        item.isPlaying = false;
      }
    });
  }

}

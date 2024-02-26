import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  settings = {
    counter: false,
    plugins: [lgZoom]
  };

  imageLinks: string[] = [
    'https://assets.popbuzz.com/2020/40/is-joji-pink-guy-are-they-the-same-person-1602077911-view-0.jpg',
    'https://i.etsystatic.com/19913145/r/il/993892/4865262854/il_570xN.4865262854_awu7.jpg',
    'https://i1.sndcdn.com/artworks-000105986104-hwbpls-t500x500.jpg',
    'https://assets.popbuzz.com/2020/40/is-joji-pink-guy-are-they-the-same-person-1602077911-view-0.jpg',
    'https://i.etsystatic.com/19913145/r/il/993892/4865262854/il_570xN.4865262854_awu7.jpg',
    'https://i1.sndcdn.com/artworks-000105986104-hwbpls-t500x500.jpg',
    'https://assets.popbuzz.com/2020/40/is-joji-pink-guy-are-they-the-same-person-1602077911-view-0.jpg',
    'https://i.etsystatic.com/19913145/r/il/993892/4865262854/il_570xN.4865262854_awu7.jpg',
    'https://i1.sndcdn.com/artworks-000105986104-hwbpls-t500x500.jpg',
    'https://assets.popbuzz.com/2020/40/is-joji-pink-guy-are-they-the-same-person-1602077911-view-0.jpg',
    'https://i.etsystatic.com/19913145/r/il/993892/4865262854/il_570xN.4865262854_awu7.jpg',
    'https://i1.sndcdn.com/artworks-000105986104-hwbpls-t500x500.jpg',
    'https://assets.popbuzz.com/2020/40/is-joji-pink-guy-are-they-the-same-person-1602077911-view-0.jpg',
    'https://i.etsystatic.com/19913145/r/il/993892/4865262854/il_570xN.4865262854_awu7.jpg',
    'https://i1.sndcdn.com/artworks-000105986104-hwbpls-t500x500.jpg',
    // Add more image links as needed
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };
}

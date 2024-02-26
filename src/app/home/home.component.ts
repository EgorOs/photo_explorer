import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import lgZoom from 'lightgallery/plugins/zoom';
import { ipcRenderer } from 'electron';
import * as fs from 'fs';
import { BeforeSlideDetail } from 'lightgallery/lg-events';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  settings = {
    counter: true,
    plugins: [lgZoom],
  };

  imageLinks: string[] = [
    'file:///home/egor/Projects/photo_explorer/images/copy_6.jpg',
    'file:///home/egor/Projects/photo_explorer/images/copy_6.jpg',
    'file:///home/egor/Projects/photo_explorer/images/copy_6.jpg',
    'file:///home/egor/Projects/photo_explorer/images/copy_6.jpg',
    'file:///home/egor/Projects/photo_explorer/images/copy_6.jpg',
    'https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1406&q=80',
    'https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1406&q=80',
    'https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1406&q=80',
    'https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1406&q=80',
    'https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1406&q=80',
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

  images: string[] = [];

  loadImagesFromFolder(folderPath: string) {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error('Error reading folder:', err);
        return;
      }
      this.images = files
        .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file)) // Filter image files
        .map(file => `file://${folderPath}/${file}`); // Convert file paths to URLs
    });
  }

  openFolderDialog() {
    // @ts-ignore
    ipcRenderer.invoke('open-dialog', { properties: ['openDirectory'] }).then(result => {
      if (!result.canceled && result.filePaths.length > 0) {
        const folderPath = result.filePaths[0];
        this.loadImagesFromFolder(folderPath);
      }
    });
  }
}
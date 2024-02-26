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
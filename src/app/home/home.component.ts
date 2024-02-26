import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { ipcRenderer } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  settings = {
    counter: true,
    thumbnail:true,
    animateThumb: false,
    showThumbByDefault: false,
    plugins: [lgZoom, lgThumbnail],
  };

  constructor(private router: Router, private imageCompress: NgxImageCompressService) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  images: string[] = [];
  thumbnails: string[] = [];

  loadImagesFromFolder(folderPath: string) {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error('Error reading folder:', err);
        return;
      }
      this.images = files
        .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
        .map(file => `file://${path.join(folderPath, file)}`);
      
        this.resizeImages();
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

  async resizeImages() {
    for (const imageFile of this.images) {
      try {
        const resizedImage = await this.imageCompress.compressFile(imageFile, -1, 50, 50, 300);
        this.thumbnails.push(resizedImage);
      } catch (error) {
        console.error('Error resizing image:', error);
      }
    }
  }

}
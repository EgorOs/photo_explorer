import { Component, OnInit, ViewEncapsulation, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import lgZoom from 'lightgallery/plugins/zoom';
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
    plugins: [lgZoom],
  };

  constructor(
    private router: Router, private imageCompress: NgxImageCompressService, private renderer: Renderer2, private elementRef: ElementRef
    ) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  images: string[] = [];
  thumbnails: string[] = [];
  iconSizeSlider: number = 100;

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

  onSliderChange(event: Event) {
    const elements = this.elementRef.nativeElement.querySelectorAll('.img-responsive-wrapper');

    // @ts-ignore
    elements.forEach(element => {
      this.renderer.setStyle(element, 'height', this.iconSizeSlider + 'px');
    });
  }
}
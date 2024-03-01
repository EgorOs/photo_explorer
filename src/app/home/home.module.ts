import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightgalleryModule } from 'lightgallery/angular';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule, LightgalleryModule]
})
export class HomeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import {HomeComponent} from './home.component'
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    DashboardComponent, HomeComponent
  ],
  imports: [
    CommonModule, HomeRoutingModule
  ]
})
export class HomeModule { }

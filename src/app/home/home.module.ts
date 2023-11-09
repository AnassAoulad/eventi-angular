import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import {HomeComponent} from './home.component'
import { HomeRoutingModule } from './home-routing.module';
import { ListEventsComponent } from './components/dashboard/list-events/list-events.component';
import { ItemEventComponent } from './components/dashboard/item-event/item-event.component';
import { FormsModule } from '@angular/forms';
import { DetailEventComponent } from './views/detail-event/detail-event.component';



@NgModule({
  declarations: [
    DashboardComponent, HomeComponent, ListEventsComponent, ItemEventComponent, DetailEventComponent
  ],
  imports: [
    CommonModule, HomeRoutingModule, FormsModule
  ]
})
export class HomeModule { }

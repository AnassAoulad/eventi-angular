import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import {HomeComponent} from './home.component'
import { HomeRoutingModule } from './home-routing.module';
import { ListEventsComponent } from './components/dashboard/list-events/list-events.component';
import { ItemEventComponent } from './components/dashboard/item-event/item-event.component';



@NgModule({
  declarations: [
    DashboardComponent, HomeComponent, ListEventsComponent, ItemEventComponent
  ],
  imports: [
    CommonModule, HomeRoutingModule
  ]
})
export class HomeModule { }

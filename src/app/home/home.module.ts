import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import {HomeComponent} from './home.component'
import { HomeRoutingModule } from './home-routing.module';
import { ListEventsComponent } from './components/dashboard/list-events/list-events.component';
import { ItemEventComponent } from './components/dashboard/item-event/item-event.component';
import { FormsModule } from '@angular/forms';
import { DetailEventComponent } from './views/detail-event/detail-event.component';
import { ItemTaskComponent } from './components/detail-event/item-task/item-task.component';
import { SharedModule } from '../shared/shared.module';

<<<<<<< HEAD
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
=======

>>>>>>> creation-list-events

@NgModule({
  declarations: [
    DashboardComponent, HomeComponent, ListEventsComponent, ItemEventComponent, DetailEventComponent, ItemTaskComponent
  ],
  imports: [
<<<<<<< HEAD
    CommonModule, HomeRoutingModule, FormsModule, SharedModule,
    MatButtonModule,MatIconModule,MatTooltipModule,MatCardModule,
    MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,
    MatGridListModule
=======
    CommonModule, HomeRoutingModule, FormsModule, SharedModule
>>>>>>> creation-list-events
  ]
})
export class HomeModule { }

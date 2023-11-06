import { Component, Input } from '@angular/core';
import { Evenement } from 'src/app/core/models/event.model';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent {
  @Input() events : Evenement[] = [];
}

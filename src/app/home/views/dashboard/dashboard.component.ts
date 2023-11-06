import { Component } from '@angular/core';
import { Evenement } from 'src/app/core/models/event.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public events : Evenement[] = [{name: 'Event1', description: "Je suis event1"},{name: 'Event2', description: "Je suis event2"} ]
}

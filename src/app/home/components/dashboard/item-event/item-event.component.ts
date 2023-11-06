import { Component, Input } from '@angular/core';
import { Evenement } from 'src/app/core/models/event.model';

@Component({
  selector: 'app-item-event',
  templateUrl: './item-event.component.html',
  styleUrls: ['./item-event.component.scss']
})
export class ItemEventComponent {

  @Input() event: Evenement = {name: '', description: ''};
}

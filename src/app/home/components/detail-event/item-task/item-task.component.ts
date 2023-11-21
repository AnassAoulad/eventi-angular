import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatusEvent, Task } from 'src/app/core/models/task.model';


@Component({
  selector: 'app-item-task',
  templateUrl: './item-task.component.html',
  styleUrls: ['./item-task.component.scss']
})
export class ItemTaskComponent {

  @Input() task: Task = {id: '', name: '', description: '', date_echeance: "", id_event: "", id_user:"", status: StatusEvent.progress};
  @Output() onUpdate = new EventEmitter();
  @Output() onDelete = new EventEmitter();


  public editMode: boolean = false;

  public updateTask(){
    this.onUpdate.emit(this.task);
    this.editMode = false;
  }

  public deleteTask(){
    this.onDelete.emit(this.task.id);
  }

  public updateStatusTask(){
    if(this.task.status === StatusEvent.done){
      this.onUpdate.emit({...this.task, status: StatusEvent.progress});
    }
    else{
      this.onUpdate.emit({...this.task, status: StatusEvent.done});
    }
    
  }
}

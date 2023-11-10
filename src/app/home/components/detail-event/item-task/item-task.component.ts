import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';


@Component({
  selector: 'app-item-task',
  templateUrl: './item-task.component.html',
  styleUrls: ['./item-task.component.scss']
})
export class ItemTaskComponent {

  @Input() task: Task = {id: '', name: '', description: '', date: "", idEvent: "", idUser:"", status: ""};
  @Output() onUpdate = new EventEmitter();
  @Output() onDelete = new EventEmitter();


  public editMode: boolean = false;

  public updateTask(){
    this.onUpdate.emit(this.task)
    this.editMode = false;
  }

  public deleteTask(){
    this.onDelete.emit(this.task.id)
  }

  public detailTask(){

  }
}

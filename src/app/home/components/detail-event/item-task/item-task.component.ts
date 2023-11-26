import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { StatusEvent, Task } from 'src/app/core/models/task.model'
import { User } from 'src/app/core/models/user.model'


@Component({
	selector: 'app-item-task',
	templateUrl: './item-task.component.html',
	styleUrls: ['./item-task.component.scss']
})
export class ItemTaskComponent implements OnInit {
	public date: any
	public editMode: boolean = false

	@Input() task: Partial<Task> = { id: '', name: '', description: '', id_event: '', id_user: '', status: StatusEvent.progress }
	@Input() listUsers: User[] = []
	@Input() user: any
	@Output() onUpdate = new EventEmitter()
	@Output() onDelete = new EventEmitter()

	ngOnInit(): void {
		this.date = this.task?.date_echeance?.toDate()
	}

	public updateTask() {
		this.onUpdate.emit(this.task)
		this.editMode = false
	}

	public deleteTask() {
		this.onDelete.emit(this.task.id)
	}

	public updateStatusTask() {
		if (this.task.status === StatusEvent.done) {
			this.onUpdate.emit({ ...this.task, status: StatusEvent.progress })
		}
		else {
			this.onUpdate.emit({ ...this.task, status: StatusEvent.done })
		}

	}

	public updateUserTask(event: any) {
		this.onUpdate.emit({ ...this.task, id_user: event.value.id })
	}
}

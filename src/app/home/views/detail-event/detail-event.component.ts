import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentData, DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import { Evenement } from 'src/app/core/models/event.model';
import { Task } from 'src/app/core/models/task.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css']
})
export class DetailEventComponent implements OnInit{
 public event!: Evenement;
 
  constructor(private route:ActivatedRoute, private firebaseService : FirebaseService){
  }

  public eventID: string = "";
  public taskCollectionData: any = [];
  
  ngOnInit(){
    this.route.params.subscribe( params => {
      this.eventID = params['id'];
      const snapshot = this.firebaseService.getEventById(this.eventID);
      snapshot.then((data) => this.event = data as Evenement);

      

    }
  )
  this.get();
  this.firebaseService.obsr_UpdatedSnapshot.subscribe((snapshot) => {
    this.updateTaskCollection(snapshot);
  })
  }

  async get() {
    const snapshot = await this.firebaseService.getTasksById(this.eventID);
    this.updateTaskCollection(snapshot);
  }

  updateTaskCollection(snapshot: QuerySnapshot<DocumentData>) {
    this.taskCollectionData = [];
    snapshot.docs.forEach((task) => {
      this.taskCollectionData.push({ ...task.data(), id: task.id });
    })
  }

  public getDj(){

  }

  async updateTask(task: Task){
    console.log('update event home =', task);
    await this.firebaseService.updateTask(task);
  }

  async deleteTask(id: string){
    await this.firebaseService.deleteTask(id)
  }

  
}

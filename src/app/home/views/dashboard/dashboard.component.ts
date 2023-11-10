import { Component, OnInit } from '@angular/core';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { Evenement } from 'src/app/core/models/event.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  public eventCollectiondata: any = [];
  public eventDetail: Evenement = {name: "", description: "", id:"", id_dj: ""}

  constructor(private firebaseService: FirebaseService){}

  ngOnInit(): void {
    this.get();
    this.firebaseService.obsr_UpdatedSnapshot.subscribe((snapshot) => {
      this.updateStudentCollection(snapshot);
    })
  }

  async get() {
    const snapshot = await this.firebaseService.getEvents();
    this.updateStudentCollection(snapshot);
  }

  updateStudentCollection(snapshot: QuerySnapshot<DocumentData>) {
    this.eventCollectiondata = [];
    snapshot.docs.forEach((student) => {
      this.eventCollectiondata.push({ ...student.data(), id: student.id });
    })
  }

  async updateEvent(event: Evenement){
    console.log('update event home =', event);
    await this.firebaseService.updateEvent(event);
  }

  async deleteEvent(id: string){
    await this.firebaseService.deleteEvent(id)
  }



}

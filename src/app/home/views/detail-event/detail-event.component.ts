import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentData, DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import { Evenement } from 'src/app/core/models/event.model';
import { Prestataire, ServiceType } from 'src/app/core/models/prestataire.model';
import { Task } from 'src/app/core/models/task.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css']
})
export class DetailEventComponent implements OnInit{
 public event: Evenement = {id: "1", name:"", description:"", id_dj:"", id_traiteur:""};
 
  constructor(private route:ActivatedRoute, private firebaseService : FirebaseService){
  }

  public eventID: string = "";
  public taskCollectionData: any = [];
  public listTasksDone: Task[] = [];
  public listTasksInProgress: Task[] = [];
  public listDJ: any = [];
  public listTraiteur: any = []

  public dj?: Prestataire;
  public traiteur?: Prestataire;
  
  ngOnInit(){
    this.route.params.subscribe( params => {
      this.eventID = params['id'];
      const snapshot = this.firebaseService.getEventById(this.eventID);
      snapshot.then((data) => this.event = data as Evenement);
    }
  )
  this.get();
  this.getPrestataire();
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

    this.listTasksInProgress = this.taskCollectionData.filter((data: Task) => data.status !== "done")
    this.listTasksDone = this.taskCollectionData.filter((data: Task) => data.status === "done");
  }

  public async getPrestataire(){
    const snapshotDj = await this.firebaseService.getPrestataireByType(ServiceType.dj);
    const snapshotTraiteur = await this.firebaseService.getPrestataireByType(ServiceType.traiteur);

    snapshotDj.docs.forEach((dj) => {
      this.listDJ.push({ ...dj.data(), id: dj.id });
    });

    snapshotTraiteur.docs.forEach((traiteur) => {
      this.listTraiteur.push({ ...traiteur.data(), id: traiteur.id });
    })

    this.dj = this.listDJ.find((data: Prestataire) => data.id === this.event.id_dj);
    this.traiteur = this.listTraiteur.find((data: Prestataire) => data.id === this.event.id_traiteur);
  }

  async updateTask(task: Task){
    console.log('update event home =', task);
    await this.firebaseService.updateTask(task);
  }

  async deleteTask(id: string){
    await this.firebaseService.deleteTask(id)
  }

  
}

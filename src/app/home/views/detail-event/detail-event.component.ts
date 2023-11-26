import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentData, DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import { Evenement } from 'src/app/core/models/event.model';
import { Prestataire, ServiceType } from 'src/app/core/models/prestataire.model';
import { StatusEvent, Task } from 'src/app/core/models/task.model';
import { User } from 'src/app/core/models/user.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss']
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
  public listUsers: any = []

  public showInfoDj: boolean = false;
  public showInfoTraiteur: boolean = false;
  public showFormCreateTask: boolean = false;
  public newTask: Partial<Task> = {};

  public dj: Partial<Prestataire> = {name:""};
  public traiteur: Partial<Prestataire> = {name:""};
  
  ngOnInit(){
    this.route.params.subscribe( params => {
      this.eventID = params['id'];
      const snapshot = this.firebaseService.getEventById(this.eventID);
      snapshot.then((data) => this.event = data as Evenement);
    }
  )
  this.getTasks();
  this.getPrestataire();
  this.getUsers();
  this.firebaseService.obsr_UpdatedSnapshotTask.subscribe((snapshot) => {
    this.updateTaskCollection(snapshot);
  })
  }


  async getTasks() {
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

  public async getUsers(){
    this.listUsers = [];
    const snapshot = await this.firebaseService.getUsers();
    snapshot.docs.forEach((user) => {
      this.listUsers.push({ ...user.data(), id: user.id });
    });
  }

  async updateTask(task: Task){
    await this.firebaseService.updateTask(task);
  }

  async createTask(){
    await this.firebaseService.createTask({...this.newTask, id_event: this.eventID, status: StatusEvent.progress });
    this.showFormCreateTask = false;
    this.newTask = {};
  }

  async deleteTask(id: string){
    await this.firebaseService.deleteTask(id)
  }

  async updateDjEvent(event:any){
    await this.firebaseService.updateEvent({...this.event, id_dj: event.value.id, id: this.eventID})
  }

  async updateTraiteurEvent(event:any){
    await this.firebaseService.updateEvent({...this.event, id_traiteur: event.value.id, id: this.eventID})
  }

  public getUserPerTask(task: Task){
    const user = this.listUsers.find((data:User) => data.id === task.id_user );
    return user;
  }
  
}

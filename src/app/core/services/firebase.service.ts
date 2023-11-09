import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot, getDoc, query, where } from 'firebase/firestore'
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evenement } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  db: Firestore;
  eventCol: CollectionReference<DocumentData>;
  taskCol: CollectionReference<DocumentData>;
  private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();
  obsr_UpdatedSnapshot = this.updatedSnapshot.asObservable();

  constructor() { 
    initializeApp(environment.firebaseConfig);
    this.db = getFirestore();
    this.eventCol = collection(this.db, 'Evenement');
    this.taskCol = collection(this.db, 'Taches');

    // Get Realtime Data
    onSnapshot(this.eventCol, (snapshot) => {
      this.updatedSnapshot.next(snapshot);
    }, (err) => {
      console.log(err);
    })

    onSnapshot(this.taskCol, (snapshot) => {
      this.updatedSnapshot.next(snapshot);
    }, (err) => {
      console.log(err);
    })
  }

  async getEvents() {
    const snapshot = await getDocs(this.eventCol);
    return snapshot;
  } 

  async getEventById(id: string) {
    const docRef = doc(this.db, "Evenement", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return;
    }
  }

  async addEvent(event: Evenement) {
    await addDoc(this.eventCol, {
      ...event
    })
    return;
  }

  async deleteEvent(id: string) {
    const docRef = doc(this.db, 'Evenement', id)
    await deleteDoc(docRef);
  }

  async updateEvent(event: Evenement) {
    const docRef = doc(this.db, 'Evenement', event.id);
    await updateDoc(docRef, { ...event })
  }

  async getTasksById(idEvent: string) {
    const q = query(this.taskCol, where("idEvenement", "==", idEvent));
    const snapshot = await getDocs(q);
    return snapshot;
  }
}

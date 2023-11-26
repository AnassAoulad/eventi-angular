import { Injectable } from '@angular/core'
import { initializeApp } from 'firebase/app'
import { Firestore, getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot, getDoc, query, where } from 'firebase/firestore'
import { Subject } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Evenement } from '../models/event.model'
import { Task } from '../models/task.model'
import { ServiceType } from '../models/prestataire.model'

@Injectable({
	providedIn: 'root'
})
export class FirebaseService {

	db: Firestore
	eventCol: CollectionReference<DocumentData>
	taskCol: CollectionReference<DocumentData>
	userCol: CollectionReference<DocumentData>
	prestataireCol: CollectionReference<DocumentData>
	private updatedSnapshotEvent = new Subject<QuerySnapshot<DocumentData>>()
	private updatedSnapshotTask = new Subject<QuerySnapshot<DocumentData>>()
	obsr_UpdatedSnapshotEvent = this.updatedSnapshotEvent.asObservable()
	obsr_UpdatedSnapshotTask = this.updatedSnapshotTask.asObservable()

	constructor() { 
		initializeApp(environment.firebaseConfig)
		this.db = getFirestore()
		this.eventCol = collection(this.db, 'Evenement')
		this.taskCol = collection(this.db, 'Taches')
		this.userCol = collection(this.db, 'Utilisateurs')
		this.prestataireCol = collection(this.db, 'Prestataire')

		// Get Realtime Data

		onSnapshot(this.taskCol, (snapshot) => {
			this.updatedSnapshotTask.next(snapshot)
		}, (err) => {
			console.log(err)
		})  

		onSnapshot(this.eventCol, (snapshot) => {
			this.updatedSnapshotEvent.next(snapshot)
		}, (err) => {
			console.log(err)
		})

   
	}

	async getEvents() {
		const snapshot = await getDocs(this.eventCol)
		return snapshot
	} 

	async getEventById(id: string) {
		const docRef = doc(this.db, 'Evenement', id)
		const snapshot = await getDoc(docRef)
		if (snapshot.exists()) {
			return snapshot.data()
		} else {
			console.log('No such document!')
			return
		}
	}

	async addEvent(event: Evenement) {
		await addDoc(this.eventCol, {
			...event
		})
		return
	}

	async deleteEvent(id: string) {
		const docRef = doc(this.db, 'Evenement', id)
		await deleteDoc(docRef)
	}

	async updateEvent(event: Evenement) {
		const docRef = doc(this.db, 'Evenement', event.id)
		await updateDoc(docRef, { ...event })
	}

	async getTasksById(idEvent: string) {
		const q = query(this.taskCol, where('id_event', '==', idEvent))
		const snapshot = await getDocs(q)
		return snapshot
	}

	async deleteTask(id: string) {
		const docRef = doc(this.db, 'Taches', id)
		await deleteDoc(docRef)
	}

	async updateTask(task: Task) {
		const docRef = doc(this.db, 'Taches', task.id)
		await updateDoc(docRef, { ...task })
	}

	async createTask(task: Partial<Task>) {
		await addDoc(this.taskCol, {
			...task
		})
		return
	}

	async getPrestataireByType(type: ServiceType){
		const q = query(this.prestataireCol, where('type_service', '==', type))
		const snapshot = await getDocs(q)
		return snapshot
	}

	async getUsers(){
		const snapshot = await getDocs(this.userCol)
		return snapshot
	}
  
}

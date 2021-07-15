import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Confession } from 'src/app/models/confession.model';

@Injectable({
  providedIn: 'root'
})
export class ConfessService {

  constructor(private db: AngularFirestore) { }

  public async create(content: string) {
    let time = Date.now();
    await this.db.collection("confession").doc(time.toString()).set({
      time: time,
      content: content
    });
  }
  public async read(): Promise<Confession[]> {
    let snapshot = await this.db.collection("confession").ref.orderBy("time", "desc").limit(100).get();
    return snapshot.docs.map((v) => <Confession>v.data());
  }
}

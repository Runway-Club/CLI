import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Link } from 'src/app/models/link.model';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private db: AngularFirestore) { }

  public async createLink(data: Link): Promise<void> {
    let snapshot = await this.db.collection("links").doc(data.name).get().toPromise();
    if (snapshot.exists) {
      throw "Đã tồn tại tên " + data.name;
    }
    await this.db.collection("links").doc(data.name).set({ ...data });
  }

  public async getLink(name: string): Promise<Link> {
    let snapshot = await this.db.collection("links").doc(name).get().toPromise();
    if (!snapshot.exists) {
      throw new Error("Không tìm thấy: " + name);
    }
    return <Link>snapshot.data();
  }

}

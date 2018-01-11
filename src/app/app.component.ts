import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  users : User[] = [];

  constructor(private db : AngularFireDatabase){}
  
  ngOnInit(){
    var x = this.db.list('users');
    x.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.users.push(y as User);
        console.log(y);
      });
    });
  }

}
interface User {
  name : string;
  lastName : string;
  state : string;
}
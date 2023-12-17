import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-one-user',
  templateUrl: './one-user.component.html',
  styleUrls: ['./one-user.component.css']
})
export class OneUserComponent implements OnInit {
  @Input() user!: User;
  @Output() deleteEvent = new EventEmitter<User>();
  constructor() { }

  ngOnInit(): void {
  }
  supprimer() {
    this.deleteEvent.emit(this.user);
  }
}
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'User';

  Listusers: any = [];
  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.getAllUsers().subscribe(
      (data: any) => {
        this.Listusers = data;
        console.log(this.Listusers);
      },

    );

  }

  supprimer(user: User) {
    this.auth.deleteUser(user.key).subscribe(
      (data: any) => {
        this.Listusers = data;
        console.log(this.Listusers);
      }
    );
  }
}
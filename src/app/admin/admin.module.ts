import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { OneUserComponent } from './one-user/one-user.component';
import { UsersComponent } from './users/users.component';

const authroutes: Routes = [

  { path: 'myadmin', component: AdminComponent },
  { path: 'users', component: UsersComponent },

];

@NgModule({
  declarations: [
    UsersComponent,
    OneUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authroutes)

  ]
})

export class AdminModule { }
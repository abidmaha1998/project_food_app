import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  email: string = '';
  password: string = '';


  constructor(private Auth: AuthService, private formBuilder: FormBuilder, private route: Router) {
    if (this.Auth.isLoggedIn()) {
      alert("Already logged In");
      this.route.navigateByUrl('/home');
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      "email": new FormControl('', [Validators.required, Validators.email]),
      "password": new FormControl('', Validators.required),
    });
  }

  loginUser() {
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    if (this.email && this.password) {
      this.Auth.getUserLog().subscribe(
        (res) => {
          const user = res.find((a: any) => {
            return (
              a.email == this.email &&
              a.password == this.decodePass(this.password)
            );
          });

          if (user) {
            if (user.role === 'Admin') {
              this.route.navigateByUrl('/admin/myadmin');
            } else {
              this.Auth.setToken('YourGeneratedTokenHere');
              this.loginForm.reset();
              this.Auth.isLogged = true;
              this.route.navigateByUrl('/home');
              alert('Successfully Logged In');
            }
          } else {
            alert('Login Failed');
          }
        },
        (err) => {
          alert('Something Went wrong! Server side Error ');
          throw new Error(err);
        }
      );
    }
  }
  decodePass(pass: string) {
    const PassMD5 = Md5.hashStr(pass).toString();
    return PassMD5;
  }

  get Email(): any {
    return this.loginForm.get('email');
  }

  get Passwd(): any {
    return this.loginForm.get('password');
  }
}
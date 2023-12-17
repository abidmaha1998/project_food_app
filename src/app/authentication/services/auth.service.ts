import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ApiUrl = "http://localhost:3000/";

  isLogged: boolean = false;
  private authToken: string | null = null;

  constructor(private http: HttpClient, private route: Router) {
  }

  getUserLog() {
    return this.http.get<any>(this.ApiUrl + "userAcc");
  }

  postUserLog(data: any) {
    return this.http.post<any>(this.ApiUrl + "userAcc", data);
  }

  setToken(token: string): void {
    this.authToken = token;
  }

  getToken(): string | null {
    return this.authToken;
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    this.authToken = null;
    alert("Successfully Logout");
    this.route.navigateByUrl('/home');
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:3000/userAcc");
  }

  updateUser(id: number, newuser: any): Observable<any> {
    return this.http.put<any>("http://localhost:3000/userAcc", newuser);
  }

  deleteUser(key: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/userAcc/${key}`);
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { HomeComponent } from './main/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { CartComponent } from './main/cart/cart.component';
import { HttpClientModule } from '@angular/common/http'
import { SearchComponent } from './main/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowFoodComponent } from './main/show-food/show-food.component';
import { TagsComponent } from './main/tags/tags.component';
import { CheckoutComponent } from './main/checkout/checkout.component';
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CartComponent,
    SearchComponent,
    ShowFoodComponent,
    TagsComponent,
    CheckoutComponent,
    AdminComponent,
    LandingComponent,
    AboutComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    AuthenticationModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
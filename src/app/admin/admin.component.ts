import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from './services/admin.service';
import { Food } from 'src/app/models/Food';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  menusItem: Food[] | undefined
  updatedish: any | undefined
  showAddPopup = false;
  showEditPopup = false;
  selectedItem: any = {};
  addDishForm: FormGroup;

  constructor(private adminService: AdminService, private http: HttpClient, private fb: FormBuilder,) {

    this.addDishForm = this.fb.group({
      name: [''],
      price: [''],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.getMealData();

  }
  postDate(meal: Food) {
    this.http.post('http://localhost:3000/food', meal).subscribe((res) => {
      console.log(res)
    })

  }
  refreshPage(): void {
    setTimeout(function () {
      location.reload();
    }, 1000);
  }

  deleteDish(id: number) {
    const confirmDelete = confirm("Are you sure want to delete this dish?")
    if (confirmDelete) {
      this.http.delete(`http://localhost:3000/food/${id}`).subscribe((res) => {

        this.getMealData()
      })
    }
  }

  getMealData(): void {
    this.http.get<Food[]>('http://localhost:3000/food?_page=1&_limit=20').subscribe((result) => {

      this.menusItem = result
    })
  }

  showEditPopupFun(id: number): void {

    this.showEditPopup = true;
    this.http.get<any>(`http://localhost:3000/food/${id}`).subscribe((res) => {

      this.selectedItem = res;

    })
  }
  newImageUrl: string = '';

  updateDish(data: any) {
    const confirmUpdate = confirm("Are you sure you want to update this dish?");

    if (confirmUpdate) {
      this.showEditPopup = true;
    }
  }

  onSubmit() {
    const updatedData = {
      ...this.selectedItem,
      imageUrl: this.newImageUrl,
    };

    this.http.put(`http://localhost:3000/food/${this.selectedItem.id}`, updatedData).subscribe((res) => {
      alert("Dish updated successfully");
      this.getMealData();

      this.showEditPopup = false;
    });

  }
  saveChanges(): void {
    this.showEditPopup = false;
  }

  closeEditPopup(): void {
    this.showEditPopup = false;
  }
  closeAddPopup(): void {
    this.showAddPopup = false;
  }

  addDish(): void {
    const newDishData = this.addDishForm.value;

    this.adminService.addDish(newDishData).subscribe(
      (res) => {
        console.log(res);
        this.getMealData();
        this.showAddPopup = false;
        alert("Dish Add successfully");

      },
      (error) => {
        console.error('Erreur lors de l\'ajout du plat : ', error);
      }
    );
  }
  openAddPopup(): void {
    this.showAddPopup = true;
  }
}
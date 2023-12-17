import { FoodService } from '../../services/food.service';
import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];
  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodService.getAllTags().subscribe((res) => {
      if (res) {
        this.tags = res.filter(tag => tag.count != 0);

      }
    })
  }
}
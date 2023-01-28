import {Component, OnInit} from '@angular/core';
import { SearchItemComponent} from "../search-item/search-item.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-display-item',
  templateUrl: './display-item.component.html',
  styleUrls: ['./display-item.component.css'],
  // providers: [SearchItemComponent]
})
export class
DisplayItemComponent implements OnInit{
  // name: any;
  // origin: any;
  // miles: any;
  food:any;
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.food = JSON.parse(params['response']);
      console.log(this.food);
      // do something with this.userId
    });
  }

}

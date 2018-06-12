import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  @Input() staredItem: string;
  stared;

  constructor() {
  }

  ngOnInit() {
    this.statusOfItem();
  }

  statusOfItem() {
    if (!localStorage.getItem(this.staredItem)) {
      return this.stared = false;
    } else {
      return this.stared = true;
    }
  }

  changeStatus() {
    this.stared = !this.stared;
    if (this.stared) {
      localStorage.setItem(this.staredItem, 'stared');
      console.log(`${this.staredItem} = stared`);
    }
    else if (!this.stared) {
      localStorage.removeItem(this.staredItem);
      console.log(`${this.staredItem} = not stared anymore`);
    }
  }


}

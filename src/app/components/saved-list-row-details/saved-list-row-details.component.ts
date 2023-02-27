import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-row-details',
  templateUrl: './saved-list-row-details.component.html',
  styleUrls: ['./saved-list-row-details.component.css']
})
export class SavedListRowDetailsComponent {
  @Input() createdAt: undefined;
  @Input() listDetails: undefined;
}

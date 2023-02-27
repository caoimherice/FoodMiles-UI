import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedListRowDetailsComponent } from './saved-list-row-details.component';

describe('SavedListRowDetailsComponent', () => {
  let component: SavedListRowDetailsComponent;
  let fixture: ComponentFixture<SavedListRowDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedListRowDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedListRowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

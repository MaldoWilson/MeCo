import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DataControlsPage } from './data-controls.page';

describe('DataControlsPage', () => {
  let component: DataControlsPage;
  let fixture: ComponentFixture<DataControlsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DataControlsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

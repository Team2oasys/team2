import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteByIdComponent } from './delete-by-id.component';

describe('DeleteByIdComponent', () => {
  let component: DeleteByIdComponent;
  let fixture: ComponentFixture<DeleteByIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteByIdComponent]
    });
    fixture = TestBed.createComponent(DeleteByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

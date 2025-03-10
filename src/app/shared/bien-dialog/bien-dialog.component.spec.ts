import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienDialogComponent } from './bien-dialog.component';

describe('BienDialogComponent', () => {
  let component: BienDialogComponent;
  let fixture: ComponentFixture<BienDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BienDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

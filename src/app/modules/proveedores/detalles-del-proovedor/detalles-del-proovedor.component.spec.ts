import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesDelProovedorComponent } from './detalles-del-proovedor.component';

describe('DetallesDelProovedorComponent', () => {
  let component: DetallesDelProovedorComponent;
  let fixture: ComponentFixture<DetallesDelProovedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesDelProovedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesDelProovedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProovedorComponent } from './editar-proovedor.component';

describe('EditarProovedorComponent', () => {
  let component: EditarProovedorComponent;
  let fixture: ComponentFixture<EditarProovedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarProovedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarProovedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

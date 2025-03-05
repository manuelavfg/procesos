import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCodigoComponent } from './auth-codigo.component';

describe('AuthCodigoComponent', () => {
  let component: AuthCodigoComponent;
  let fixture: ComponentFixture<AuthCodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthCodigoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

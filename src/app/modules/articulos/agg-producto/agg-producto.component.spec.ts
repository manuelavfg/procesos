import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggProductoComponent } from './agg-producto.component';

describe('AggProductoComponent', () => {
  let component: AggProductoComponent;
  let fixture: ComponentFixture<AggProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

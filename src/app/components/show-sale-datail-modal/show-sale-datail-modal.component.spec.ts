import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowSaleDatailModalComponent } from './show-sale-datail-modal.component';

describe('ShowSaleDatailModalComponent', () => {
  let component: ShowSaleDatailModalComponent;
  let fixture: ComponentFixture<ShowSaleDatailModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ShowSaleDatailModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowSaleDatailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

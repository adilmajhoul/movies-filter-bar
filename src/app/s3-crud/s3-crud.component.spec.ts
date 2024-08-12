import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S3CrudComponent } from './s3-crud.component';

describe('S3CrudComponent', () => {
  let component: S3CrudComponent;
  let fixture: ComponentFixture<S3CrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [S3CrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(S3CrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

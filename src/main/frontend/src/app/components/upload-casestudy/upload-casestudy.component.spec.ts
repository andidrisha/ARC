import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCasestudyComponent } from './upload-casestudy.component';

describe('UploadCasestudyComponent', () => {
  let component: UploadCasestudyComponent;
  let fixture: ComponentFixture<UploadCasestudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCasestudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCasestudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

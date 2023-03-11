import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PostCreateComponent } from './post-create.component';

describe('PostCreateComponent', () => {
  let component: PostCreateComponent;
  let fixture: ComponentFixture<PostCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCreateComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a FormGroup containing the correct form controls', () => {
    expect(component.postForm.controls['title']).toBeTruthy();
    expect(component.postForm.controls['content']).toBeTruthy();
  });

  it('should not allow the form to be submitted if it is invalid', () => {
    spyOn(component, 'onSavePost');
    component.onSubmit();
    expect(component.onSavePost).not.toHaveBeenCalled();
  });

  it('should allow the form to be submitted if it is valid', () => {
    spyOn(component, 'onSavePost');
    component.postForm.setValue({
      title: 'Test Title',
      content: 'Test Content',
    });
    component.onSubmit();
    expect(component.onSavePost).toHaveBeenCalled();
  });
});

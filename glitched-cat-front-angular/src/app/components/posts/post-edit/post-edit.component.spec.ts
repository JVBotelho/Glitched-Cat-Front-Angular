import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { PostEditComponent } from './post-edit.component';
import { PostService } from '../post.service';
import { Post } from '../post.model';

describe('PostEditComponent', () => {
  let component: PostEditComponent;
  let fixture: ComponentFixture<PostEditComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;

  const testPost: Post = {
    id: '1',
    title: 'Test Post',
    content: 'Test Content',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(async () => {
    postServiceSpy = jasmine.createSpyObj('PostService', ['getPostById', 'updatePost']);

    await TestBed.configureTestingModule({
      declarations: [PostEditComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: testPost.id })) } },
        { provide: PostService, useValue: postServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEditComponent);
    component = fixture.componentInstance;
    postServiceSpy.getPostById.and.returnValue(of(testPost));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the form with the post data', () => {
    expect(component.postForm.value.title).toBe(testPost.title);
    expect(component.postForm.value.content).toBe(testPost.content);
  });

  it('should call the postService.updatePost method with the updated post data', () => {
    component.postForm.setValue({
      title: 'Updated Title',
      content: 'Updated Content',
    });
    component.onSubmit();
    const expectedPost: Post = { ...testPost, title: 'Updated Title', content: 'Updated Content' };
    expect(postServiceSpy.updatePost).toHaveBeenCalledWith(expectedPost);
  });

  it('should navigate to the post detail page after saving the post', () => {
    spyOn(component.router, 'navigate');
    component.onSubmit();
    expect(component.router.navigate).toHaveBeenCalledWith(['/posts', testPost.id]);
  });
});

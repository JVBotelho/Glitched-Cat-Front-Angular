import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PostService } from '../../posts/post.service';
import { Post } from '../../posts/post.model';
import { PostDetailComponent } from './post-detail.component';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let postService: jasmine.SpyObj<PostService>;
  const post: Post = { id: '1', title: 'Post Title', content: 'Post Content', createdAt: new Date(), updatedAt: new Date() };

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getPost']);
    await TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
        { provide: PostService, useValue: postServiceSpy },
      ],
    }).compileComponents();
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load post', () => {
    postService.getPostById.and.returnValue(of(post));
    fixture.detectChanges();
    expect(component.post).toEqual(post);
  });
});

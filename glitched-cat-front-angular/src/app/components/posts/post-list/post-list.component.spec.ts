import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PostListComponent } from './post-list.component';
import { PostService } from '../../posts/post.service';
import { Post } from '../../posts/post.model';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let postService: jasmine.SpyObj<PostService>;

  const mockPosts: Post[] = [
    {
      id: '1',
      title: 'Mock Post 1',
      content: 'Mock post content 1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Mock Post 2',
      content: 'Mock post content 2',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getPosts']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [PostListComponent],
      providers: [{ provide: PostService, useValue: postServiceSpy }]
    })
      .compileComponents();
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get posts on init', () => {
    postService.getPosts.and.returnValue(of(mockPosts));
    component.ngOnInit();
    expect(postService.getPosts).toHaveBeenCalled();
    expect(component.posts).toEqual(mockPosts);
  });
});

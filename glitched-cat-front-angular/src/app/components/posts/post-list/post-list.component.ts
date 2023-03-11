import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }
}

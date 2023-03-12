import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  @ViewChild('postForm', { static: false }) postForm!: NgForm;
  title: string = '';
  content: string = '';

  constructor(private postService: PostService, private router: Router) { }

  onSubmit() {
    debugger;
    if (this.postForm.valid) {
      this.onSavePost();
    }
  }

  onSavePost() {
  const post: Post = {
    id: '',
    title: this.title,
    content: this.content,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  this.postService.createPost(post).subscribe(() => {
    this.router.navigate(['/posts']);
  });
  }
}

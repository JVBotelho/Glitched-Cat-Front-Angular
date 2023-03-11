import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  post: Post = {} as Post;
  postForm: FormGroup;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.postService.getPostById(params.get('id')!)
        )
      )
      .subscribe((post: Post) => {
        this.post = post;
        this.postForm.setValue({
          title: post.title,
          content: post.content
        });
      });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const updatedPost: Post = {
        ...this.post,
        title: this.postForm.value.title,
        content: this.postForm.value.content,
        updatedAt: new Date()
      };
      this.postService.updatePost(updatedPost);
      this.router.navigate(['/']);
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}

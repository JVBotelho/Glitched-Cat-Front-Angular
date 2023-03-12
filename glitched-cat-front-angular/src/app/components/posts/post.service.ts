import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../posts/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly API_URL = 'https://localhost:5001/api/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.API_URL);
  }

  getPostById(id: string): Observable<Post> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<Post>(url);
  }

  createPost(post: Post): Observable<string> {
    return this.http.post<{ id: string }>(this.API_URL, post).pipe(
      map(response => response.id)
    );
  }

  updatePost(post: Post): Observable<void> {
    const url = `${this.API_URL}/${post.id}`;
    return this.http.put<void>(url, post);
  }

  deletePost(id: string): Observable<void> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<void>(url);
  }
}

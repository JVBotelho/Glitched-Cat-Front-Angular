import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/posts/post-list/post-list.component';
import { PostDetailComponent } from './components/posts/post-detail/post-detail.component';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';
import { PostEditComponent } from './components/posts/post-edit/post-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/posts',
    pathMatch: 'full'
  },
  {
    path: 'posts',
    children: [
      {
        path: '',
        component: PostListComponent
      },
      {
        path: 'create',
        component: PostCreateComponent
      },
      {
        path: ':id',
        component: PostDetailComponent
      },
      {
        path: ':id/edit',
        component: PostEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

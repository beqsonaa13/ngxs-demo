import { Component, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { BlogPostModel } from "./models/post.model";
import { DeletePost, GetAllPost, UpdatePost } from "./store/blog-post/blog-post.actions";
import { BlogPostState } from "./store/blog-post/blog-post.state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @Select(BlogPostState) posts$!: Observable<{ posts: BlogPostModel[] }>;

  constructor(private store: Store) { }

  // posts$ = this.store.select(BlogPostSelectors.allPosts) // you can select like this

  ngOnInit() { }

  public deletePost(post: BlogPostModel): void {
    this.store.dispatch(new DeletePost(post));
  }

  public updatePost(post: BlogPostModel): void {
    this.store.dispatch(new UpdatePost(post));
  }
}

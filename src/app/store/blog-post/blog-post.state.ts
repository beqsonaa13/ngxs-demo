import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, State, StateContext, StateOperator, StateToken } from "@ngxs/store";
import { patch, updateItem } from "@ngxs/store/operators";
import { tap } from "rxjs";
import { BlogPostModel } from "../../models/post.model";
import { ApiService } from "../../services/api.service";
import { BlogPostStateModel } from "./blog-post-state.model";
import { DeletePost, GetAllPost, UpdatePost } from "./blog-post.actions";

const POSTS_STATE_TOKEN = new StateToken<BlogPostStateModel[]>('posts');

@State({
  name: POSTS_STATE_TOKEN,
  defaults: []
})
@Injectable()
export class BlogPostState implements NgxsOnInit {
  constructor(private api: ApiService) { }

  // called first
  // ngxsOnChanges()

  // before the APP_INITIALIZER token is resolved
  // ngxsOnInit()

  // Called once, after the root view and all its children have been rendered.
  // ngxsAfterBootstrap()

  ngxsOnInit(ctx: StateContext<any>) {
    console.log('State initialized, now getting posts');
    ctx.dispatch(new GetAllPost())
  }

  @Action(GetAllPost) //{ cancelUncompleted: true }
  getAllPost(ctx: StateContext<any>) {
    return this.api.getPosts().pipe(
      tap(posts => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          posts
        })
      })
    )
  }

  @Action(DeletePost)
  deletePost(ctx: StateContext<any>, payload: {post: BlogPostModel}) {
    const state = ctx.getState();
    // send delete request to BE
    ctx.patchState({
      ...state,
      posts: state.posts.filter((post: BlogPostModel) => post.url !== payload.post.url)
    })
  }

  @Action(UpdatePost)
  updatePost(ctx: StateContext<any>, payload: {post: BlogPostModel}) {
    // send delete request to BE
    ctx.setState(
      patch<StateOperator<BlogPostStateModel[]>>({
          posts: updateItem<BlogPostModel>(
            (post: BlogPostModel) => post.title === payload.post.title,
            patch({title: `${payload.post.title} updated`})
          )
        }
      )
    )
  }
}

import { Selector } from "@ngxs/store";
import { BlogPostStateModel } from "./blog-post-state.model";
import { BlogPostState } from "./blog-post.state";

export class BlogPostSelectors {

  @Selector([BlogPostState])
  static allPosts(state: BlogPostStateModel) {
    return state.posts;
  }

}

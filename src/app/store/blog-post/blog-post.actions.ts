import { BlogPostModel } from "../../models/post.model";

export class GetAllPost {
  static readonly type = '[Posts] Get All Posts'
}

export class DeletePost {
  static readonly type = '[Posts] Delete Post';
  constructor(public post: BlogPostModel) {}
}

export class UpdatePost {
  static readonly type = '[Posts] Update Post';
  constructor(public post: BlogPostModel) {}
}

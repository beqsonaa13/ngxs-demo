import { HttpClientModule } from "@angular/common/http";
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from "@ngxs/store";
import { AppComponent } from './app.component';
import { UpdatePost } from "./store/blog-post/blog-post.actions";
import { BlogPostState } from "./store/blog-post/blog-post.state";

const post = {
  source: {
    id: 1,
    name: 'string'
  },
  author: 'string',
  title: 'string',
  description: 'string',
  url: 'string',
  urlToImage: 'string',
  publishedAt: 'string',
  content: 'string'
}


describe('AppComponent', () => {

  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        NgxsModule.forRoot([BlogPostState]),
        HttpClientModule
      ],
      teardown: {destroyAfterEach: false}
    })

    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      posts: [ post ]
    })
  });

  it('should create the app', () => {


    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should update post title', async () => {
    // store.selectOnce(state => state.posts)
    //   .subscribe(posts => {
    //     // expect won't run
    //   })
    await store.dispatch(new UpdatePost(post)).toPromise();

    const posts = store.selectSnapshot(state => state.posts);
    expect(posts[0].title).toBe('string updated');

  });
});

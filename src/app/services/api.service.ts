import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { BlogPostModel } from "../models/post.model";

@Injectable({providedIn: 'root'})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<BlogPostModel[]> {
    return this.http.get<{articles: BlogPostModel[]}>(`https://newsapi.org/v2/everything?q=tesla&from=2023-04-05&sortBy=publishedAt&apiKey=21f1bd9baafd4b66957236355127d0c3`)
      .pipe(map(posts => posts.articles))
  }
}

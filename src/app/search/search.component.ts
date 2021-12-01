import { Component, OnInit } from '@angular/core';
import {Post} from "../shared/types";
import {PostService} from "../shared/services/post.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private _posts: Post[];
  private _searchText: string;

  constructor(private _postService: PostService) {
    this._posts = [];
    this._searchText = '';
  }

  ngOnInit(): void {
    this._postService.fetchFeed().subscribe((posts: Post[])=> this._posts = posts.sort((a:Post, b:Post) => +b.date - +a.date));
  }

  get posts(): Post[]{
    return this._posts;
  }

  type(event:any) {
    this._searchText = event.target.value;
  }

  get searchText() {
    return this._searchText;
  }

}

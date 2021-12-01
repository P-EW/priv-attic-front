import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Post} from "../shared/types";
import {PostService} from "../shared/services/post.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {filter, map, Observable, startWith, tap} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-categ',
  templateUrl: './categ.component.html',
  styleUrls: ['./categ.component.css']
})
export class CategComponent implements OnInit {

  private _posts: Post[];
  private _tags: string[];
  private _tagCtrl: FormControl;
  private readonly _form: FormGroup;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  defaultTagList: string[] = ["Photography", "WildLife", "Dog", "Cat", "Meme"];
  filteredTags: Observable<string[]>;
  @ViewChild('tagInput') private _tagInput: ElementRef<HTMLInputElement>;

  constructor(private _postService: PostService, private _route: ActivatedRoute, private _location: Location) {
    this._posts = [];
    this._tags = [];
    this._tagCtrl = new FormControl();
    this._tagInput = {} as ElementRef;
    this.filteredTags = this._tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.defaultTagList.slice())),
    );
    this._form = CategComponent._buildForm();
  }

  ngOnInit(): void {
    this._route.params.pipe(
      filter((params: any) => !!params.categs),
      tap((params:any)=> this._tags = params.categs.split(','))
    ).subscribe(
      (params: any) => this._postService.fetchPostsCateg(params.categs).subscribe((post:Post[]) => this._posts = post)
    )
  }

  get posts(): Post[]{
    return this._posts;
  }

  get tags(): string[] {
    return this._tags;
  }

  get tagCtrl(): FormControl{
    return this._tagCtrl;
  }

  private _refresh() {
    this._location.replaceState('/categs/'+this._tags.join(','))
    if(this._tags.length) {
      this._postService.fetchPostsCateg(this._tags).subscribe((post:Post[]) => this._posts = post)
    }
    else {
      this._posts = [];
    }
  }

  remove(tag: string): void {
    const index = this._tags.indexOf(tag);
    if (index >= 0) {
      this._tags.splice(index, 1);
    }
    this._refresh();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && !this._tags.includes(value)) {
      this._tags.push(value);
      this._refresh();
    }
    // Clear the input value
    event.chipInput!.clear();

    this._tagCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(!this.tags.includes(event.option.viewValue)){
      this._tags.push(event.option.viewValue);
    }
    this._tagInput.nativeElement.value = '';
    this._tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.defaultTagList.filter((tag:string) => tag.toLowerCase().includes(filterValue));
  }

  get form(): FormGroup {
    return this._form;
  }

  private static _buildForm(): FormGroup {
    return new FormGroup({
      textContent: new FormControl('', Validators.compose([
        Validators.maxLength(128)
      ]))
    });
  }

}

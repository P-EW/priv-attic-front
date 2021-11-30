import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Observable, startWith, map} from "rxjs";
import {PostService} from "../shared/services/post.service";
import {Router} from "@angular/router";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {Post} from "../shared/types";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  private _tags: string[];
  private _tagCtrl: FormControl;
  private readonly _form: FormGroup;
  private _userFile : File;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  defaultTagList: string[] = ["Photography", "WildLife", "Dog", "Cat", "Meme"]; //TODO fetch depuis la db des categs ?
  filteredTags: Observable<string[]>;
  @ViewChild('tagInput') private _tagInput: ElementRef<HTMLInputElement>;

  constructor(private _postService: PostService, private _router: Router, private _authService :AuthService) {
    this._tags = [];
    this._tagCtrl = new FormControl();
    this._tagInput = {} as ElementRef;
    this.filteredTags = this._tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.defaultTagList.slice())),
    );
    this._form = CreatePostComponent._buildForm();
    this._userFile = {} as File;
  }

  ngOnInit(): void {
  }

  get tags(): string[] {
    return this._tags;
  }

  get tagCtrl(): FormControl{
    return this._tagCtrl;
  }

  remove(tag: string): void {
    const index = this._tags.indexOf(tag);

    if (index >= 0) {
      this._tags.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value && !this._tags.includes(value)) {
      this._tags.push(value);

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

  onFileSelected($event: any){
    const file:File = $event.files[0];
    if (file) {
      this._userFile = file;
    }
  }

  private _upload(post:Post){
    if (this._userFile?.name) {
      this._postService.upload(this._userFile, post._id).subscribe(() => this._router.navigate( ['profile']));
    }
    else {
      this._router.navigate( ['profile'])
    }
  }

  filename(): string {
    return this._userFile.name;
  }

  submit(post: Post): void {
    post.textContent = post.textContent?.trim();
    post.categories = this._tags;
    post.publisherId = this._authService.getToken()?.id || '';

    if((post?.textContent) || (this._userFile?.name.length > 0)){
      if(post.textContent?.length === 0){
        delete post.textContent;
      }

      this._postService.create(post).subscribe((p:Post) => this._upload(p));
    }
  }


}

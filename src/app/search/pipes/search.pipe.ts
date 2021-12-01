import { Pipe, PipeTransform } from '@angular/core';
import {Post} from "../../shared/types";

@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {

  transform(posts: Post[], searchArgs: string): Post[] {
    // ...searchArgs: string []
    if(!posts){
      return [];
    }
    if(!searchArgs){
      return posts;
    }
    let search: string[] = searchArgs.toLocaleLowerCase().split(' ');

    return posts.filter((p:Post) => {
      return search.every((s:string)=> p.textContent?.includes(s)) || search.every((s:string)=> p.categories?.some((categ: string)=> categ.toLocaleLowerCase().includes(s)));
    });
  }

}

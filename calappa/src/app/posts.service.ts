import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './Post.model.ts';
import { map } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class PostService {

    constructor(private htto: HttpClient) { }
    createAndStorePost(titile: string, content:string) 
    {
        const postdata:Post = {title: titile, content: content};
        this.htto.post<{name:string}>('https://demoproj-83521.firebaseio.com/posts.json', postdata).subscribe(
            (res)=> {
              console.log(res);
            }
          )
    }

    fetchPosts() {
      return  this.htto.get<{[key:string]:Post}>('https://demoproj-83521.firebaseio.com/posts.json')
        .pipe(
          map (
            (res)=> {
              console.log(res);
              const postaArr = [];
              for (const key in res) {
                postaArr.push({ ...res[key], id: key });
              }
              return postaArr;
            }
          )
         
        );
    }

    delposts() {
      return this.htto.delete('https://demoproj-83521.firebaseio.com/posts.json');
    } 
}
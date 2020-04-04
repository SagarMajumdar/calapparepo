import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, throttleTime} from 'rxjs/operators';
import {Post} from './Post.model.ts';
import { PostService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  loadedPosts: Post[] = [];
  isfetching: boolean = false;

  constructor( private http : HttpClient,private postsSer: PostService) {}
  
   ngOnInit() 
   {
      this.onFetchPosts();
   }

   onFetchPosts() {
    this.isfetching = true;
    this.postsSer.fetchPosts().subscribe(
      (res) => {
        this.loadedPosts= res;
        this.isfetching=false;
      }
    );
  }

  onCreatePost(pstData: {title: string, content  : string} ) {
    
      this.postsSer.createAndStorePost(pstData.title, pstData.content);
        
      // this.http.get('https://ghibliapi.herokuapp.com/films').subscribe(
      //     (res)=> {
      //       console.log(res);
      //     }
      //   );
  }

  onDeletePosts () {
    this.postsSer.delposts().subscribe(
      () => {
        this.loadedPosts = [];
      }
    ) ;
  }
}



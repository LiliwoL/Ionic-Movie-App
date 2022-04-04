import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.page.html',
  styleUrls: ['./movie-list.page.scss'],
})
export class MovieListPage implements OnInit {

  Movies: any = [];

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {  }

  ionViewDidEnter() {
    this.movieService.getMovies().subscribe((response) => {
      this.Movies = response;
    })
  }

}

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent {
  searchlist: Array<Movie> = [];
  searchCtrl = new FormControl();

  constructor(private bkSrv: BackendService) {}

  ngOnInit(): void {
    this.search('game');

    this.searchCtrl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((val: any) => (val ? this.search(val) : this.search('game')));
  }

  search(val: any) {
    this.bkSrv.searchMovie(val).subscribe((Search: Array<Movie>) => {
      this.searchlist = Search;
    });
  }
}

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BackendService } from './backend.service';
import { movielist } from 'src/app/mockdata/movielist';
import { Movie } from 'src/app/models/movie';

describe('BackendService', () => {
  let backendService: BackendService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BackendService],
    });
    backendService = TestBed.inject(BackendService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(backendService).toBeTruthy();
  });

  it('should retrieve movie list', () => {
    backendService.searchMovie('game').subscribe((movies: Array<Movie>) => {
      expect(movies).toBeTruthy();
      expect(movies.length).toBe(10);
      const gameOfThrones: any = movies.find(
        (movie: any) => movie.imdbID == 'tt0944947'
      );
      expect(gameOfThrones.Title).toBe('Game of Thrones');
    });

    const req = httpTestingController.expectOne(
      (req: any) => req.url == 'http://www.omdbapi.com/'
    );
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.has('apikey')).toBe(true);
    expect(req.request.params.has('s')).toBe(true);

    req.flush({ Search: movielist });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

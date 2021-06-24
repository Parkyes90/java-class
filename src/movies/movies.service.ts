import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);
    if (!movie) {
      throw new NotFoundException('Movie with Id');
    }
    return movie;
  }

  deleteOne(id: string): boolean {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
    return true;
  }

  create(movieData) {
    const newMovie = {
      id: this.movies.length + 1,
      ...movieData,
    };
    this.movies.push(newMovie);
    return newMovie;
  }

  update(id: string, movieData) {
    const movie = this.getOne(id);
    const movieIndex = this.movies.indexOf(movie);
    this.movies[movieIndex] = { ...movie, ...movieData };
    return this.movies[movieIndex];
  }
}

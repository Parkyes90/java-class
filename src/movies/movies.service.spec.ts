import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should be return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      const createdMovie = service.create({
        title: 'Test M',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(createdMovie.id);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(createdMovie.id);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(1234);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with Id');
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      const createdMovie = service.create({
        title: 'Test M',
        genres: ['test'],
        year: 2000,
      });
      const movies = service.getAll();
      service.deleteOne(createdMovie.id);
      const afterDeleteMovies = service.getAll();

      expect(afterDeleteMovies.length).toEqual(movies.length - 1);
    });
  });
  it('should throw 404 error', () => {
    try {
      service.deleteOne(1234);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toEqual('Movie with Id');
    }
  });

  describe('create', () => {
    it('should create a movie', () => {
      const moviesLength = service.getAll().length;
      service.create({
        title: 'Test M',
        genres: ['test'],
        year: 2000,
      });
      const afterCreateMoviesLength = service.getAll().length;
      expect(afterCreateMoviesLength).toEqual(moviesLength + 1);
    });
  });
});

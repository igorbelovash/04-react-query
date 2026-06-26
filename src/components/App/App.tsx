import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar.tsx";
import fetchMovies from "../../services/movieService.ts";
import type { Movie } from "../../types/movie.ts";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);

      const data: Movie[] = await fetchMovies(query);
      if (!data.length) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(data);
    } catch (error) {
      console.error("Error in App component:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    if (movie) {
      setSelectedMovie(movie);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid onSelect={handleSelect} movies={movies} />
      )}
      {selectedMovie && (
        <MovieModal onClose={handleCloseModal} movie={selectedMovie} />
      )}
      <Toaster position="top-center" />
    </>
  );
}

export default App;

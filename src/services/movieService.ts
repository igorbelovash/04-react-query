import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const VITE_TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface TmdbResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

async function fetchMovies(query: string): Promise<Movie[]> {
    try {
        const { data } = await axios.get<TmdbResponse>(BASE_URL, {
            params: {
                query,
            },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${VITE_TMDB_TOKEN}`
            }
        });
        return data.results;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
}

export default fetchMovies;
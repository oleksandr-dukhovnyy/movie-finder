import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    list: [] as Movie.Short[],
    selected: null as Movie.Full | null,
    totalResults: 0,
  }),

  actions: {
    async FETCH_MOVIES(searchStr: string, page?: number) {
      // Build request URL
      const { API_URL } = useRuntimeConfig().public;

      const url = new URL(API_URL);
      url.searchParams.append('s', searchStr);

      if (page) {
        url.searchParams.append('page', page.toString());
      }

      // Fetch movies
      const { data: list, error } = await useFetch<{
        Search: Movie.Short[];
        totalResults: string;
        Response: 'True' | 'False';
        Error?: string;
      }>(url.href);

      // Handle an server error if error.value !== null
      handleError(error.value);

      if (list.value) {
        const { Search: search, Error: err, totalResults } = list.value;

        // Handle service errors if exists
        if (err) {
          this.list = [];

          console.error(err);

          ElMessage({
            showClose: true,
            message: err,
            type: 'error',
          });
        }

        if (search) {
          // Update list
          if (page !== undefined) {
            this.list.push(...search);
          } else {
            this.list = search;
          }

          // Update total results
          this.totalResults = +(totalResults || 0);
        }
      }
    },
    async FETCH_MOVIE_BY_IMDBID(imdbID: string) {
      // Check if movie is already loaded
      if (this.SELECTED?.imdbID === imdbID) return;

      // Build request URL
      const { API_URL } = useRuntimeConfig().public;

      const url = new URL(API_URL);
      url.searchParams.append('i', imdbID);

      // Fetch movie
      const { data: movie, error } = await useFetch<Movie.Full>(url.href);

      // Handle response
      handleError(error.value);
      this.selected = movie.value;
    },
  },

  getters: {
    LIST: (state) => state.list,
    SELECTED: (state) => state.selected,
    IS_NOT_SELECTED: (state) => !state.selected,
    LIST_IS_EMPTY: (state) => !state.list.length,
    ALL_RESULTS_LOADED: (state) => state.totalResults === state.list.length,
  },
});

function handleError(err: { message: string } | null) {
  if (!err) return;

  console.error(err);

  ElMessage({
    showClose: true,
    message: err.message,
    type: 'error',
  });
}

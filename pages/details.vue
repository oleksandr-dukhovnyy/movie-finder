<script setup lang="ts">
  import { useMoviesStore } from '~/store/movies';

  const route = useRoute();
  const moviesStore = useMoviesStore();

  if (route.query.id) {
    await moviesStore.FETCH_MOVIE_BY_IMDBID(route.query.id as string);
  } else if (route.query.slide) {
    const selected = moviesStore.LIST[+route.query.slide];

    if (selected) {
      await navigateTo({
        query: {
          ...route.query,
          id: selected.imdbID,
        },
      });

      await moviesStore.FETCH_MOVIE_BY_IMDBID(selected.imdbID);
    }
  } else if (moviesStore.LIST[0]) {
    const id = moviesStore.LIST[0].imdbID;

    await navigateTo({
      query: {
        ...route.query,
        id,
      },
    });

    await moviesStore.FETCH_MOVIE_BY_IMDBID(id);
  }
</script>

<template>
  <TheMovieListItemLarge
    v-if="moviesStore.SELECTED"
    :movie="moviesStore.SELECTED"
    large
  />
  <TheEmptyPage
    v-else
    class="mt-20"
  />
</template>

<script setup lang="ts">
  import { useMoviesStore } from '~/store/movies';

  const route = useRoute();
  const moviesStore = useMoviesStore();

  if (route.query.q && moviesStore.LIST_IS_EMPTY)
    await moviesStore.FETCH_MOVIES(route.query.q as string);
</script>

<template>
  <TheMovieList
    v-if="!moviesStore.LIST_IS_EMPTY"
    :list="moviesStore.LIST"
  />
  <TheEmptyPage
    v-else
    class="mt-20"
  />
</template>

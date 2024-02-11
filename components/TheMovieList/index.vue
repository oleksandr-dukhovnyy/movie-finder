<script setup lang="ts">
  import { useMoviesStore } from '~/store/movies';

  defineProps<{
    list: Movie.Short[];
  }>();

  const route = useRoute();
  const moviesStore = useMoviesStore();
  const carousel = ref<Element | null>(null);
  const initialSlide = ref<number>(+(route.query.slide || 0));

  const carouselHeight = ref(450);
  const arrow = ref<'hover' | 'always'>('hover');

  switch (true) {
    case window.screen.width < 1024:
      carouselHeight.value = 450;
      arrow.value = 'always';
      break;

    case window.screen.width < 800:
      carouselHeight.value = 300;
      arrow.value = 'always';
      break;
  }

  async function onCarouselChange(index: number) {
    await maybeLoadMore(index);
    await savePosition(index);
  }

  async function savePosition(index: number) {
    await navigateTo({
      query: {
        ...route.query,
        slide: index ? index.toString() : undefined,
      },
    });
  }

  let prevIndex = 0;
  let isLoading = false;

  async function maybeLoadMore(index: number) {
    if (isLoading) {
      setActiveItem(index);
      return;
    }

    if (
      !moviesStore.ALL_RESULTS_LOADED &&
      prevIndex < index &&
      index === moviesStore.LIST.length - 1
    ) {
      const page = Math.ceil((index + 1) / 10);
      const q = route.query.q as string;

      prevIndex = index;
      isLoading = true;

      await moviesStore.FETCH_MOVIES(q, page + 1);

      isLoading = false;

      setActiveItem(index);
    }

    prevIndex = index;
  }

  function setActiveItem(index: number) {
    if (carousel.value !== null) {
      // @ts-ignore
      carousel.value.setActiveItem(index);
    }
  }
</script>

<template>
  <div class="container flex justify-center">
    <el-carousel
      ref="carousel"
      loop
      :autoplay="false"
      :height="`${carouselHeight}px`"
      style="width: 100%"
      trigger="click"
      :arrow="arrow"
      type="card"
      :initial-index="initialSlide"
      indicator-position="none"
      @change="onCarouselChange"
    >
      <el-carousel-item
        v-for="movie in list"
        :key="movie.imdbID"
      >
        <nuxt-link
          :to="{
            path: 'details',
            query: {
              ...route.query,
              id: movie.imdbID,
            },
          }"
        >
          <TheMovieListItemSmall :movie="movie" />
        </nuxt-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
  .el-carousel__item {
    &:not(.is-active) {
      height: max-content;
      opacity: 0.6;
    }

    background-color: transparent !important;
  }

  .container {
    width: 1200px;

    @include media-down(1600px) {
      width: 820px;
    }

    @include media-down(lg) {
      width: 100%;
      max-width: 580px;
      padding-top: 50px;
    }

    @include media-down(md) {
      width: 100%;
      max-width: 340px;
      padding-top: 50px;
    }
  }

  .el-carousel__container {
    display: flex;
    align-items: center;
  }
</style>

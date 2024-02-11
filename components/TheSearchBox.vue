<script setup lang="ts">
  import { Search, Eleme } from '@element-plus/icons-vue';
  import { useMoviesStore } from '~/store/movies';

  const MIN_SEARCH_LENGTH = 2;

  const route = useRoute();
  const moviesStore = useMoviesStore();

  const search = ref('');
  const errorMessage = ref('');
  const loading = ref(false);

  const searchMovies = async () => {
    if (search.value.length < MIN_SEARCH_LENGTH) {
      errorMessage.value = `Please input at least ${MIN_SEARCH_LENGTH} ${MIN_SEARCH_LENGTH > 1 ? 'characters' : 'character'}`;
      return;
    }

    loading.value = true;

    await moviesStore.FETCH_MOVIES(search.value);

    loading.value = false;

    if (!moviesStore.LIST_IS_EMPTY) {
      await navigateTo({
        path: '/results',
        query: {
          ...route.query,
          q: search.value,
          slide: undefined,
        },
      });
    }
  };
</script>

<template>
  <div class="search-box flex gap-2">
    <div
      class="error"
      :class="{
        'error--active': errorMessage !== '',
      }"
      :style="`--error: '${errorMessage}'`"
    >
      <el-input
        v-model="search"
        label="search"
        size="large"
        class="search-box__input"
        placeholder="Search for movies by title"
        :prefix-icon="Search"
        @focus="errorMessage = ''"
        @keypress.enter="searchMovies"
      />
    </div>

    <ClientOnly>
      <el-button
        size="large"
        type="primary"
        :loading-icon="Eleme"
        :loading="loading"
        style="width: 120px"
        @click="searchMovies"
      >
        <span class="text-black">Search</span>
      </el-button>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
  .search-box {
    width: 100%;

    @include media-down(lg) {
      flex-direction: column;
      align-items: center;
    }

    &__input {
      width: 460px;
      min-width: 295px;
      font-size: 16px;

      @include media-down(lg) {
        width: 460px;
      }

      @include media-down(md) {
        width: 100%;
      }
    }
  }

  .error {
    position: relative;
    margin-bottom: 14px;
    border: 1px solid transparent;
    border-radius: 5px;

    &--active {
      border-color: #ef4444;

      &::after {
        content: var(--error);
        position: absolute;
        bottom: -20px;
        left: 0;
        color: #ef4444;
        font-size: 0.8rem;
      }
    }
  }
</style>

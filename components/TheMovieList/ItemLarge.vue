<script setup lang="ts">
  defineProps<{
    movie: Movie.Short | Movie.Full;
  }>();
</script>

<template>
  <el-card
    shadow="always"
    class="card p-4 md:pt-8 md:px-6 lg:p-9"
    body-style="padding: 0"
  >
    <div class="flex m-auto gap-9 flex-col lg:flex-row">
      <img
        v-if="movie.Poster !== 'N/A'"
        :src="movie.Poster"
        class="card__image hover:scale-105 duration-300"
      />
      <el-empty
        v-else
        class="card__image"
        description=" "
      />
      <div
        class="card__content flex flex-col align-between items-start lg:pt-8"
      >
        <strong
          class="card__title text-left whitespace-normal text-2xl md:text-4xl lg:text-6xl"
        >
          {{ movie.Title }}
        </strong>

        <div
          class="flex mt-5 gap-5 flex-col md:mt-auto lg:mt-auto lg:gap-10 lg:mt-10"
        >
          <p
            v-if="'Director' in movie"
            class="card__director"
          >
            <span class="lg:hidden">{{ `${movie.Year} ,` }}</span>
            {{ movie.Director }}
          </p>
          <p class="card__year hidden lg:block">
            {{ movie.Year }}
          </p>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
  .card {
    width: 600px;
    height: 420px;
    margin-top: unset;

    @include media-down(lg) {
      width: 100%;
      max-width: 380px;
      height: 640px;
      margin-top: -30px;
    }

    @include media-down(sm) {
      width: 100%;
      max-width: 240px;
      height: 470px;
      margin-top: unset;
    }

    &__title {
      font-size: 40px;

      @include max-lines(7);

      @include media-down(lg) {
        @include max-lines(3);
      }
    }

    &__image {
      object-fit: contain;
      max-width: 50%;
      height: 370px;

      @include media-down(lg) {
        max-width: unset;
        height: 360px;
      }

      @include media-down(md) {
        max-width: unset;
        height: 260px;
      }
    }

    &__content {
      width: 50%;

      @include media-down(lg) {
        width: 100%;
        height: 190px;
      }

      @include media-down(md) {
        width: 100%;
        height: unset;
      }
    }

    &__director {
      @include max-lines(1);

      font-size: 28px;

      @include media-down(lg) {
        font-size: 18px;
      }
    }

    &__year {
      font-size: 28px;
    }
  }
</style>

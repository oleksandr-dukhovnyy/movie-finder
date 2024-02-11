<script setup lang="ts">
  defineProps<{
    movie: Movie.Short | Movie.Full;
  }>();
</script>

<template>
  <el-card
    shadow="always"
    class="card p-2 md:p-7"
    body-style="padding: 0"
  >
    <div class="flex gap-2 flex-col lg:gap-7 lg:flex-row">
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
        class="card__content flex flex-col align-between items-start pt-2 lg:pt-8"
      >
        <strong
          class="card__title text-left whitespace-normal md:text-2xl lg:text-4xl"
        >
          {{ movie.Title }}
        </strong>
        <p class="card__year flex lg:mt-5">
          {{ movie.Year }}
        </p>
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
  .card {
    @include media-down(lg) {
      width: 100%;
      max-width: 285px;
      height: 450px;
    }

    @include media-down(md) {
      width: 100%;
      height: 292px;
    }

    &__content {
      @include media-down(lg) {
        width: 100%;
        height: 144px;
      }

      @include media-down(md) {
        height: 115px;
      }
    }

    &__image {
      object-fit: contain;
      height: 276px;

      @include media-down(lg) {
        max-width: unset;
        height: 260px;
      }

      @include media-down(md) {
        max-width: unset;
        height: 150px;
      }
    }

    &__title {
      font-size: 25px;

      @include max-lines(5);

      line-height: 1.3;

      @include media-down(lg) {
        font-size: 26px;

        @include max-lines(4);
      }

      @include media-down(md) {
        font-size: 16px;
      }
    }

    &__year {
      margin-top: auto;
      font-size: 24px;

      @include media-down(lg) {
        font-size: 16px;
      }

      @include media-down(md) {
        font-size: 12px;
      }
    }
  }
</style>

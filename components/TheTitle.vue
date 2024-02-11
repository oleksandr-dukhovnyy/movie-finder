<template>
  <div class="flex gap-10">
    <h1 class="font-bold text-white mb-12 md:mb-18 2xl:mb-12"> MovieFinder </h1>
  </div>
</template>

<style scoped lang="scss">
  h1 {
    font-size: 100px;
    line-height: 1;

    @include media-down(1600px) {
      font-size: 80px;
    }

    @include media-down(xl) {
      font-size: 90px;
    }

    @include media-down(sm) {
      font-size: 50px;
    }
  }
</style>

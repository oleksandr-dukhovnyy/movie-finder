<template>
  <main class="main mx-auto grid justify-center gap-10">
    <div
      class="main__menu"
      style="width: 140px"
    >
      <TheNavBar />
    </div>
    <div class="main__content flex flex-col items-center">
      <TheTitle />
      <NuxtPage />

      <div
        class="lg:hidden"
        style="height: 100px"
      ></div>
    </div>
  </main>
</template>

<style lang="scss">
  @import './assets/scss/global';
</style>

<style scoped lang="scss">
  .main {
    grid-template-columns: 140px 1fr;
    max-width: 1980px;
    height: 100vh;
    padding: 0 40px;

    @include media-down(lg) {
      grid-template-columns: 1fr;
    }

    &__menu {
      position: relative;

      @include media-down(lg) {
        position: absolute;
      }
    }

    &__content {
      margin: 34px 0;

      @include media-down(lg) {
        margin: 36px 0;
      }
    }
  }
</style>

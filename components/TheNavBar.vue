<script setup lang="ts">
  import {
    List,
    HomeFilled,
    MoreFilled,
    CirclePlusFilled,
  } from '@element-plus/icons-vue';

  const route = useRoute();

  const menuItems = computed(() => {
    return [
      { label: 'Home', link: '/', icon: HomeFilled },
      {
        label: 'Results',
        link: '/results',
        icon: List,
      },
      {
        label: 'Details',
        link: '/details',
        icon: MoreFilled,
      },
      { label: 'Add a Movie', link: '/add', icon: CirclePlusFilled },
    ];
  });
</script>

<template>
  <nav class="navbar flex justify-center items-center my-auto py-3 lg:py-0">
    <div
      class="flex justify-evenly lg:flex-col"
      style="gap: 20px"
    >
      <nuxt-link
        v-for="item in menuItems"
        v-slot="{ isActive }"
        :key="item.label"
        :to="{
          path: item.link,
          query: route.query,
        }"
        class="text-left"
      >
        <span
          class="text-xl flex flex-col gap-2 align-center items-center lg:items-start"
          :class="isActive ? 'text-blue-400' : 'text-white'"
        >
          <el-icon class="icon">
            <component :is="item.icon" />
          </el-icon>
          <span class="label">
            {{ item.label }}
          </span>
        </span>
      </nuxt-link>
    </div>
  </nav>
</template>

<style scoped lang="scss">
  .navbar {
    position: fixed;
    top: 240px;
    z-index: 10;
    display: block;
    background-color: #000;

    @include media-down(lg) {
      top: unset;
      bottom: 0;
      left: 0;
      width: 100%;
      padding-bottom: 16px;
    }

    .label {
      @include media-down(428px) {
        font-size: 14px;
      }

      @include media-down(328px) {
        display: none;
      }
    }
  }

  .icon {
    display: none;
    font-size: 25px;

    @include media-down(lg) {
      display: block;
    }
  }
</style>

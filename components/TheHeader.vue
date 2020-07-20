<template>
  <div class="header">
    <ul class="header__navigation">
      <nuxt-link to="/">
        <li class="navigation-item">
          Top
        </li>
      </nuxt-link>
      <nuxt-link to="/pages">
        <li class="navigation-item">
          Pages
        </li>
      </nuxt-link>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
<style lang="scss" scoped>
.header {
  height: 80px;
  width: 100%;
  background-color: lightgrey;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 40px;
  &__navigation {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
.navigation-item {
  padding: 16px;
  margin: 0 16px;
  &:hover {
    background-color: white;
  }
}
</style>

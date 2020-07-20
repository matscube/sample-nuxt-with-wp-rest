<template>
  <div class="container">
    <h1>Pages List</h1>

    <h2>Summary:</h2>
    <ul v-if="loaded" class="summary">
      <li>Status: {{ statusMessage }}</li>
      <li>Page Count: {{ pageCount }}</li>
      <li>PerPage: 100</li>
      <li>Total Pagination: {{ paginationCount }}</li>
    </ul>
    <p v-else>
      Loading...
    </p>

    <h2>Page Links</h2>
    <ul>
      <nuxt-link to="/pages/1">
        <li>Page 1</li>
      </nuxt-link>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { PagesSummary } from '@/types/struct'

type Status = 'ok' | 'error'
interface LocalData {
  loaded: boolean
  status?: Status
  pageCount: number
  paginationCount: number
}
export default Vue.extend({
  async asyncData(context) {
    const summary: PagesSummary | null = await context.$getPagesSummary()
    if (summary == null) {
      return {
        loaded: false,
        status: 'error',
      }
    }
    return {
      loaded: true,
      status: 'ok',
      pageCount: summary.totalPost,
      paginationCount: summary.totalPage,
    }
  },
  data: (): LocalData => {
    return {
      loaded: false,
      pageCount: 0,
      paginationCount: 0,
    }
  },
  computed: {
    statusMessage() {
      if (this.loaded) {
        return this.status === 'ok' ? '取得成功' : '取得失敗'
      } else {
        return '取得中...'
      }
    },
  },
})
</script>
<style lang="scss" scoped>
.container {
  padding: 16px;
}
.summary {
  padding-left: 40px;
}
</style>

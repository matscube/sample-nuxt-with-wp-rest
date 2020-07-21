<template>
  <div class="container">
    <h1 class="container__title">Pages List</h1>

    <div class="section">
      <h2 class="section__title">Summary</h2>
      <div class="section__content">
        <ul v-if="loaded" class="summary">
          <li>Status: {{ statusMessage }}</li>
          <li>Page Count: {{ pageCount }}</li>
          <li>PerPage: 100</li>
          <li>Total Pagination: {{ paginationCount }}</li>
        </ul>
        <p v-else>
          Loading...
        </p>
      </div>
    </div>

    <div class="section">
      <h2 class="section__title">Posts</h2>
      <table class="section__content posts">
        <tr class="post post--header">
          <th class="post__item post__item--header">Last Modified</th>
          <th class="post__item post__item--header">Title</th>
          <th class="post__item post__item--header">Link</th>
        </tr>
        <tr v-for="(post, index) in posts" :key="index" class="post">
          <td class="post__item">{{ post.modified }}</td>
          <td class="post__item">{{ post.title.rendered }}</td>
          <td class="post__item">
            <nuxt-link :to="post.link">
              {{ post.link }}
            </nuxt-link>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Post, PagesResponse } from '@/types/struct'

type Status = 'ok' | 'error'
interface LocalData {
  loaded: boolean
  status?: Status
  pageCount: number
  paginationCount: number
  posts: Post[]
}
export default Vue.extend({
  async asyncData(context) {
    const pagination = 1
    const response: PagesResponse | null = await context.$getPages(pagination)
    if (response === null) {
      return {
        loaded: false,
        status: 'error',
      }
    }
    const summary = response.summary
    const posts = response.posts
    return {
      loaded: true,
      status: 'ok',
      pageCount: summary.totalPost,
      paginationCount: summary.totalPage,
      posts,
    }
  },
  data: (): LocalData => {
    return {
      loaded: false,
      pageCount: 0,
      paginationCount: 0,
      posts: [],
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
  margin: 20px auto;
  padding: 16px;
  &__title {
    font-size: 40px;
    padding: 16px 24px;
  }
}
.section {
  padding: 24px;
  margin: 24px 0;
  background-color: $color-sub;
  &__title {
    font-size: 30px;
  }
  &__content {
    margin-top: 24px;
  }
}
.summary {
  padding-left: 40px;
}
.posts {
  width: 100%;
  max-width: 1000px;
}
.post {
  border-bottom: 1px solid lightgrey;
  &__item {
    padding: 16px 24px;
    &--header {
      color: white;
      font-weight: bold;
    }
  }
  &--header {
    background-color: lightgrey;
  }
}
</style>

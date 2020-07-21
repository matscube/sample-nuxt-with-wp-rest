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
      <div class="section__content posts">
        <div class="post post--header">
          <div class="post__item post__item--header">Last Modified</div>
          <div class="post__item post__item--header">Title</div>
          <div class="post__item post__item--header">Content</div>
          <div class="post__item post__item--header">Link</div>
        </div>
        <div class="post">
          <div class="post__item">{{ samplePost.modified }}</div>
          <div class="post__item">{{ samplePost.title }}</div>
          <div class="post__item">{{ samplePost.content }}</div>
          <div class="post__item">
            <nuxt-link :to="samplePost.link">
              {{ samplePost.link }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Post, PagesSummary, createPostSample } from '@/types/struct'

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
    const posts = []
    posts.push(createPostSample())
    return {
      loaded: false,
      pageCount: 0,
      paginationCount: 0,
      posts,
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
    samplePost(): Post | null {
      if (this.posts.length > 0) return this.posts[0]
      else return null
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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
